/**
 * EXEMPLO DE INTEGRAÇÃO: Rotas Protegidas com Sistema de Hierarquia
 * 
 * Este arquivo mostra como integrar os middlewares de hierarquia
 * nas rotas do seu Express. Adapte conforme necessário.
 */

const express = require("express");
const router = express.Router();
const pool = require("../database/database");

const {
  authenticateToken,
  requireAdmin,
  requirePermission,
  requireRole,
  requireAllPermissions,
  requireAnyPermission,
  requireSupervisorOrAbove,
  requireVIP,
  requireVIPBlack,
  ROLES,
} = require("../middleware/auth");

/**
 * =====================================
 * ROTAS PÚBLICAS (sem proteção)
 * =====================================
 */

router.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

/**
 * =====================================
 * ROTAS DE AUTENTICAÇÃO
 * =====================================
 */

// LOGIN - Retornar com o role do usuário
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuário com seu role
    const [[user]] = await pool.query(
      "SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    // Verificar senha, gerar token, etc...
    // Seu código de autenticação aqui...

    // ✨ IMPORTANTE: Incluir role no token JWT ✨
    const token = signToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role, // ← Adicionar role aqui
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * =====================================
 * ROTAS ADMIN (apenas Admin)
 * =====================================
 */

// Dashboard Admin
router.get("/admin/dashboard", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [totalUsers] = await pool.query("SELECT COUNT(*) as count FROM users");
    const [totalBilling] = await pool.query("SELECT SUM(amount) as total FROM billing");

    res.json({
      message: "Dashboard Admin",
      totalUsers: totalUsers[0]?.count || 0,
      totalBilling: totalBilling[0]?.total || 0,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Listar todos os usuários (Admin)
router.get("/admin/users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [users] = await pool.query("SELECT id, name, email, role, created_at FROM users");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mudar role de um usuário (Admin)
router.post("/admin/users/:id/role", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;

    // Validar role
    const validRoles = Object.values(ROLES);
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: "Role inválido" });
    }

    // Buscar usuário anterior
    const [[user]] = await pool.query("SELECT role FROM users WHERE id = ?", [id]);

    // Atualizar
    await pool.query("UPDATE users SET role = ? WHERE id = ?", [newRole, id]);

    // Registrar auditoria
    await pool.query(
      `INSERT INTO role_audit (user_id, old_role, new_role, changed_by, reason)
       VALUES (?, ?, ?, ?, ?)`,
      [id, user.role, newRole, req.user.sub, "Alteração manual"]
    );

    res.json({ message: "Role atualizado", newRole });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * =====================================
 * ROTAS DE SUPERVISOR (Supervisor+)
 * =====================================
 */

// Ver relatórios (Supervisor ou Admin)
router.get(
  "/reports",
  authenticateToken,
  requirePermission("view_reports"),
  async (req, res) => {
    try {
      const [reports] = await pool.query("SELECT * FROM reports");
      res.json({ reports });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Gerenciar campanhas
router.post(
  "/campaigns",
  authenticateToken,
  requirePermission("manage_campaigns"),
  async (req, res) => {
    try {
      const { name, description } = req.body;
      const userId = req.user.sub;

      const result = await pool.query(
        "INSERT INTO campaigns (name, description, created_by) VALUES (?, ?, ?)",
        [name, description, userId]
      );

      res.status(201).json({
        message: "Campanha criada",
        id: result[0].insertId,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * =====================================
 * ROTAS DE AFILIADO (com validações)
 * =====================================
 */

// Ver faturamento - Protegido!
// Supervisor NÃO pode acessar (não tem permissão view_total_billing)
router.get(
  "/billing/total",
  authenticateToken,
  requirePermission("view_total_billing"),
  async (req, res) => {
    try {
      const [billing] = await pool.query(
        "SELECT SUM(amount) as total FROM billing"
      );
      res.json({ totalBilling: billing[0]?.total || 0 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Ver links pessoais (Affiliate+)
router.get(
  "/my-links",
  authenticateToken,
  requirePermission("view_my_links"),
  async (req, res) => {
    try {
      const [links] = await pool.query(
        "SELECT * FROM affiliate_links WHERE user_id = ?",
        [req.user.sub]
      );
      res.json({ links });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * =====================================
 * ROTAS VIP (Features Exclusivas)
 * =====================================
 */

// Features VIP (qualquer level de VIP)
router.get(
  "/vip-features",
  authenticateToken,
  requireVIP,
  async (req, res) => {
    try {
      const features = {
        vip_silver: ["Relatórios básicos", "Suporte prioritário"],
        vip_gold: ["Relatórios avançados", "Suporte prioritário", "Bônus Gold"],
        vip_black: ["Tudo", "Consultoria pessoal", "Bônus Black"],
      };

      res.json({
        message: `Bem-vindo ${req.user.role}`,
        features: features[req.user.role] || [],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Features exclusivas Black
router.get(
  "/vip-black-exclusive",
  authenticateToken,
  requireVIPBlack,
  async (req, res) => {
    try {
      res.json({
        message: "🎖️ Features Exclusivas VIP Black",
        features: [
          "Consultoria dedicada",
          "Acesso antecipado a novos produtos",
          "Comissões aumentadas em 50%",
          "Evento anual exclusivo",
        ],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * =====================================
 * ROTAS DE GERENTE DE AFILIADOS
 * =====================================
 */

// Ver só seus afiliados (Affiliate Manager)
router.get(
  "/my-affiliates",
  authenticateToken,
  requirePermission("view_my_affiliates"),
  async (req, res) => {
    try {
      const [affiliates] = await pool.query(
        "SELECT id, name, email, role, created_at FROM users WHERE manager_id = ?",
        [req.user.sub]
      );
      res.json({ affiliates, count: affiliates.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Ver TODOS os afiliados (Supervisor/Admin)
router.get(
  "/all-affiliates",
  authenticateToken,
  requirePermission("manage_affiliates"),
  async (req, res) => {
    try {
      const [affiliates] = await pool.query(
        "SELECT id, name, email, role, created_at FROM users WHERE role = ?",
        ["affiliate"]
      );
      res.json({ affiliates, count: affiliates.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * =====================================
 * ROTAS COM MÚLTIPLAS PERMISSÕES
 * =====================================
 */

// Gerenciar comissões (Admin OU VIP Black)
router.post(
  "/commissions",
  authenticateToken,
  requireAnyPermission("manage_commissions"),
  async (req, res) => {
    try {
      const { userId, amount } = req.body;

      await pool.query(
        "INSERT INTO commissions (user_id, amount, created_by) VALUES (?, ?, ?)",
        [userId, amount, req.user.sub]
      );

      res.json({ message: "Comissão registrada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * =====================================
 * ROTAS DE COMPLIANCE (Admin + Supervisor)
 * =====================================
 */

router.get(
  "/compliance",
  authenticateToken,
  requirePermission("access_compliance"),
  async (req, res) => {
    try {
      res.json({
        message: "Informações de Compliance",
        accessLevel: req.user.role,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * =====================================
 * ROTAS DE ACADEMY (Para Todos)
 * =====================================
 */

router.get(
  "/academy",
  authenticateToken,
  requirePermission("access_academy"),
  async (req, res) => {
    try {
      const [courses] = await pool.query("SELECT * FROM academy_courses");
      res.json({ courses });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * =====================================
 * MIDDLEWARE DE ERRO 404
 * =====================================
 */

router.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

module.exports = router;
