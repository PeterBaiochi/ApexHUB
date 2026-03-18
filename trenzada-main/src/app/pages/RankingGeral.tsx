import {
  Trophy,
  TrendingUp,
  Award,
  Medal,
  Crown,
  Zap,
  Target,
  Star,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";
import { getSession } from "../auth/auth";

export function RankingGeral() {
  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

  const topAffiliates = [
    { position: 1, name: "Lucas Mendes", sales: 1523, revenue: "R$ 287.450,00", level: "Diamante", change: 0, avatar: "LM" },
    { position: 2, name: "Marina Silva", sales: 1387, revenue: "R$ 264.130,00", level: "Diamante", change: 1, avatar: "MS" },
    { position: 3, name: "Rafael Costa", sales: 1245, revenue: "R$ 236.550,00", level: "Ouro", change: -1, avatar: "RC" },
    { position: 4, name: "Juliana Alves", sales: 1156, revenue: "R$ 219.640,00", level: "Ouro", change: 0, avatar: "JA" },
    { position: 5, name: "Pedro Henrique", sales: 1089, revenue: "R$ 206.910,00", level: "Ouro", change: 2, avatar: "PH" },
    { position: 6, name: "Fernanda Rocha", sales: 987, revenue: "R$ 187.530,00", level: "Prata", change: -1, avatar: "FR" },
    { position: 7, name: "Carlos Eduardo", sales: 923, revenue: "R$ 175.370,00", level: "Prata", change: 0, avatar: "CE" },
    { position: 8, name: "Ana Paula", sales: 867, revenue: "R$ 164.730,00", level: "Prata", change: 1, avatar: "AP" },
    { position: 9, name: "Rodrigo Martins", sales: 834, revenue: "R$ 158.460,00", level: "Prata", change: -2, avatar: "RM" },
    { position: 10, name: "Isabela Santos", sales: 789, revenue: "R$ 149.910,00", level: "Bronze", change: 0, avatar: "IS" },
  ];

  const currentUser = {
    position: 47,
    name: displayName,
    sales: 127,
    revenue: "R$ 24.130,00",
    level: "Bronze",
    change: 5,
    avatar: initials || "U",
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Diamante":
        return "from-cyan-400 to-blue-500";
      case "Ouro":
        return "from-yellow-400 to-orange-500";
      case "Prata":
        return "from-gray-300 to-gray-500";
      case "Bronze":
        return "from-orange-700 to-orange-900";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Diamante":
        return <Crown className="w-4 h-4" />;
      case "Ouro":
        return <Medal className="w-4 h-4" />;
      case "Prata":
        return <Award className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Ranking <span className="text-[#ffffff]">Geral</span>
        </h1>
        <p className="text-gray-400">Veja sua posição e compete com os melhores afiliados</p>
      </div>

      {/* User Position Card */}
      <div className="bg-gradient-to-br from-[#ffffff]/10 to-[#ffffff]/5 border border-[#ffffff]/30 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffffff]/5 rounded-full blur-3xl"></div>
        <div className="relative flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            {currentUser.position}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">Sua Posição</h2>
              {currentUser.change > 0 && (
                <span className="flex items-center gap-1 bg-[#ffffff]/20 text-[#ffffff] px-2 py-1 rounded text-xs font-semibold">
                  <ChevronUp className="w-3 h-3" />
                  +{currentUser.change} posições
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">VENDAS</p>
                <p className="text-white font-bold text-lg">{currentUser.sales}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">RECEITA</p>
                <p className="text-white font-bold text-lg">{currentUser.revenue}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">NÍVEL</p>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 bg-gradient-to-br ${getLevelColor(currentUser.level)} rounded-lg flex items-center justify-center text-white`}>
                    {getLevelIcon(currentUser.level)}
                  </div>
                  <span className="text-white font-bold">{currentUser.level}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button className="bg-[#ffffff] hover:bg-[#ffffff] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#050505] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">TOP 1</p>
              <p className="text-white font-bold">Lucas Mendes</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">1.523 vendas</p>
        </div>

        <div className="bg-[#050505] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#ffffff]/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-[#ffffff]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">META MENSAL</p>
              <p className="text-white font-bold">Top 30</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Faltam 17 posições</p>
        </div>

        <div className="bg-[#050505] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">EVOLUÇÃO</p>
              <p className="text-white font-bold">+5 posições</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Últimos 7 dias</p>
        </div>

        <div className="bg-[#050505] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">PRÓXIMO NÍVEL</p>
              <p className="text-white font-bold">Prata</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">873 vendas faltando</p>
        </div>
      </div>

      {/* Top 10 Ranking */}
      <div className="bg-[#050505] border border-gray-800 rounded-xl overflow-hidden">
        <div className="border-b border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#ffffff]" />
            <h2 className="text-xl font-bold text-white">Top 10 Afiliados</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {topAffiliates.map((affiliate) => (
            <div
              key={affiliate.position}
              className={`p-6 hover:bg-gray-800/30 transition-all ${affiliate.position <= 3 ? "bg-gradient-to-r from-gray-800/20" : ""
                }`}
            >
              <div className="flex items-center gap-6">
                {/* Position */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${affiliate.position === 1
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                        : affiliate.position === 2
                          ? "bg-gradient-to-br from-gray-300 to-gray-500 shadow-[0_0_20px_rgba(156,163,175,0.4)]"
                          : affiliate.position === 3
                            ? "bg-gradient-to-br from-orange-600 to-orange-800 shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                            : "bg-gray-800"
                      }`}
                  >
                    {affiliate.position}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{affiliate.avatar}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white font-semibold text-lg">{affiliate.name}</p>
                    <div className={`flex items-center gap-1 bg-gradient-to-r ${getLevelColor(affiliate.level)} px-2.5 py-1 rounded-full`}>
                      <div className="text-white text-xs">{getLevelIcon(affiliate.level)}</div>
                      <span className="text-white text-xs font-semibold">{affiliate.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">{affiliate.sales} vendas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#ffffff]" />
                      <span className="text-gray-400">{affiliate.revenue}</span>
                    </div>
                  </div>
                </div>

                {/* Change */}
                <div className="text-right">
                  {affiliate.change > 0 ? (
                    <div className="flex items-center gap-1 text-[#ffffff]">
                      <ChevronUp className="w-4 h-4" />
                      <span className="text-sm font-semibold">+{affiliate.change}</span>
                    </div>
                  ) : affiliate.change < 0 ? (
                    <div className="flex items-center gap-1 text-red-400">
                      <ChevronDown className="w-4 h-4" />
                      <span className="text-sm font-semibold">{affiliate.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Minus className="w-4 h-4" />
                      <span className="text-sm font-semibold">0</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation Card */}
      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Continue Crescendo!</h3>
            <p className="text-gray-300 text-sm mb-3">
              Você está no caminho certo! Continue compartilhando seus links e acompanhando as estratégias da Academy para subir no ranking.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ffffff] rounded-full"></div>
                <span className="text-xs text-gray-400">Próxima atualização em 18h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
