/**
 * Utilidades para verificação de hierarquia e permissões
 */

import {
  UserRole,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS,
  Permission,
} from "./hierarchyTypes";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  managerId?: number; // Para afiliados vinculados a um gerente
}

/**
 * Verifica se um usuário tem uma permissão específica
 */
export function hasPermission(user: User, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[user.role];
  return permissions.includes(permission);
}

/**
 * Verifica se um usuário tem múltiplas permissões (AND lógico)
 */
export function hasAllPermissions(user: User, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(user, p));
}

/**
 * Verifica se um usuário tem pelo menos uma permissão (OR lógico)
 */
export function hasAnyPermission(user: User, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(user, p));
}

/**
 * Verifica se um role tem uma permissão
 */
export function roleHasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes(permission);
}

/**
 * Compara dois roles na hierarquia
 * Retorna: 1 se role1 > role2, -1 se role1 < role2, 0 se iguais
 */
export function compareRoles(role1: UserRole, role2: UserRole): number {
  const h1 = ROLE_HIERARCHY[role1];
  const h2 = ROLE_HIERARCHY[role2];
  
  if (h1 > h2) return 1;
  if (h1 < h2) return -1;
  return 0;
}

/**
 * Verifica se role1 é maior ou igual a role2 na hierarquia
 */
export function isRoleGreaterOrEqual(role1: UserRole, role2: UserRole): boolean {
  return ROLE_HIERARCHY[role1] >= ROLE_HIERARCHY[role2];
}

/**
 * Verifica se role1 é estritamente maior que role2
 */
export function isRoleGreater(role1: UserRole, role2: UserRole): boolean {
  return ROLE_HIERARCHY[role1] > ROLE_HIERARCHY[role2];
}

/**
 * Verifica se um usuário pode acessar o painel admin
 */
export function canAccessAdminPanel(user: User): boolean {
  return hasPermission(user, "dashboard_admin");
}

/**
 * Verifica se um usuário pode gerenciar afiliados
 */
export function canManageAffiliates(user: User): boolean {
  return hasPermission(user, "manage_affiliates") || 
         hasPermission(user, "view_my_affiliates");
}

/**
 * Verifica se um usuário pode ver faturamento total
 */
export function canViewTotalBilling(user: User): boolean {
  return hasPermission(user, "view_total_billing");
}

/**
 * Obtém o nível hierárquico de um role (1-7)
 */
export function getRoleLevel(role: UserRole): number {
  return ROLE_HIERARCHY[role];
}

/**
 * Verifica se um usuário pode gerenciar outro usuário
 * Apenas usuários de rank superior podem gerenciar inferiores
 */
export function canManageUser(admin: User, target: User): boolean {
  if (!hasPermission(admin, "manage_users")) {
    return false;
  }
  return isRoleGreater(admin.role, target.role);
}

/**
 * Verifica se um usuário pode acessar as features VIP
 */
export function isVIPUser(user: User): boolean {
  return [UserRole.VIP_BLACK, UserRole.VIP_GOLD, UserRole.VIP_SILVER].includes(
    user.role
  );
}

/**
 * Verifica se um usuário é VIP Black (maior nível VIP)
 */
export function isVIPBlack(user: User): boolean {
  return user.role === UserRole.VIP_BLACK;
}

/**
 * Verifica se um usuário é VIP Gold
 */
export function isVIPGold(user: User): boolean {
  return user.role === UserRole.VIP_GOLD;
}

/**
 * Verifica se um usuário é VIP Silver (menor nível VIP)
 */
export function isVIPSilver(user: User): boolean {
  return user.role === UserRole.VIP_SILVER;
}

/**
 * Retorna todas as roles que um usuário pode gerenciar
 */
export function getManageableRoles(userRole: UserRole): UserRole[] {
  const userLevel = ROLE_HIERARCHY[userRole];
  return Object.entries(ROLE_HIERARCHY)
    .filter(([_, level]) => level < userLevel)
    .map(([role]) => role as UserRole);
}

/**
 * Obtém um valor com base na hierarquia do usuário
 * Útil para comissões, bônus, etc.
 */
export function getValueByRole<T>(
  role: UserRole,
  values: Partial<Record<UserRole, T>>
): T | undefined {
  return values[role];
}

/**
 * Verifica se um usuário é administrador
 */
export function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN;
}

/**
 * Verifica se um usuário é supervisor
 */
export function isSupervisor(user: User): boolean {
  return user.role === UserRole.SUPERVISOR;
}

/**
 * Verifica se um usuário é gerente de afiliados
 */
export function isAffiliateManager(user: User): boolean {
  return user.role === UserRole.AFFILIATE_MANAGER;
}

/**
 * Verifica se um usuário é um afiliado comum
 */
export function isAffiliate(user: User): boolean {
  return user.role === UserRole.AFFILIATE;
}
