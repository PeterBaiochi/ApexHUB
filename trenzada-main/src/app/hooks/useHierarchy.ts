/**
 * Custom Hook para usar a hierarquia e permissões no React
 */

import { useMemo } from "react";
import { getSession } from "../auth/auth";
import {
  User,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isVIPUser,
  isAdmin,
  isSupervisor,
  isAffiliateManager,
  isAffiliate,
  isVIPBlack,
  isVIPGold,
  isVIPSilver,
  canAccessAdminPanel,
  canManageAffiliates,
  canViewTotalBilling,
} from "../auth/hierarchyUtils";
import { Permission } from "../auth/hierarchyTypes";

export function useUserRole() {
  const session = getSession();
  
  const user = useMemo((): User | null => {
    if (!session || !("role" in session)) {
      return null;
    }

    return {
      id: 0,
      name: session.name || "",
      email: session.email,
      role: session.role,
    };
  }, [session]);

  return user;
}

export function useHasPermission(permission: Permission) {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return hasPermission(user, permission);
  }, [user, permission]);
}

export function useHasAnyPermission(permissions: Permission[]) {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return hasAnyPermission(user, permissions);
  }, [user, permissions]);
}

export function useHasAllPermissions(permissions: Permission[]) {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return hasAllPermissions(user, permissions);
  }, [user, permissions]);
}

export function useIsVIP() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isVIPUser(user);
  }, [user]);
}

export function useIsAdmin() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isAdmin(user);
  }, [user]);
}

export function useIsSupervisor() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isSupervisor(user);
  }, [user]);
}

export function useIsAffiliateManager() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isAffiliateManager(user);
  }, [user]);
}

export function useIsAffiliate() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isAffiliate(user);
  }, [user]);
}

export function useIsVIPBlack() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isVIPBlack(user);
  }, [user]);
}

export function useIsVIPGold() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isVIPGold(user);
  }, [user]);
}

export function useIsVIPSilver() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return isVIPSilver(user);
  }, [user]);
}

export function useCanAccessAdminPanel() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return canAccessAdminPanel(user);
  }, [user]);
}

export function useCanManageAffiliates() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return canManageAffiliates(user);
  }, [user]);
}

export function useCanViewTotalBilling() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) return false;
    return canViewTotalBilling(user);
  }, [user]);
}

/**
 * Hook principal que retorna todas as informações de hierarquia e permissões
 */
export function useHierarchy() {
  const user = useUserRole();
  
  return useMemo(() => {
    if (!user) {
      return {
        user: null,
        isAdmin: false,
        isSupervisor: false,
        isAffiliateManager: false,
        isAffiliate: false,
        isVIP: false,
        isVIPBlack: false,
        isVIPGold: false,
        isVIPSilver: false,
        canAccessAdminPanel: false,
        canManageAffiliates: false,
        canViewTotalBilling: false,
        hasPermission: () => false,
      };
    }

    return {
      user,
      isAdmin: isAdmin(user),
      isSupervisor: isSupervisor(user),
      isAffiliateManager: isAffiliateManager(user),
      isAffiliate: isAffiliate(user),
      isVIP: isVIPUser(user),
      isVIPBlack: isVIPBlack(user),
      isVIPGold: isVIPGold(user),
      isVIPSilver: isVIPSilver(user),
      canAccessAdminPanel: canAccessAdminPanel(user),
      canManageAffiliates: canManageAffiliates(user),
      canViewTotalBilling: canViewTotalBilling(user),
      hasPermission: (permission: Permission) => hasPermission(user, permission),
    };
  }, [user]);
}
