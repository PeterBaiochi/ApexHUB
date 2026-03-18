import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
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
  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

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
            <span>Voltar ao ScaleHub</span>
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
              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1f] rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{displayName}</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{initials || "U"}</span>
                </div>
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
