/**
 * Middlewares para Autenticação e Autorização baseado em Hierarquia
 * Use esses middlewares nas rotas que precisam de validação
 */

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Tipos de roles (deve corresponder ao frontend)
 */
const ROLES = {
  ADMIN: "admin",
  SUPERVISOR: "supervisor",
  AFFILIATE_MANAGER: "affiliate_manager",
  VIP_BLACK: "vip_black",
  VIP_GOLD: "vip_gold",
  VIP_SILVER: "vip_silver",
  AFFILIATE: "affiliate",
};

/**
 * Hierarquia de roles
 */
const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 7,
  [ROLES.SUPERVISOR]: 6,
  [ROLES.AFFILIATE_MANAGER]: 5,
  [ROLES.VIP_BLACK]: 4,
  [ROLES.VIP_GOLD]: 3,
  [ROLES.VIP_SILVER]: 2,
  [ROLES.AFFILIATE]: 1,
};

/**
 * Permissões por role
 */
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "dashboard_admin",
    "view_total_billing",
    "manage_users",
    "manage_affiliates",
    "view_reports",
    "manage_campaigns",
    "access_academy",
    "access_compliance",
    "manage_commissions",
  ],
  [ROLES.SUPERVISOR]: [
    "view_reports",
    "manage_campaigns",
    "manage_affiliates",
    "access_academy",
    "access_compliance",
  ],
  [ROLES.AFFILIATE_MANAGER]: [
    "view_my_affiliates",
    "view_reports",
    "manage_campaigns",
    "access_academy",
    "view_my_links",
  ],
  [ROLES.VIP_BLACK]: [
    "access_vip_features",
    "access_black_features",
    "view_my_links",
    "access_academy",
    "manage_commissions",
    "view_reports",
  ],
  [ROLES.VIP_GOLD]: [
    "access_vip_features",
    "access_gold_features",
    "view_my_links",
    "access_academy",
    "view_reports",
  ],
  [ROLES.VIP_SILVER]: [
    "access_vip_features",
    "access_silver_features",
    "view_my_links",
    "access_academy",
  ],
  [ROLES.AFFILIATE]: [
    "view_my_links",
    "access_academy",
  ],
};

/**
 * Middleware para verificar autenticação (JWT)
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { sub, email, name, role }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
}

/**
 * Middleware para verificar se o usuário tem uma permissão específica
 */
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    
    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ 
        message: "Sem permissão para acessar este recurso",
        required: permission,
        userRole: req.user.role
      });
    }

    next();
  };
}

/**
 * Middleware para verificar se o usuário é Admin
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  if (req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({ 
      message: "Apenas administradores podem acessar este recurso" 
    });
  }

  next();
}

/**
 * Middleware para verificar se é um role específico
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Seu role não tem permissão para acessar este recurso",
        required: roles,
        userRole: req.user.role
      });
    }

    next();
  };
}

/**
 * Middleware para verificar hierarquia (usuário precisa ser de um nível maior)
 */
function requireRoleLevel(minimumLevel) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
    
    if (userLevel < minimumLevel) {
      return res.status(403).json({ 
        message: "Seu nível de acesso é insuficiente",
        minimumLevel,
        userLevel
      });
    }

    next();
  };
}

/**
 * Middleware para verificar múltiplas permissões (AND lógico)
 */
function requireAllPermissions(...permissions) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    const hasAll = permissions.every(p => userPermissions.includes(p));
    
    if (!hasAll) {
      return res.status(403).json({ 
        message: "Sem todas as permissões necessárias",
        required: permissions,
        userRole: req.user.role
      });
    }

    next();
  };
}

/**
 * Middleware para verificar se tem pelo menos uma permissão (OR lógico)
 */
function requireAnyPermission(...permissions) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    const hasAny = permissions.some(p => userPermissions.includes(p));
    
    if (!hasAny) {
      return res.status(403).json({ 
        message: "Sem nenhuma das permissões necessárias",
        required: permissions,
        userRole: req.user.role
      });
    }

    next();
  };
}

/**
 * Middleware para verificar acesso ao painel admin
 */
function requireAdminPanel(req, res, next) {
  return requirePermission("dashboard_admin")(req, res, next);
}

/**
 * Middleware para verificar acesso como Supervisor ou superior
 */
function requireSupervisorOrAbove(req, res, next) {
  return requireRoleLevel(ROLE_HIERARCHY[ROLES.SUPERVISOR])(req, res, next);
}

/**
 * Middleware para verificar acesso como VIP (qualquer nível)
 */
function requireVIP(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  const vipRoles = [ROLES.VIP_BLACK, ROLES.VIP_GOLD, ROLES.VIP_SILVER];
  
  if (!vipRoles.includes(req.user.role)) {
    return res.status(403).json({ 
      message: "Apenas usuários VIP podem acessar este recurso",
      userRole: req.user.role
    });
  }

  next();
}

/**
 * Middleware para verificar acesso VIP Black específico
 */
function requireVIPBlack(req, res, next) {
  return requireRole(ROLES.VIP_BLACK)(req, res, next);
}

/**
 * Helper para obter nível hierárquico de um role
 */
function getRoleLevel(role) {
  return ROLE_HIERARCHY[role] || 0;
}

/**
 * Helper para comparar dois roles
 */
function compareRoles(role1, role2) {
  const level1 = ROLE_HIERARCHY[role1] || 0;
  const level2 = ROLE_HIERARCHY[role2] || 0;
  
  if (level1 > level2) return 1;
  if (level1 < level2) return -1;
  return 0;
}

module.exports = {
  ROLES,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS,
  authenticateToken,
  requirePermission,
  requireAdmin,
  requireRole,
  requireRoleLevel,
  requireAllPermissions,
  requireAnyPermission,
  requireAdminPanel,
  requireSupervisorOrAbove,
  requireVIP,
  requireVIPBlack,
  getRoleLevel,
  compareRoles,
};
