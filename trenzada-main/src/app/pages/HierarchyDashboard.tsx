/**
 * Página de Dashboard demonstrando o Sistema de Hierarquia
 * Mostra como usar componentes, guards e hooks
 */

import { CardContent } from "../components/ui/card"; 
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { RoleCard, RoleHierarchyView, PermissionList, UserRoleBadge } from "../components/hierarchy/RoleDisplay";
import { 
  AdminGuard, 
  PermissionGuard, 
  RoleGuard, 
  VIPGuard,
  AnyPermissionGuard 
} from "../components/hierarchy/RoleGuards";
import { useHierarchy, useHasPermission, useIsVIP } from "../hooks/useHierarchy";
import { ROLE_INFO_MAP, ROLE_LABELS, ROLE_COLORS, UserRole } from "../auth/hierarchyTypes";
import { memo } from "react";

// Componente que mostra informações do usuário atual
function CurrentUserSection() {
  const hierarchy = useHierarchy();

  if (!hierarchy.user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800">Usuário não autenticado</h3>
        <p className="text-sm text-yellow-700">Faça login para ver suas informações</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Suas Informações</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Nome:</strong> {hierarchy.user.name}</p>
          <p><strong>Email:</strong> {hierarchy.user.email}</p>
          <div className="flex items-center gap-2">
            <strong>Role:</strong>
            <UserRoleBadge role={hierarchy.user.role} />
          </div>
        </div>
      </div>

      {/* Mostra status de permissões */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className={hierarchy.isAdmin ? "text-green-600" : "text-gray-400"}>
            ✓ Administrador
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={hierarchy.isSupervisor ? "text-green-600" : "text-gray-400"}>
            ✓ Supervisor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={hierarchy.isVIP ? "text-green-600" : "text-gray-400"}>
            ✓ VIP
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={hierarchy.canAccessAdminPanel ? "text-green-600" : "text-gray-400"}>
            ✓ Pode acessar painel admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={hierarchy.canViewTotalBilling ? "text-green-600" : "text-gray-400"}>
            ✓ Pode ver faturamento total
          </span>
        </div>
      </div>
    </div>
  );
}

// Componente que mostra painel admin (apenas para admins)
function AdminPanel() {
  return (
    <AdminGuard 
      fallback={
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          ⛔ Acesso negado: Apenas administradores podem acessar
        </div>
      }
    >
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-3">🔒 Painel Administrativo</h3>
        <div className="space-y-2 text-sm">
          <p>✓ Gerenciar usuários do sistema</p>
          <p>✓ Ver faturamento total</p>
          <p>✓ Gerenciar todas as campanhas</p>
          <p>✓ Acessar relatórios completos</p>
          <Button className="mt-3">Ir para Admin</Button>
        </div>
      </div>
    </AdminGuard>
  );
}

// Features VIP
function VIPFeatures() {
  return (
    <VIPGuard
      fallback={
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-600 text-sm">
          💎 Features VIP disponíveis apenas para usuários VIP
        </div>
      }
    >
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-3">💎 Features VIP</h3>
        <div className="space-y-2 text-sm">
          <p>✓ Acesso a relatórios avançados</p>
          <p>✓ Suporte prioritário</p>
          <p>✓ Bônus e benefícios exclusivos</p>
          <Button className="mt-3">Ver Features</Button>
        </div>
      </div>
    </VIPGuard>
  );
}

// Seção de Faturamento (visível para Admin e Supervisor)
function BillingSection() {
  return (
    <AnyPermissionGuard
      permissions={["view_total_billing", "view_reports"]}
      fallback={
        <div className="text-sm text-gray-500">
          📊 Relatórios não disponíveis para seu role
        </div>
      }
    >
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h3 className="font-semibold text-indigo-900 mb-2">📊 Faturamento</h3>
        <p className="text-sm mb-3">Você tem acesso a relatórios financeiros</p>
        <Button>Ver Relatórios</Button>
      </div>
    </AnyPermissionGuard>
  );
}

// Componente principal
export default function HierarchyDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sistema de Hierarquia
          </h1>
          <p className="text-gray-600">
            Visualize sua estrutura de permissões e acesse recursos correspondentes ao seu role
          </p>
        </div>

        {/* Seção 1: Informações do Usuário */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">👤 Usuário Atual</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CurrentUserSection />
          </div>
        </section>

        {/* Seção 2: Conteúdo Protegido */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔐 Conteúdo Protegido</h2>
          <div className="space-y-4">
            <AdminPanel />
            <VIPFeatures />
            <BillingSection />
          </div>
        </section>

        {/* Seção 3: Todos os Roles */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 Estrutura de Roles</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Veja todos os níveis de hierarquia disponíveis no sistema:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.values(UserRole).map((role) => (
                <div key={role} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={ROLE_COLORS[role]}>
                      {ROLE_LABELS[role]}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {ROLE_INFO_MAP[role]?.description}
                  </p>
                  <div className="space-y-1">
                    {ROLE_INFO_MAP[role]?.features.slice(0, 2).map((f, i) => (
                      <p key={i} className="text-xs text-gray-500">✓ {f}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 4: Tabela de Permissões */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">🔑 Matriz de Permissões</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold">Role</th>
                  <th className="text-left p-3 font-semibold">Admin</th>
                  <th className="text-left p-3 font-semibold">Faturamento</th>
                  <th className="text-left p-3 font-semibold">Afiliados</th>
                  <th className="text-left p-3 font-semibold">Campanhas</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(UserRole).map((role) => (
                  <tr key={role} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Badge className={ROLE_COLORS[role]}>
                        {ROLE_LABELS[role]}
                      </Badge>
                    </td>
                    <td className="p-3">{ROLE_INFO_MAP[role]?.permissions.includes("dashboard_admin") ? "✅" : "❌"}</td>
                    <td className="p-3">{ROLE_INFO_MAP[role]?.permissions.includes("view_total_billing") ? "✅" : "❌"}</td>
                    <td className="p-3">{ROLE_INFO_MAP[role]?.permissions.includes("manage_affiliates") || ROLE_INFO_MAP[role]?.permissions.includes("view_my_affiliates") ? "✅" : "❌"}</td>
                    <td className="p-3">{ROLE_INFO_MAP[role]?.permissions.includes("manage_campaigns") ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
