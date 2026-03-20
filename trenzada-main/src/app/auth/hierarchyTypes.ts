/**
 * Sistema de Hierarquia da Plataforma Trenzada
 * Define todos os níveis de acesso e permissões
 */

export enum UserRole {
  ADMIN = "admin",
  SUPERVISOR = "supervisor",
  AFFILIATE_MANAGER = "affiliate_manager",
  VIP_BLACK = "vip_black",
  VIP_GOLD = "vip_gold",
  VIP_SILVER = "vip_silver",
  AFFILIATE = "affiliate",
}

/**
 * Hierarquia de Privilégios
 * Níveis maiores = mais permissões
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.ADMIN]: 7,
  [UserRole.SUPERVISOR]: 6,
  [UserRole.AFFILIATE_MANAGER]: 5,
  [UserRole.VIP_BLACK]: 4,
  [UserRole.VIP_GOLD]: 3,
  [UserRole.VIP_SILVER]: 2,
  [UserRole.AFFILIATE]: 1,
};

/**
 * Descrição amigável de cada role
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrador",
  [UserRole.SUPERVISOR]: "Supervisor",
  [UserRole.AFFILIATE_MANAGER]: "Gerente de Afiliados",
  [UserRole.VIP_BLACK]: "VIP Black",
  [UserRole.VIP_GOLD]: "VIP Gold",
  [UserRole.VIP_SILVER]: "VIP Silver",
  [UserRole.AFFILIATE]: "Afiliado",
};

/**
 * Cores para cada role (para UI)
 */
export const ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "bg-red-600",
  [UserRole.SUPERVISOR]: "bg-purple-600",
  [UserRole.AFFILIATE_MANAGER]: "bg-blue-600",
  [UserRole.VIP_BLACK]: "bg-black",
  [UserRole.VIP_GOLD]: "bg-yellow-600",
  [UserRole.VIP_SILVER]: "bg-gray-400",
  [UserRole.AFFILIATE]: "bg-gray-200",
};

/**
 * Estilo visual por nível VIP (diferenciação leve sem alterar layout inteiro)
 */
export const VIP_VISUALS: Partial<
  Record<
    UserRole,
    {
      chipClass: string;
      panelClass: string;
      title: string;
      perk: string;
    }
  >
> = {
  [UserRole.VIP_SILVER]: {
    chipClass:
      "bg-gradient-to-r from-gray-300/20 to-gray-500/20 border border-gray-300/40 text-gray-200",
    panelClass: "border-gray-300/30 bg-gradient-to-r from-gray-200/10 to-transparent",
    title: "VIP Silver",
    perk: "Suporte prioritário e materiais VIP de conversão.",
  },
  [UserRole.VIP_GOLD]: {
    chipClass:
      "bg-gradient-to-r from-yellow-400/20 to-amber-600/20 border border-yellow-400/40 text-yellow-300",
    panelClass: "border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 to-transparent",
    title: "VIP Gold",
    perk: "Acesso antecipado a campanhas e bônus de performance.",
  },
  [UserRole.VIP_BLACK]: {
    chipClass:
      "bg-gradient-to-r from-violet-500/25 to-fuchsia-700/25 border border-violet-400/40 text-violet-200 shadow-[0_0_16px_rgba(168,85,247,0.25)]",
    panelClass: "border-violet-400/35 bg-gradient-to-r from-violet-500/15 to-transparent",
    title: "VIP Black",
    perk: "Prioridade máxima, suporte dedicado e vantagens exclusivas Black.",
  },
};

/**
 * Permissões específicas por role
 */
export type Permission = 
  | "dashboard_admin" // Painel de administração
  | "view_total_billing" // Ver faturamento total
  | "manage_users" // Gerenciar usuários
  | "manage_affiliates" // Gerenciar afiliados (próprios ou todos)
  | "view_reports" // Ver relatórios
  | "manage_campaigns" // Gerenciar campanhas
  | "view_my_affiliates" // Ver apenas seus afiliados (Gerente)
  | "view_my_links" // Ver seus próprios links
  | "access_academy" // Acessar academia
  | "access_compliance" // Acessar compliance
  | "access_vip_features" // Acessar features VIP
  | "access_black_features" // Features exclusivas Black
  | "access_gold_features" // Features exclusivas Gold
  | "access_silver_features" // Features exclusivas Silver
  | "manage_commissions"; // Gerenciar comissões

/**
 * Mapeamento de Roles para Permissões
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
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
  [UserRole.SUPERVISOR]: [
    "view_reports",
    "manage_campaigns",
    "manage_affiliates",
    "access_academy",
    "access_compliance",
    // NÃO tem: view_total_billing, dashboard_admin, manage_users
  ],
  [UserRole.AFFILIATE_MANAGER]: [
    "view_my_affiliates", // Apenas seus afiliados
    "view_reports",
    "manage_campaigns",
    "access_academy",
    "view_my_links",
  ],
  [UserRole.VIP_BLACK]: [
    "access_vip_features",
    "access_black_features",
    "view_my_links",
    "access_academy",
    "manage_commissions",
    "view_reports",
  ],
  [UserRole.VIP_GOLD]: [
    "access_vip_features",
    "access_gold_features",
    "view_my_links",
    "access_academy",
    "view_reports",
  ],
  [UserRole.VIP_SILVER]: [
    "access_vip_features",
    "access_silver_features",
    "view_my_links",
    "access_academy",
  ],
  [UserRole.AFFILIATE]: [
    "view_my_links",
    "access_academy",
  ],
};

/**
 * Informações detalhadas sobre cada role
 */
export interface RoleInfo {
  role: UserRole;
  label: string;
  description: string;
  permissions: Permission[];
  features: string[];
}

export const ROLE_INFO_MAP: Record<UserRole, RoleInfo> = {
  [UserRole.ADMIN]: {
    role: UserRole.ADMIN,
    label: "Administrador",
    description: "Acesso completo ao sistema",
    permissions: ROLE_PERMISSIONS[UserRole.ADMIN],
    features: [
      "Painel administrativo completo",
      "Ver faturamento total",
      "Gerenciar todos os usuários",
      "Gerenciar todas as campanhas",
      "Acessar relatórios completos",
      "Gerenciar comissões",
    ],
  },
  [UserRole.SUPERVISOR]: {
    role: UserRole.SUPERVISOR,
    label: "Supervisor",
    description: "Supervisão de operações sem acesso a faturamento total",
    permissions: ROLE_PERMISSIONS[UserRole.SUPERVISOR],
    features: [
      "Gerenciar campanhas",
      "Ver relatórios operacionais",
      "Gerenciar afiliados",
      "Acessar compliance",
      "Sem acesso a faturamento total",
    ],
  },
  [UserRole.AFFILIATE_MANAGER]: {
    role: UserRole.AFFILIATE_MANAGER,
    label: "Gerente de Afiliados",
    description: "Gerencia apenas seus afiliados vinculados",
    permissions: ROLE_PERMISSIONS[UserRole.AFFILIATE_MANAGER],
    features: [
      "Ver e gerenciar apenas seus afiliados",
      "Campanhas pessoais",
      "Ver seus links de afiliação",
      "Relatórios pessoais",
      "Acesso à academia",
    ],
  },
  [UserRole.VIP_BLACK]: {
    role: UserRole.VIP_BLACK,
    label: "VIP Black",
    description: "Nível VIP máximo com funcionalidades premium",
    permissions: ROLE_PERMISSIONS[UserRole.VIP_BLACK],
    features: [
      "🎖️ Status VIP Black (maior que Gold e Silver)",
      "Acesso a todas as features VIP",
      "Features exclusivas Black",
      "Gerenciar comissões",
      "Relatórios avançados",
      "Suporte prioritário",
      "Bônus Black exclusivos",
    ],
  },
  [UserRole.VIP_GOLD]: {
    role: UserRole.VIP_GOLD,
    label: "VIP Gold",
    description: "Nível VIP intermediário com benefícios premium",
    permissions: ROLE_PERMISSIONS[UserRole.VIP_GOLD],
    features: [
      "🏆 Status VIP Gold",
      "Acesso a todas as features VIP",
      "Features exclusivas Gold",
      "Relatórios avançados",
      "Suporte prioritário",
      "Bônus Gold exclusivos",
    ],
  },
  [UserRole.VIP_SILVER]: {
    role: UserRole.VIP_SILVER,
    label: "VIP Silver",
    description: "Nível VIP inicial com benefícios básicos premium",
    permissions: ROLE_PERMISSIONS[UserRole.VIP_SILVER],
    features: [
      "⭐ Status VIP Silver",
      "Acesso a todas as features VIP",
      "Features exclusivas Silver",
      "Suporte prioritário",
      "Bônus Silver exclusivos",
    ],
  },
  [UserRole.AFFILIATE]: {
    role: UserRole.AFFILIATE,
    label: "Afiliado",
    description: "Afiliado padrão do sistema",
    permissions: ROLE_PERMISSIONS[UserRole.AFFILIATE],
    features: [
      "Acesso aos seus links de afiliação",
      "Acesso à academia",
      "Estatísticas básicas",
      "Suporte padrão",
    ],
  },
};
