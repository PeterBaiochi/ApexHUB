import { useState } from "react";
import {
  Trophy,
  Gift,
  Star,
  Crown,
  Award,
  Zap,
  Target,
  Calendar,
  CheckCircle2,
  Lock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "../components/ui/utils";

export function Premiacoes() {
  const userRewards = {
    currentPoints: 2847,
    nextRewardPoints: 5000,
    totalRedeemed: 3,
    availableRewards: 12,
  };

  // ESTRUTURA ATUALIZADA COM BANNERS (PRONTO PARA ADMIN/FIREBASE)
  const [availableRewards] = useState([
    {
      id: "1",
      title: "Bônus de R$ 100",
      description: "Crédito instantâneo injetado no seu saldo disponível.",
      points: 1000,
      available: true,
      category: "Financeiro",
      bannerUrl: "", // Admin poderá setar a URL aqui
    },
    {
      id: "2",
      title: "iPhone 15 Pro",
      description: "256GB - Performance máxima para sua operação.",
      points: 15000,
      available: false,
      category: "Eletrônicos",
      bannerUrl: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Acesso VIP 3 meses",
      description: "Suporte prioritário e taxas reduzidas por 90 dias.",
      points: 3000,
      available: false,
      category: "Benefícios",
      bannerUrl: "",
    },
    {
      id: "4",
      title: "Scalei Academy Pro",
      description: "Acesso vitalício a todos os módulos avançados.",
      points: 2500,
      available: true,
      category: "Educação",
      bannerUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "MacBook Air M3",
      description: "O setup definitivo para quem escala alto.",
      points: 25000,
      available: false,
      category: "Eletrônicos",
      bannerUrl: "https://images.unsplash.com/photo-1517336712461-4811467406a3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "6",
      title: "Mentoria 1-1",
      description: "Consultoria estratégica com nossos Top Affiliates.",
      points: 5000,
      available: false,
      category: "Educação",
      bannerUrl: "",
    },
  ]);

  const achievements = [
    { id: "1", title: "Primeira Venda", completed: true, date: "2026-01-15" },
    { id: "2", title: "10 Vendas", completed: true, date: "2026-02-01" },
    { id: "3", title: "50 Vendas", completed: true, date: "2026-02-28" },
    { id: "4", title: "100 Vendas", completed: false },
    { id: "5", title: "Top 50 Ranking", completed: true, date: "2026-03-01" },
    { id: "6", title: "5 Indicações", completed: true, date: "2026-02-20" },
  ];

  const progressPercent = Math.round((userRewards.currentPoints / userRewards.nextRewardPoints) * 100);

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">

      {/* HEADER DE PRESTÍGIO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Elite <span className="text-gray-500">Rewards</span>
          </h1>
          <p className="text-gray-400 font-medium max-w-md uppercase text-[10px] tracking-[0.2em]">
            Sua performance transformada em ativos de luxo e benefícios exclusivos.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#050505] border border-gray-800 px-6 py-3 rounded-2xl text-center min-w-[120px]">
            <p className="text-white font-black text-xl">{userRewards.totalRedeemed}</p>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Resgates</p>
          </div>
          <div className="bg-white border border-white px-6 py-3 rounded-2xl text-center min-w-[120px] shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
            <p className="text-black font-black text-xl">{userRewards.availableRewards}</p>
            <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest">Disponíveis</p>
          </div>
        </div>
      </div>

      {/* CENTRAL DE PONTOS */}
      <section className="bg-[#050505] border border-gray-800 rounded-[40px] p-8 lg:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.15)]">
              <Trophy className="w-12 h-12 text-black fill-black/10" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mb-1">Seu Score Atual</h2>
              <p className="text-6xl font-black text-white tracking-tighter">{userRewards.currentPoints.toLocaleString('pt-BR')}</p>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end text-white">
              <div className="space-y-1">
                <p className="font-black uppercase italic tracking-tight text-lg">Próximo Objetivo</p>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Faltam {userRewards.nextRewardPoints - userRewards.currentPoints} pontos para o próximo resgate</p>
              </div>
              <p className="font-black text-2xl tracking-tighter">{progressPercent}%</p>
            </div>
            <div className="w-full h-4 bg-gray-900 rounded-full p-1 border border-gray-800">
              <div className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.4)] relative" style={{ width: `${progressPercent}%` }}>
                <Sparkles className="absolute right-0 -top-6 w-4 h-4 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO COM BANNERS */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 text-white">
          <h2 className="text-2xl font-black uppercase italic tracking-tight">Catálogo de <span className="text-gray-500">Resgate</span></h2>
          <div className="h-px bg-gray-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableRewards.map((reward) => (
            <div
              key={reward.id}
              className={cn(
                "group relative bg-[#050505] border rounded-[32px] overflow-hidden transition-all duration-500",
                reward.available
                  ? "border-gray-800 hover:border-white/40 hover:translate-y-[-8px] shadow-2xl"
                  : "border-gray-900 opacity-50 grayscale"
              )}
            >
              {/* SEÇÃO DO BANNER (ADMIN SETTABLE) */}
              <div className="aspect-[16/9] w-full bg-gray-900 relative overflow-hidden border-b border-gray-800">
                {reward.bannerUrl ? (
                  <img
                    src={reward.bannerUrl}
                    alt={reward.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-800 to-black">
                    <ImageIcon className="w-8 h-8 text-gray-700" />
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Premium Asset</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/80 backdrop-blur-md text-[9px] font-black text-white px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest">
                    {reward.category}
                  </span>
                </div>
                {!reward.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                    <Lock className="w-8 h-8 text-white/20" />
                  </div>
                )}
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">{reward.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">{reward.description}</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-800/50 text-white">
                  <div className="flex items-center gap-2">
                    <Zap className={cn("w-4 h-4", reward.available ? "fill-white text-white" : "text-gray-600")} />
                    <span className="text-xl font-black tracking-tighter">{reward.points.toLocaleString('pt-BR')}</span>
                  </div>

                  {reward.available ? (
                    <button className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2 active:scale-95">
                      Resgatar <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Lock className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Bloqueado</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER DE CONQUISTAS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-[32px] text-white space-y-4 shadow-xl">
          <TrendingUp className="w-10 h-10 mb-2 text-white" />
          <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Acelere seus<br />Ganhos</h3>
          <p className="text-white/70 text-sm font-medium leading-relaxed">Cada FTD validado multiplica seu Elite Score. Alcance o próximo nível e desbloqueie o catálogo de eletrônicos.</p>
          <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest pt-2 hover:gap-4 transition-all">Ver Regras <ArrowRight className="w-4 h-4" /></button>
        </div>

        <div className="lg:col-span-2 bg-[#050505] border border-gray-800 rounded-[40px] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight px-2">Jornada de Atleta</h3>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Badges Desbloqueados</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={cn("flex items-center gap-4 p-4 rounded-2xl border transition-all", achievement.completed ? "bg-white/[0.03] border-white/10" : "bg-transparent border-gray-800 opacity-30")}>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg", achievement.completed ? "bg-white text-black" : "bg-gray-800 text-gray-500")}>
                  {achievement.completed ? <CheckCircle2 className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-white uppercase tracking-tight truncate">{achievement.title}</p>
                  {achievement.completed && achievement.date && (
                    <p className="text-[9px] font-bold text-gray-500 uppercase mt-0.5">Concluído em {new Date(achievement.date).toLocaleDateString('pt-BR')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}