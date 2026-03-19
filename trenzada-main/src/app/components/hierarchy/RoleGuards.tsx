/**
 * Componentes para proteção de rotas baseadas em roles e permissões
 */

import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { User } from "../auth/hierarchyUtils";
import { getSession } from "../auth/auth";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isVIPUser,
  isAdmin,
} from "../auth/hierarchyUtils";
import { Permission } from "../auth/hierarchyTypes";

interface RoleGuardProps {
  children: ReactNode;
  requiredRoles: string[];
  fallback?: ReactNode;
}

/**
 * Guard para proteger componentes baseado em roles específicos
 */
export function RoleGuard({ children, requiredRoles, fallback }: RoleGuardProps) {
  const session = getSession();
  
  if (!session || !("role" in session)) {
    return fallback || <div>Acesso negado</div>;
  }

  const isAllowed = requiredRoles.includes(session.role);

  return isAllowed ? <>{children}</> : (fallback || <div>Acesso negado</div>);
}

interface PermissionGuardProps {
  children: ReactNode;
  permission: Permission;
  fallback?: ReactNode;
}

/**
 * Guard para proteger componentes baseado em uma permissão
 */
export function PermissionGuard({ children, permission, fallback }: PermissionGuardProps) {
  const session = getSession();
  
  if (!session || !("role" in session)) {
    return fallback || null;
  }

  // Precisa ser um usuário com a função completa
  const user: User = {
    id: 0,
    name: session.name || "",
    email: session.email,
    role: session.role,
  };

  const isAllowed = hasPermission(user, permission);

  return isAllowed ? <>{children}</> : (fallback || null);
}

interface AnyPermissionGuardProps {
  children: ReactNode;
  permissions: Permission[];
  fallback?: ReactNode;
}

/**
 * Guard para proteger componentes baseado em múltiplas permissões (OR)
 */
export function AnyPermissionGuard({ children, permissions, fallback }: AnyPermissionGuardProps) {
  const session = getSession();
  
  if (!session || !("role" in session)) {
    return fallback || null;
  }

  const user: User = {
    id: 0,
    name: session.name || "",
    email: session.email,
    role: session.role,
  };

  const isAllowed = hasAnyPermission(user, permissions);

  return isAllowed ? <>{children}</> : (fallback || null);
}

interface AllPermissionsGuardProps {
  children: ReactNode;
  permissions: Permission[];
  fallback?: ReactNode;
}

/**
 * Guard para proteger componentes baseado em múltiplas permissões (AND)
 */
export function AllPermissionsGuard({ children, permissions, fallback }: AllPermissionsGuardProps) {
  const session = getSession();
  
  if (!session || !("role" in session)) {
    return fallback || null;
  }

  const user: User = {
    id: 0,
    name: session.name || "",
    email: session.email,
    role: session.role,
  };

  const isAllowed = hasAllPermissions(user, permissions);

  return isAllowed ? <>{children}</> : (fallback || null);
}

interface VIPGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Guard para proteger features VIP
 */
export function VIPGuard({ children, fallback }: VIPGuardProps) {
  const session = getSession();
  
  if (!session || !("role" in session)) {
    return fallback || null;
  }

  const user: User = {
    id: 0,
    name: session.name || "",
    email: session.email,
    role: session.role,
  };

  const isAllowed = isVIPUser(user);

  return isAllowed ? <>{children}</> : (fallback || null);
}

interface AdminGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Guard para proteger rotas admin
 */
export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const session = getSession();
  
  if (!session || !("role" in session)) {
    return fallback || <div>Apenas administradores</div>;
  }

  const user: User = {
    id: 0,
    name: session.name || "",
    email: session.email,
    role: session.role,
  };

  const isAllowed = isAdmin(user);

  return isAllowed ? <>{children}</> : (fallback || <div>Apenas administradores podem acessar</div>);
}

interface ConditionalRenderProps {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Renderiza condicionalmente baseado em uma condição booleana
 */
export function ConditionalRender({ condition, children, fallback }: ConditionalRenderProps) {
  return condition ? <>{children}</> : (fallback || null);
}
