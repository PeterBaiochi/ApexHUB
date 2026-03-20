import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { cn } from "./ui/utils";
import { getSession, logoutUser } from "../auth/auth";
import { ROLE_LABELS, UserRole } from "../auth/hierarchyTypes";
import React from "react";

const adminMenuItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/usuarios", label: "Usuários", icon: Users },
  { path: "/admin/projetos", label: "Projetos / Conteúdo", icon: FolderOpen },
  { path: "/admin/financeiro", label: "Financeiro", icon: DollarSign },
  { path: "/admin/notificacoes", label: "Notificações", icon: Bell },
  { path: "/admin/configuracoes", label: "Configurações", icon: Settings },
  { path: "/admin/admincampanhas", label: "Aprovar Campanhas", icon: Settings },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
  const role = (session?.role as UserRole | undefined) ?? UserRole.AFFILIATE;
  const displayRole = ROLE_LABELS[role] ?? ROLE_LABELS[UserRole.AFFILIATE];
  const notificationsRef = useRef<HTMLDivElement>(null);
  const adminMenuRef = useRef<HTMLDivElement>(null);

  const adminNotifications = [
    {
      id: "n1",
      title: "Novo cadastro aguardando aprovação",
      description: "3 usuários pendentes de verificação documental.",
      time: "Agora",
    },
    {
      id: "n2",
      title: "Solicitação de saque elevada",
      description: "Valor acima do limite padrão requer auditoria.",
      time: "18 min atrás",
    },
    {
      id: "n3",
      title: "Campanha enviada para revisão",
      description: "Campanha 'Black Offer' aguardando validação.",
      time: "1h atrás",
    },
  ];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target as Node)
      ) {
        setIsAdminMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0a0c]">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-[#121214] border-r border-[#27272a] flex flex-col transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#27272a]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-[#121214] rounded transform rotate-45"></div>
            </div>
            <span className="text-white text-xl font-bold">Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/admin" && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#1a1a1f]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#27272a] space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#1a1a1f] w-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao ApexHub</span>
          </Link>

          <button
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#121214] border-b border-[#27272a] px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1f] rounded-lg transition-colors"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Search */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0a0c] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => {
                    setIsNotificationsOpen((v) => !v);
                    setIsAdminMenuOpen(false);
                  }}
                  className="relative p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1f] rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-[#121214] border border-[#27272a] rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#27272a]">
                      <p className="text-xs font-black uppercase tracking-widest text-white">
                        Notificações Admin
                      </p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {adminNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 border-b border-[#27272a]/70 hover:bg-[#1a1a1f] transition-colors"
                        >
                          <p className="text-sm font-semibold text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.description}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1 uppercase">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile */}
              <div className="relative" ref={adminMenuRef}>
                <button
                  onClick={() => {
                    setIsAdminMenuOpen((v) => !v);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center gap-3 hover:bg-[#1a1a1f] rounded-lg px-2 py-1.5 transition-colors"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{displayName}</p>
                    <p className="text-xs text-gray-500">{displayRole}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{initials || "U"}</span>
                  </div>
                </button>

                {isAdminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#121214] border border-[#27272a] rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#27272a] bg-[#1a1a1f]">
                      <p className="text-xs font-black uppercase tracking-widest text-white">
                        Perfil Administrativo
                      </p>
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Nome</p>
                        <p className="text-white font-semibold">{displayName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Email</p>
                        <p className="text-white font-semibold">
                          {session?.email ?? "nao informado"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Cargo</p>
                        <p className="text-white font-semibold">{displayRole}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Permissão</p>
                        <p className="text-emerald-300 font-semibold">
                          Acesso administrativo habilitado
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0c] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
