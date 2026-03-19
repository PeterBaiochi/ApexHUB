/**
 * 🚀 QUICK START - Sistema de Hierarquia
 * 
 * Implemente rapidamente o sistema de hierarquia na sua plataforma
 */

// ============================================================
// PASSO 1: ATUALIZAR O BANCO DE DADOS
// ============================================================

/*
Execute na sua conexão MySQL:

ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'affiliate';
ALTER TABLE users ADD COLUMN IF NOT EXISTS manager_id INT NULL;

Ou execute:
node -e "require('./database/migration-hierarchy').runMigration()"
*/

// ============================================================
// PASSO 2: ATUALIZAR LOGIN BACKEND
// ============================================================

// ❌ ANTES (sem role)
app.post("/login", async (req, res) => {
  const user = await pool.query("SELECT id, name, email FROM users WHERE email = ?");
  const token = signToken({ sub: user.id, email: user.email, name: user.name });
  res.json({ token, user });
});

// ✅ DEPOIS (com role)
app.post("/login", async (req, res) => {
  const user = await pool.query("SELECT id, name, email, role FROM users WHERE email = ?");
  //                                                              ^^^^^
  const token = signToken({ 
    sub: user.id, 
    email: user.email, 
    name: user.name,
    role: user.role  // ← ADICIONAR ISSO
  });
  res.json({ token, user });
});

// ============================================================
// PASSO 3: PROTEGER ROTAS NO BACKEND
// ============================================================

const { 
  authenticateToken, 
  requireAdmin, 
  requirePermission 
} = require("./middleware/auth");

// Exemplo 1: Apenas Admin
app.get("/admin", authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: "Painel Admin" });
});

// Exemplo 2: Com permissão específica
app.get("/reports", authenticateToken, requirePermission("view_reports"), (req, res) => {
  res.json({ reports: [...] });
});

// ============================================================
// PASSO 4: USAR NO FRONTEND - HOOKS
// ============================================================

// Componente exemplo:
import { useHierarchy } from "@/hooks/useHierarchy";

function MyComponent() {
  const { isAdmin, isVIP, canAccessAdminPanel, user } = useHierarchy();

  if (!user) return <p>Não autenticado</p>;

  return (
    <div>
      <p>Olá {user.name}!</p>
      {isAdmin && <p>✓ Você é Admin</p>}
      {isVIP && <p>💎 Você é VIP</p>}
      {canAccessAdminPanel && <AdminButton />}
    </div>
  );
}

// ============================================================
// PASSO 5: PROTEGER COMPONENTES COM GUARDS
// ============================================================

import { AdminGuard, PermissionGuard } from "@/components/hierarchy/RoleGuards";

// Exemplo 1: Admin Guard
<AdminGuard fallback={<div>Acesso negado</div>}>
  <AdminPanel />
</AdminGuard>

// Exemplo 2: Permission Guard
<PermissionGuard permission="manage_campaigns">
  <CampaignManager />
</PermissionGuard>

// ============================================================
// PASSO 6: ALTERAR ROLE DE UM USUÁRIO (Admin)
// ============================================================

app.post("/admin/users/:id/change-role", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { newRole } = req.body; // "admin", "supervisor", "vip_black", etc

  await pool.query("UPDATE users SET role = ? WHERE id = ?", [newRole, id]);
  
  res.json({ message: "Role atualizado para " + newRole });
});

// ============================================================
// PASSO 7: CRIAR UM ADMIN PADRÃO
// ============================================================

// Execute uma vez no banco:
/*
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin', 'admin@trenzada.com', '$2b$10$...hash...', 'admin');
*/

// ============================================================
// ROLES DISPONÍVEIS
// ============================================================

const ROLES = {
  AFFILIATE: "affiliate",           // 1 - Padrão
  VIP_SILVER: "vip_silver",         // 2 - VIP Básico
  VIP_GOLD: "vip_gold",             // 3 - VIP Intermediário
  VIP_BLACK: "vip_black",           // 4 - VIP Premium
  AFFILIATE_MANAGER: "affiliate_manager", // 5 - Gerente
  SUPERVISOR: "supervisor",         // 6 - Supervisor
  ADMIN: "admin",                   // 7 - Admin
};

// ============================================================
// PERMISSÕES DISPONÍVEIS
// ============================================================

const EXAMPLE_PERMISSIONS = {
  dashboard_admin: "Acessar painel admin",
  view_total_billing: "Ver faturamento total",
  manage_users: "Gerenciar usuários",
  manage_affiliates: "Gerenciar todos os afiliados",
  view_my_affiliates: "Ver apenas seus afiliados",
  view_reports: "Ver relatórios",
  manage_campaigns: "Gerenciar campanhas",
  access_academy: "Acessar academia",
  access_vip_features: "Acessar features VIP",
  access_black_features: "Features exclusivas Black",
  access_gold_features: "Features exclusivas Gold",
  access_silver_features: "Features exclusivas Silver",
  // ... mais permissões em hierarchyTypes.ts
};

// ============================================================
// FUNÇÕES ÚTEIS FRONTEND
// ============================================================

import { 
  hasPermission, 
  isVIPUser,
  canViewTotalBilling,
  compareRoles 
} from "@/app/auth/hierarchyUtils";

// Verificar permissão
hasPermission(user, "manage_campaigns"); // true/false

// Verificar se é VIP
isVIPUser(user); // true/false

// Verificar se pode ver faturamento
canViewTotalBilling(user); // true/false

// Comparar dois roles (1 = maior, -1 = menor, 0 = igual)
compareRoles("admin", "vip_black"); // 1

// ============================================================
// FUNÇÕES ÚTEIS BACKEND
// ============================================================

const { 
  requireAdmin,
  requireRole,
  requirePermission,
  requireAllPermissions,
  requireAnyPermission,
  requireVIP,
  getRoleLevel,
  compareRoles
} = require("./middleware/auth");

// Middleware para admin
app.get("/rota", authenticateToken, requireAdmin, ...);

// Middleware para múltiplos roles
app.get("/rota", authenticateToken, requireRole("admin", "supervisor"), ...);

// Middleware para permissão
app.get("/rota", authenticateToken, requirePermission("manage_campaigns"), ...);

// Middleware para VIP
app.get("/rota", authenticateToken, requireVIP, ...);

// Obter nível do role (1-7)
getRoleLevel("admin"); // 7

// ============================================================
// EXEMPLO COMPLETO: PÁGINA COM ACESSO BASEADO EM ROLE
// ============================================================

import { useHierarchy } from "@/hooks/useHierarchy";
import { AdminGuard } from "@/components/hierarchy/RoleGuards";

function Dashboard() {
  const { isAdmin, isVIP, user } = useHierarchy();

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Conteúdo para todos */}
      <p>Bem-vindo, {user?.name}!</p>

      {/* Conteúdo apenas para VIP */}
      {isVIP && (
        <div className="bg-purple-100 p-4 rounded">
          <h2>💎 Features VIP</h2>
          <p>Relatórios avançados, suporte prioritário, etc</p>
        </div>
      )}

      {/* Conteúdo apenas para Admin */}
      <AdminGuard>
        <div className="bg-red-100 p-4 rounded">
          <h2>🔒 Painel Admin</h2>
          <p>Gerenciar usuários, campanhas, etc</p>
        </div>
      </AdminGuard>
    </div>
  );
}

// ============================================================
// EXEMPLO: VERIFICAR MÚLTIPLAS PERMISSÕES
// ============================================================

import { hasAllPermissions, hasAnyPermission } from "@/app/auth/hierarchyUtils";

// Precisa de TODAS as permissões (AND)
hasAllPermissions(user, ["manage_campaigns", "manage_affiliates"]); 

// Precisa de PELO MENOS UMA (OR)
hasAnyPermission(user, ["view_total_billing", "manage_users"]);

// ============================================================
// EXEMPLO: CONTEÚDO DINÂMICO POR ROLE
// ============================================================

function SidebarMenu() {
  const { isAdmin, isSupervisor, isVIP } = useHierarchy();

  return (
    <nav>
      <a href="/dashboard">Dashboard</a>
      {isVIP && <a href="/vip-features">💎 Features VIP</a>}
      {isSupervisor && <a href="/manage-campaigns">Campanhas</a>}
      {isAdmin && <a href="/admin">⚙️ Configurações</a>}
    </nav>
  );
}

// ============================================================
// TESTANDO A HIERARQUIA
// ============================================================

/*
1. Criar usuários com roles diferentes no DB:
   - INSERT INTO users... role='admin'
   - INSERT INTO users... role='vip_black'
   - INSERT INTO users... role='affiliate'

2. Fazer login com cada um e verificar:
   - Token contém o role
   - Componentes renderizam corretamente
   - Rotas protegidas retornam erro 403 para sem permissão

3. Tentar alterar role:
   POST /admin/users/2/change-role
   { "newRole": "vip_black" }

4. Verificar que Supervisor não vê faturamento total:
   GET /billing/total → 403 Forbidden
*/

// ============================================================
// PRÓXIMOS PASSOS
// ============================================================

/*
✅ 1. Copie os arquivos para seu projeto
✅ 2. Execute a migração do banco de dados
✅ 3. Atualize a rota /login para incluir role
✅ 4. Adicione os middlewares às rotas
✅ 5. Importe hooks e guards nos componentes React
✅ 6. Teste cada nível de permissão
✅ 7. Customize conforme necessário

Arquivos criados:
- src/app/auth/hierarchyTypes.ts
- src/app/auth/hierarchyUtils.ts
- src/app/hooks/useHierarchy.ts
- src/app/components/hierarchy/RoleDisplay.tsx
- src/app/components/hierarchy/RoleGuards.tsx
- src/app/pages/HierarchyDashboard.tsx
- backend/middleware/auth.js
- backend/database/migration-hierarchy.js
- backend/routes/hierarchy-example.js
*/
