/**
 * Componente para exibir informações de hierarquia do usuário
 */

import React from "react";
import { User } from "../auth/hierarchyUtils";
import { ROLE_INFO_MAP, ROLE_COLORS } from "../auth/hierarchyTypes";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";

interface UserRoleBadgeProps {
  role: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function UserRoleBadge({ role, showLabel = true, size = "md" }: UserRoleBadgeProps) {
  const roleInfo = ROLE_INFO_MAP[role as keyof typeof ROLE_INFO_MAP];
  const colorClass = ROLE_COLORS[role as keyof typeof ROLE_COLORS] || "bg-gray-500";

  if (!roleInfo) return null;

  return (
    <Badge className={`${colorClass} text-white`}>
      {showLabel ? roleInfo.label : role}
    </Badge>
  );
}

interface RoleCardProps {
  role: User["role"];
  onClick?: () => void;
}

export function RoleCard({ role, onClick }: RoleCardProps) {
  const roleInfo = ROLE_INFO_MAP[role];
  if (!roleInfo) return null;

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <UserRoleBadge role={role} />
      </div>
      <h3 className="font-semibold text-lg mb-1">{roleInfo.label}</h3>
      <p className="text-sm text-gray-600 mb-3">{roleInfo.description}</p>
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Funcionalidades:</p>
        <ul className="text-xs space-y-1">
          {roleInfo.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="text-gray-600">✓ {feature}</li>
          ))}
          {roleInfo.features.length > 3 && (
            <li className="text-gray-500">+ {roleInfo.features.length - 3} mais</li>
          )}
        </ul>
      </div>
    </Card>
  );
}

interface RoleHierarchyViewProps {
  roles: User["role"][];
  currentUserRole?: User["role"];
}

export function RoleHierarchyView({ roles, currentUserRole }: RoleHierarchyViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roles.map((role) => (
        <div
          key={role}
          className={currentUserRole === role ? "ring-2 ring-blue-500 rounded-lg" : ""}
        >
          <RoleCard role={role} />
        </div>
      ))}
    </div>
  );
}

interface PermissionListProps {
  role: User["role"];
}

export function PermissionList({ role }: PermissionListProps) {
  const roleInfo = ROLE_INFO_MAP[role];
  if (!roleInfo) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Permissões:</h4>
      <div className="space-y-1">
        {roleInfo.permissions.map((permission) => (
          <div key={permission} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{permission}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
