import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  AlertCircle,
  Activity,
  Timer,
  Clock,
  ChevronLeft,
  ChevronRight,
  Wallet,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  PlusCircle,
  BellRing
} from "lucide-react";
import {
  LayoutDashboard,
  Megaphone,
  Link2,
  Trophy,
  GraduationCap,
  Gift,
  ShieldCheck,
  Users,
  DollarSign,
  User,
  HelpCircle,
  FileText,
  Bell,
  LogOut,
  Mail,
  Wand2,
  Package,
  Share2,
  Menu,
  X,
  Diamond,
  Search,
  TrendingUp,
  Settings,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { GlobalSearch } from "./GlobalSearch";
import { getSession, logoutUser } from "../auth/auth";
import { ROLE_LABELS, UserRole, VIP_VISUALS } from "../auth/hierarchyTypes";

const menuItems = [
  { path: "/", label: "Visão Geral", icon: LayoutDashboard },
  { path: "/meus-links", label: "Meus Links", icon: Link2 },
  { path: "/ranking-geral", label: "Ranking Geral", icon: Trophy },
  { path: "/academy", label: "Academy", icon: GraduationCap },
  { path: "/premiacoes", label: "Premiações", icon: Gift },
  { path: "/compliance", label: "Compliance", icon: ShieldCheck },
  { path: "/indicacoes", label: "Indicações", icon: Users },
  { path: "/financeiro", label: "Financeiro", icon: DollarSign },
  { path: "/copy-ia", label: "Copy com IA", icon: Wand2 },
  { path: "/suporte", label: "Suporte", icon: HelpCircle },
  { path: "/termos-de-uso", label: "Termos de Uso", icon: FileText },
];

const quickAccessItems = [
  { path: "/campanhas", label: "Campanhas", icon: Megaphone },
  { path: "/produtos", label: "Produtos", icon: Package },
  { path: "/email-marketing", label: "Email Marketing", icon: Mail },
  { path: "/divulgacao", label: "Materiais", icon: Share2 },
];

// ==========================================
// BANNER DE TERMOS (Versão Mobile)
// ==========================================
export function BannerTermosPendente({ hasAcceptedTerms }: { hasAcceptedTerms: boolean }) {
  if (hasAcceptedTerms) return null;

  return (
    <div className="bg-yellow-500/10 border-b border-yellow-500/30 w-full px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 z-50">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
        <p className="text-yellow-500 text-sm font-medium text-center sm:text-left">
          <strong>Atenção:</strong> Seu acesso está limitado. Para utilizar todas as funcionalidades da plataforma, você precisa ler e concordar com nossos Termos de Uso.
        </p>
      </div>
      <Link
        to="/termos-de-uso"
        className="shrink-0 flex items-center gap-2 bg-yellow-500 text-black px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-yellow-600 transition-colors"
      >
        Ler Termos <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL DO LAYOUT
// ==========================================
export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Estados de Responsividade da Sidebar (Lei 5)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktopNavCollapsed, setIsDesktopNavCollapsed] = useState(false);

  // ==========================================
  // ESTADOS PARA FIREBASE (Lei 4 - PRESERVADO)
  // ==========================================
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Saldo dinâmico (Pronto para puxar do users/{uid}/balance)
  const [balance, setBalance] = useState(0.00);

  // Última atualização manual
  const [lastUpdateManual, setLastUpdateManual] = useState("16/03/2026 14:30");

  // Lista de Notificações
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'kpi', text: 'KPIs atualizados com sucesso.', time: 'Agora', icon: RefreshCcw, color: 'text-blue-400' },
    { id: 2, type: 'withdraw_ok', text: 'Seu saque de R$ 1.200,00 foi aprovado!', time: '2h atrás', icon: CheckCircle2, color: 'text-green-400' },
    { id: 3, type: 'campaign_new', text: 'Nova campanha: Black November adicionada.', time: '5h atrás', icon: PlusCircle, color: 'text-purple-400' },
    { id: 4, type: 'withdraw_no', text: 'Pedido de saque negado por divergência.', time: '1 dia atrás', icon: XCircle, color: 'text-red-400' },
  ]);

  // LÓGICA DO CRONÔMETRO (HORÁRIO ÚTIL 08-18H) - LEI 7
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour < 8) {
        setTimeLeft("Inicia às 08:00");
      } else if (hour >= 18) {
        setTimeLeft("Inicia amanhã às 08:00");
      } else {
        const target = new Date();
        target.setHours(18, 0, 0);
        const diff = target.getTime() - now.getTime();

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

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
  const vipVisual = VIP_VISUALS[role];
  const isAdmin = role === UserRole.ADMIN;

  // Barra superior focada apenas na trilha: Afiliado -> VIP Silver -> VIP Gold -> VIP Black.
  const vipLadderProgress: Record<
    UserRole,
    { currentLabel: string; nextLabel: string; currentValue: number; targetValue: number; fillClass: string }
  > = {
    [UserRole.AFFILIATE]: {
      currentLabel: "Afiliado",
      nextLabel: "VIP Silver",
      currentValue: 25,
      targetValue: 100,
      fillClass: "bg-gradient-to-r from-gray-300 to-gray-500",
    },
    [UserRole.VIP_SILVER]: {
      currentLabel: "VIP Silver",
      nextLabel: "VIP Gold",
      currentValue: 55,
      targetValue: 100,
      fillClass: "bg-gradient-to-r from-gray-300 to-gray-500",
    },
    [UserRole.VIP_GOLD]: {
      currentLabel: "VIP Gold",
      nextLabel: "VIP Black",
      currentValue: 80,
      targetValue: 100,
      fillClass: "bg-gradient-to-r from-yellow-400 to-amber-500",
    },
    [UserRole.VIP_BLACK]: {
      currentLabel: "VIP Black",
      nextLabel: "Nível Máximo",
      currentValue: 100,
      targetValue: 100,
      fillClass: "bg-gradient-to-r from-fuchsia-400 to-violet-500 shadow-[0_0_12px_rgba(217,70,239,0.65)]",
    },
    [UserRole.ADMIN]: {
      currentLabel: "Afiliado",
      nextLabel: "VIP Silver",
      currentValue: 25,
      targetValue: 100,
      fillClass: "bg-gradient-to-r from-gray-300 to-gray-500",
    },
    [UserRole.SUPERVISOR]: {
      currentLabel: "Afiliado",
      nextLabel: "VIP Silver",
      currentValue: 25,
      targetValue: 100,
      fillClass: "bg-gradient-to-r from-gray-300 to-gray-500",
    },
    [UserRole.AFFILIATE_MANAGER]: {
      currentLabel: "Afiliado",
      nextLabel: "VIP Silver",
      currentValue: 25,
      targetValue: 100,
      fillClass: "bg-gradient-to-r from-gray-300 to-gray-500",
    },
  };

  const hierarchyProgress = vipLadderProgress[role] ?? vipLadderProgress[UserRole.AFFILIATE];
  const currentLevel = hierarchyProgress.currentLabel;
  const nextLevel = hierarchyProgress.nextLabel;
  const currentSales = hierarchyProgress.currentValue;
  const requiredSales = hierarchyProgress.targetValue;
  const currentProgress = Math.round((currentSales / requiredSales) * 100);
  const progressFillClass = hierarchyProgress.fillClass;
  const isOpsRole = role === UserRole.ADMIN || role === UserRole.SUPERVISOR;
  const isAffiliateManagerRole = role === UserRole.AFFILIATE_MANAGER;

  return (
    <div className="flex min-h-screen bg-[#000000] relative text-white">

      {/* OVERLAY ESCURO PARA MOBILE NAV (Lei 5) */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] xl:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Sidebar Responsiva - Simetria Lei 7 */}
      <aside className={cn(
        "fixed xl:relative top-0 left-0 xl:top-auto xl:left-auto z-50 h-full xl:h-[calc(100vh-3rem)] xl:ml-4 xl:mt-6 bg-[#050505] border-r xl:border border-gray-700 xl:rounded-2xl flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 ease-in-out shrink-0",
        isMobileNavOpen ? "translate-x-0" : "-translate-x-[120%] xl:translate-x-0",
        isDesktopNavCollapsed ? "xl:w-20" : "xl:w-64",
        "w-64"
      )}>

        {/* Topo da Sidebar: Logo Profissional */}
        <div className={cn(
          "p-[1.85rem] border-b border-gray-800 flex items-center transition-all duration-300",
          isDesktopNavCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className={cn(
            "flex items-center gap-3 transition-all duration-300",
            isDesktopNavCollapsed && "hidden xl:hidden"
          )}>
            <img
              src="/imagens/logos/Ativo2.png"
              alt="Scallei Logo"
              className="h-10 w-auto object-contain brightness-110"
            />

          </div>

          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="xl:hidden p-1.5 bg-[#000000] border border-gray-700 rounded-lg hover:border-[#ffffff]/50 hover:bg-gray-800 transition-all shrink-0 text-white"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsDesktopNavCollapsed(!isDesktopNavCollapsed)}
            className={cn(
              "hidden xl:flex p-1.5 bg-[#000000] border border-gray-700 rounded-lg hover:border-[#ffffff]/50 hover:bg-gray-800 transition-all shrink-0 text-gray-400 hover:text-white",
              !isDesktopNavCollapsed && "ml-2"
            )}
          >
            {isDesktopNavCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <div className="px-3 space-y-1 flex flex-col items-center xl:items-stretch">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path === "/" && location.pathname === "/");

              const isBlocked = false; // TODO: FIREBASE -> !hasAcceptedTerms

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full",
                    isDesktopNavCollapsed ? "xl:justify-center gap-0" : "gap-3",
                    isActive
                      ? "bg-gray-800 text-white border border-gray-600 shadow-[0_0_12px_rgba(156,163,175,0.35)]"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                    isBlocked && "opacity-40 pointer-events-none"
                  )}
                  title={isDesktopNavCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className={cn("transition-all duration-200 overflow-hidden whitespace-nowrap", isDesktopNavCollapsed && "xl:opacity-0 xl:w-0")}>
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <Link
              to="/vip"
              onClick={() => setIsMobileNavOpen(false)}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all mt-2 w-full",
                isDesktopNavCollapsed ? "xl:justify-center gap-0" : "gap-3",
                location.pathname === "/vip"
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                  : "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 hover:from-yellow-500/30 hover:to-yellow-600/30 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
              )}
            >
              <Diamond className="w-5 h-5 shrink-0" />
              <span className={cn("transition-all duration-200 overflow-hidden whitespace-nowrap", isDesktopNavCollapsed && "xl:opacity-0 xl:w-0")}>
                Programa VIP
              </span>
            </Link>
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-gray-800 space-y-2 flex flex-col items-center xl:items-stretch">
          <Link
            to="/meu-perfil"
            onClick={() => setIsMobileNavOpen(false)}
            className={cn(
              "flex items-center px-2 py-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer w-full gap-3",
              vipVisual && "border",
              vipVisual?.panelClass,
            )}
          >
            <div className="w-8 h-8 shrink-0 bg-[#ffffff] rounded-full flex items-center justify-center text-black font-bold text-xs">
              {initials || "U"}
            </div>
            <div className={cn("flex-1 transition-all duration-200 overflow-hidden whitespace-nowrap", isDesktopNavCollapsed && "xl:opacity-0 xl:w-0")}>
              <p className="text-white text-sm font-medium truncate">{displayName}</p>
              <p
                className={cn(
                  "text-xs truncate uppercase inline-flex px-2 py-0.5 rounded-full",
                  vipVisual ? vipVisual.chipClass : "text-gray-400",
                )}
              >
                {displayRole}
              </p>
            </div>
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors w-full gap-3",
                isDesktopNavCollapsed && "justify-center"
              )}
            >
              <Settings className="w-5 h-5 shrink-0" />
              <span className={cn("transition-all duration-200 overflow-hidden", isDesktopNavCollapsed && "xl:opacity-0 xl:w-0")}>
                Painel Admin
              </span>
            </Link>
          )}

          <button
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
            className={cn(
              "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 transition-colors w-full gap-3",
              isDesktopNavCollapsed && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={cn("transition-all duration-200 overflow-hidden", isDesktopNavCollapsed && "xl:opacity-0 xl:w-0")}>
              Sair
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full">

        {/* Banner Global (Mobile) - Lei 2 */}
        <div className="xl:hidden">
          {/* TODO: FIREBASE - Descomentar bloco abaixo para avisos mobile */}
          {/* <BannerTermosPendente hasAcceptedTerms={hasAcceptedTerms} /> */}
        </div>

        {/* Header Responsivo */}
        <header className="bg-[#050505] border-b border-gray-800 px-4 md:px-6 py-4 relative z-30">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-6">

            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="xl:hidden p-2.5 bg-[#000000] border border-gray-800 rounded-lg text-gray-400 hover:text-[#ffffff] transition-all shrink-0 order-1"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* MODAL 1: Ranking */}
            <div className="flex-1 min-w-[280px] max-w-xl order-3 xl:order-2">
              <div className="bg-[#000000] border border-gray-800 rounded-xl p-4 group hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm truncate">
                        {isOpsRole
                          ? "Painel Operacional"
                          : isAffiliateManagerRole
                            ? "Gestão de Afiliados"
                            : currentLevel}
                      </p>
                      <p className="text-xs text-gray-400 truncate uppercase tracking-tighter">
                        {isOpsRole
                          ? "Monitoramento de performance e compliance"
                          : isAffiliateManagerRole
                            ? "Visão de carteira e evolução dos afiliados"
                            : `${currentSales.toLocaleString("pt-BR")} / ${requiredSales.toLocaleString("pt-BR")} Vendas`}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <TrendingUp className="w-4 h-4 text-[#ffffff]" />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {isOpsRole ? (
                        <>
                          Modo: <span className="text-blue-400 font-bold">Administração</span>
                        </>
                      ) : isAffiliateManagerRole ? (
                        <>
                          Modo: <span className="text-indigo-300 font-bold">Carteira</span>
                        </>
                      ) : (
                        <>
                          Próximo: <span className="text-yellow-400 font-bold">{nextLevel}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-full rounded-full transition-all duration-500",
                      isOpsRole
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                        : isAffiliateManagerRole
                          ? "bg-gradient-to-r from-indigo-400 to-purple-500"
                          : progressFillClass,
                    )}
                    style={{ width: `${isOpsRole ? 100 : isAffiliateManagerRole ? 82 : currentProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  {isOpsRole ? (
                    <>
                      <span className="text-xs text-gray-500 uppercase">Status</span>
                      <span className="text-xs font-bold text-cyan-300 uppercase">Operacional</span>
                      <span className="text-xs text-gray-500 uppercase">Acesso Total</span>
                    </>
                  ) : isAffiliateManagerRole ? (
                    <>
                      <span className="text-xs text-gray-500 uppercase">Rede</span>
                      <span className="text-xs font-bold text-indigo-300 uppercase">Carteira Ativa</span>
                      <span className="text-xs text-gray-500 uppercase">Gestão</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-gray-500">0</span>
                      <span className="text-xs font-bold text-[#ffffff]">{currentProgress}%</span>
                      <span className="text-xs text-gray-500">{requiredSales.toLocaleString("pt-BR")}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* MODAL 2: Cronômetro (Simetria Lei 7) */}
            <div className="hidden xl:flex flex-1 min-w-[280px] max-w-xl order-2">
              <div className="bg-[#000000] border border-gray-800 rounded-xl p-4 group hover:border-white/20 transition-all w-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-bold text-sm truncate uppercase tracking-tight">Atualização KPI</p>
                        <span className="text-[9px] text-gray-500 italic lowercase">v.{lastUpdateManual}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate uppercase tracking-tighter">
                        Status: <span className="text-green-500 font-black tracking-widest">ATUALIZADA</span>
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <Timer className="w-4 h-4 text-[#ffffff]" />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Próxima: <span className="text-white font-bold">{timeLeft}</span>
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ffffff] to-[#ffffff] rounded-full transition-all duration-500"
                    style={{ width: timeLeft.includes("Inicia") ? "0%" : "100%" }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 uppercase font-black tracking-tighter">08:00</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Ciclo Útil</span>
                  <span className="text-xs text-gray-500 uppercase font-black tracking-tighter">18:00</span>
                </div>
              </div>
            </div>

            {/* Ações da Direita - SEM OVERFLOW-X PARA NÃO CORTAR DROPDOWNS */}
            <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0 order-2 xl:order-4">

              {/* SEARCH */}
              <div className="relative">
                <button
                  onClick={() => { setIsSearchOpen(!isSearchOpen); setIsQuickMenuOpen(false); setIsNotificationsOpen(false); }}
                  className={cn("p-2.5 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-all", isSearchOpen && "bg-white text-black border-white")}
                >
                  <Search className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[300px] md:w-[500px] bg-[#050505] border-2 border-white/30 rounded-xl shadow-2xl z-[100] p-4 animate-in fade-in slide-in-from-top-2">
                    <GlobalSearch />
                  </div>
                )}
              </div>

              {/* QUICK NAV */}
              <div className="relative">
                <button
                  onClick={() => { setIsQuickMenuOpen(!isQuickMenuOpen); setIsSearchOpen(false); setIsNotificationsOpen(false); }}
                  className={cn(
                    "p-2.5 border rounded-lg transition-all",
                    isQuickMenuOpen
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      : "bg-[#000000] border-gray-800 text-gray-400 hover:text-[#ffffff]"
                  )}
                >
                  {isQuickMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {isQuickMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 md:w-64 bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl shadow-2xl z-[100] animate-in fade-in zoom-in duration-200">
                    <div className="p-3 border-b border-gray-800 bg-white/5">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">Acesso Rápido</p>
                    </div>
                    <div className="p-2 space-y-1">
                      {quickAccessItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsQuickMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 group transition-all"
                        >
                          <item.icon className="w-4 h-4 group-hover:scale-110" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* NOTIFICAÇÕES */}
              <div className="relative">
                <button
                  onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsSearchOpen(false); setIsQuickMenuOpen(false); }}
                  className={cn(
                    "relative p-2.5 border border-gray-800 rounded-lg transition-all",
                    isNotificationsOpen ? "bg-white text-black border-white" : "bg-[#000000] border-gray-800 text-gray-400 hover:text-white"
                  )}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]"></span>
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-[#050505] border-2 border-white/30 rounded-xl shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                      <h3 className="text-xs font-black uppercase tracking-widest text-white">Notificações</h3>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto scrollbar-hide">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b border-gray-800/50 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                          <div className="flex gap-3">
                            <div className={cn("mt-1 shrink-0", n.color)}><n.icon className="w-4 h-4" /></div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-300 leading-relaxed group-hover:text-white">{n.text}</p>
                              <p className="text-[10px] text-gray-600 font-bold uppercase">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SALDO DINÂMICO -> DIRECIONA PARA /FINANCEIRO */}
              <Link
                to="/financeiro"
                className="hidden sm:flex items-center gap-3 bg-white text-black rounded-lg px-5 py-2.5 font-black text-sm shadow-[0_10px_20px_rgba(255,255,255,0.1)] hover:bg-gray-100 transition-all cursor-pointer border border-transparent active:scale-95 shrink-0"
              >
                <Wallet className="w-4 h-4 shrink-0" />
                <span>R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </Link>

            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#000000] p-4 md:p-6 relative z-10 scrollbar-hide">
          <Outlet context={{ setHasAcceptedTerms, setBalance, setNotifications, balance }} />
        </main>
      </div>
    </div>
  );
}