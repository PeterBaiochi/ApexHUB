import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  Heart,
  AlertCircle,
  TrendingUp,
  DollarSign,
  MousePointer,
  Users,
  Target,
  Zap,
  Award,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  FileText,
  Activity,
  Lightbulb,
  Trophy,
  Lock,
  Gift,
  Shield,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { useCanViewTotalBilling } from "../hooks/useHierarchy";
import { useUserRole } from "../hooks/useHierarchy";
import { VIP_VISUALS } from "../auth/hierarchyTypes";

// ==========================================
// MOTOR DE DADOS SIMULADOS (LEI 4)
// ==========================================
const generateSimulatedData = (kpiLeft: string, kpiRight: string) => {
  const points = 12;
  const data = [];
  let multiplier = kpiLeft === "CPA" || kpiLeft === "RevShare" ? 500 : 100;

  for (let i = 0; i < points; i++) {
    const time = `${i + 8}h`;
    const value = Math.floor(Math.random() * multiplier) + (multiplier / 2);
    data.push({ name: time, value: value });
  }
  return data;
};

export function VisaoGeral() {
  const canViewTotalBilling = useCanViewTotalBilling();
  const user = useUserRole();
  const vipVisual = user ? VIP_VISUALS[user.role] : undefined;

  // ==========================================
  // ESTADOS CONSOLIDADOS (FIREBASE READY - LEI 4)
  // ==========================================
  const [userStats] = useState({
    level: "Bronze",
    cpasBatidos: 15,
    cpaMeta: 100,
    saldoDisponivel: 2847.50,
    saldoPendente: 1254.30,
    metaMesAtual: 2850,
    metaMesTotal: 10000,
    registrosHoje: 142,
    ftdsHoje: 38,
    ftdsTotais: 150
  });

  const [adminRewards] = useState([
    { id: "1", nome: "MacBook Pro M3", meta: 5000, bannerUrl: "", unidade: "FTDs" },
    { id: "2", nome: "Mercedes C180", meta: 20000, bannerUrl: "", unidade: "FTDs" },
    { id: "3", nome: "Viagem Maldivas", meta: 50000, bannerUrl: "", unidade: "FTDs" }
  ]);

  const [revenueType, setRevenueType] = useState<"CPA" | "REV">("CPA");
  const [kpiLeft, setKpiLeft] = useState("CPA");
  const [kpiRight, setKpiRight] = useState("Registros");

  const chartData = useMemo(() => generateSimulatedData(kpiLeft, kpiRight), [kpiLeft, kpiRight]);
  const cpaProgress = Math.round((userStats.cpasBatidos / userStats.cpaMeta) * 100);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20 animate-in fade-in duration-700">

      {/* --- SEÇÃO 1: CABEÇALHO --- */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tight">
            DASHBOARD <span className="text-gray-500 font-light">PRO</span>
          </h1>
          <p className="text-gray-400 flex items-center gap-2">
            Status da Operação: <span className="text-green-500 flex items-center gap-1.5 font-bold"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Online</span>
          </p>
        </div>

        {/* AJUSTE MOBILE: LADO A LADO (grid-cols-2) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 w-full lg:w-auto text-white">

          <div className="bg-[#050505] border border-gray-800 rounded-2xl px-3 py-3 sm:px-6 flex items-center gap-3 sm:gap-4 overflow-hidden">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase truncate">Pendente</p>
              <p className="text-sm sm:text-base font-bold truncate">R$ {userStats.saldoPendente.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div className="bg-[#050505] border border-gray-800 rounded-2xl px-3 py-3 sm:px-6 flex items-center gap-3 sm:gap-4 overflow-hidden">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase truncate">Meta Mensal</p>
              <p className="text-sm sm:text-base font-bold truncate">{Math.round((userStats.metaMesAtual / userStats.metaMesTotal) * 100)}% batida</p>
            </div>
          </div>

        </div>
      </section>

      {vipVisual && (
        <section className={cn("border rounded-3xl p-5", vipVisual.panelClass)}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                Beneficio Ativo
              </p>
              <h3 className="text-xl font-black text-white tracking-tight">
                {vipVisual.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1">{vipVisual.perk}</p>
            </div>
            <div className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full", vipVisual.chipClass)}>
              Nivel VIP
            </div>
          </div>
        </section>
      )}

      {/* --- SEÇÃO 2: MÉTRICAS PRINCIPAIS --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-8 group relative overflow-hidden transition-all hover:scale-[1.02] shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
          <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-black/5 rotate-12" />
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Saldo Disponível</span>
              <div className="p-2 bg-black/5 rounded-lg"><TrendingUp className="w-4 h-4 text-black" /></div>
            </div>
            <h2 className="text-4xl font-black text-black tracking-tighter">R$ {userStats.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
            <p className="text-black/40 text-xs font-bold uppercase tracking-widest">+15% em relação a ontem</p>
          </div>
        </div>

        {canViewTotalBilling ? (
          <div className="bg-[#050505] border border-gray-800 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Receita Total</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setRevenueType("CPA")} className={cn("text-xs font-bold transition-all", revenueType === "CPA" ? "text-white underline underline-offset-4" : "text-gray-600 hover:text-gray-400")}>CPA</button>
                  <span className="text-gray-800">/</span>
                  <button onClick={() => setRevenueType("REV")} className={cn("text-xs font-bold transition-all", revenueType === "REV" ? "text-white underline underline-offset-4" : "text-gray-600 hover:text-gray-400")}>REV</button>
                </div>
              </div>
              <Activity className="text-gray-700 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-3xl font-black text-white mt-4 tracking-tighter">R$ {revenueType === "CPA" ? "1.500,00" : "840,00"}</h2>
          </div>
        ) : (
          <div className="bg-[#050505] border border-gray-800 rounded-3xl p-8 flex flex-col justify-between transition-all opacity-80">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Receita Total</p>
                <p className="text-white/20 text-xs font-black uppercase tracking-widest mt-2">
                  Restrito
                </p>
              </div>
              <Activity className="text-gray-700" />
            </div>
            <h2 className="text-3xl font-black text-white/10 mt-4 tracking-tighter">—</h2>
          </div>
        )}

        <div className="bg-[#050505] border border-gray-800 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
          <div className="flex justify-between items-start">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-none">Registros <span className="text-white block mt-1 text-lg">Hoje</span></p>
            <MousePointer className="text-gray-700 group-hover:text-white transition-colors" />
          </div>
          <h2 className="text-4xl font-black text-white mt-4 tracking-tighter">{userStats.registrosHoje}</h2>
        </div>

        <div className="bg-[#050505] border border-gray-800 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
          <div className="flex justify-between items-start">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-none">Conversões <span className="text-white block mt-1 text-lg">FTD</span></p>
            <Zap className="text-gray-700 group-hover:text-white transition-colors" />
          </div>
          <h2 className="text-4xl font-black text-white mt-4 tracking-tighter">{userStats.ftdsHoje}</h2>
        </div>
      </section>

      {/* --- SEÇÃO 3: ANÁLISE TÉCNICA E MONITOR --- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#050505] border border-gray-800 rounded-[32px] p-8 space-y-8 relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row justify-between gap-6 relative z-10">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Performance Visual</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-white rounded-full" />
                {kpiLeft} cruzado com {kpiRight}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/50 p-1.5 rounded-2xl border border-gray-800">
              <select value={kpiLeft} onChange={(e) => setKpiLeft(e.target.value)} className="bg-transparent text-white text-xs font-black p-2 outline-none cursor-pointer"><option value="CPA">SALDO CPA</option><option value="RevShare">REVSHARE</option></select>
              <span className="text-gray-700 font-bold text-xs uppercase">vs</span>
              <select value={kpiRight} onChange={(e) => setKpiRight(e.target.value)} className="bg-transparent text-white text-xs font-black p-2 outline-none cursor-pointer"><option value="Registros">REGISTROS</option><option value="FTDs">FTDS</option></select>
            </div>
          </div>
          <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs><linearGradient id="chartG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ffffff" stopOpacity={0.12} /><stop offset="95%" stopColor="#ffffff" stopOpacity={0} /></linearGradient></defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#444' }} /><Tooltip cursor={{ stroke: '#fff', strokeWidth: 1 }} contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }} /><Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={3} fillOpacity={1} fill="url(#chartG)" /></AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[32px] p-8 space-y-6 flex flex-col h-full shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl"><Lightbulb className="w-6 h-6" /></div>
              <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aceleração</p><h4 className="text-xl font-black text-black uppercase">Monitor de CPAs</h4></div>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-8">
              <div className="space-y-2"><p className="text-6xl font-black text-black tracking-tighter">{userStats.cpasBatidos}</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">CPAs acumulados na conta</p></div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-black"><span>Progresso da Meta</span><span>Meta: {userStats.cpaMeta}</span></div>
                <div className="w-full bg-gray-100 rounded-full h-4 p-1 border border-gray-200"><div className="bg-black h-full rounded-full transition-all duration-1000 shadow-lg" style={{ width: `${cpaProgress}%` }} /></div>
                <p className="text-[10px] text-center font-bold text-gray-400 uppercase">{cpaProgress}% alcançado</p>
              </div>
            </div>
            <button className="w-full bg-black text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-2">Ver Dicas Pro <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 4: SCALEHUB EXPERIENCE --- */}
      <section className="bg-[#050505] border border-gray-800 rounded-[40px] p-8 lg:p-12 relative overflow-hidden group">
        <Heart className="absolute -left-20 -top-20 w-80 h-80 text-white/[0.02] -rotate-12" />
        <div className="relative z-10 flex flex-col xl:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest"><Award className="w-4 h-4" /> Parceria de Elite</div>
            <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter">BEM-VINDO À ERA DA <br /><span className="text-gray-500 underline decoration-white/20">ALTA PERFORMANCE.</span></h2>
            <p className="text-gray-400 leading-relaxed text-lg max-w-2xl">Nosso compromisso é claro: oferecer as melhores condições do mercado, tecnologia de ponta e total transparência. Aqui jogamos juntos, alinhados ao princípio de que <span className="text-white font-black">"o certo pelo certo sempre"</span>.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-white">
              <div className="space-y-2"><Trophy className="w-5 h-5 text-yellow-500" /><p className="text-xs font-black uppercase tracking-tighter">Pagamento 24h</p></div>
              <div className="space-y-2"><Shield className="w-5 h-5 text-blue-500" /><p className="text-xs font-black uppercase tracking-tighter">Suporte VIP</p></div>
              <div className="space-y-2"><Activity className="w-5 h-5 text-green-500" /><p className="text-xs font-black uppercase tracking-tighter">Taxas Reais</p></div>
              <div className="space-y-2"><Clock className="w-5 h-5 text-purple-500" /><p className="text-xs font-black uppercase tracking-tighter">Real-Time</p></div>
            </div>
          </div>
          <div className="bg-white text-black p-10 rounded-[32px] text-center shadow-2xl flex flex-col items-center gap-2 min-w-[280px]">
            <Heart className="w-12 h-12 mb-2 animate-bounce" fill="black" />
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Juntos Somos</p>
            <p className="text-4xl font-black uppercase tracking-tighter">Imparáveis</p>
          </div>
          {/* ALERTA DE SINCRONIZAÇÃO (MOBILE ONLY) */}
          <div className="xl:hidden bg-gradient-to-r from-white/5 to-transparent border-l-4 border-white rounded-2xl p-6 mt-4">
            <div className="flex gap-4 items-center">
              <AlertCircle className="w-6 h-6 text-white shrink-0" />
              <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                Sincronização global ativa. Estatísticas atualizadas a cada <span className="text-white font-bold">24 horas úteis</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 5: ATALHOS CORRIGIDOS E EXTRATO --- */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-[#050505] border border-gray-800 rounded-[32px] overflow-hidden">
          <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
            <h3 className="font-black text-white uppercase flex items-center gap-3 tracking-widest text-sm">
              <FileText className="w-4 h-4 text-gray-500" /> Extrato Recente
            </h3>
            <span className="text-[10px] font-black text-gray-500 border border-gray-800 px-3 py-1 rounded-full">ÚLTIMOS 30 DIAS</span>
          </div>
          <div className="overflow-x-auto text-gray-400">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/40 text-[10px] uppercase font-black text-gray-600">
                <tr><th className="px-8 py-4">Data</th><th className="px-8 py-4">Evento</th><th className="px-8 py-4">Status</th><th className="px-8 py-4 text-right">Valor</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                <tr><td colSpan={4} className="px-8 py-16 text-center text-gray-600 font-bold uppercase tracking-widest text-xs italic">Nenhum dado financeiro para exibir no momento.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Campanhas', icon: Target, path: '/campanhas' },
            { label: 'Indicações', icon: Users, path: '/indicacoes' },
            { label: 'Financeiro', icon: DollarSign, path: '/financeiro' },
            { label: 'Academy', icon: CheckCircle2, path: '/academy' }
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center gap-3 hover:bg-white hover:text-black hover:border-white transition-all group shadow-xl backdrop-blur-sm"
            >
              <item.icon className="w-6 h-6 text-white/70 group-hover:text-black group-hover:scale-110 transition-all" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-black">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SEÇÃO 6: GALERIA DE CONQUISTAS --- */}
      <section className="space-y-8 pt-10">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-black rounded-2xl flex items-center justify-center border border-gray-700 shadow-2xl">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Galeria de Elite</h3>
              <p className="text-gray-500 font-medium uppercase text-[10px] tracking-widest">Recompensas exclusivas por performance</p>
            </div>
          </div>
          <Link to="/premiacoes" className="text-white text-xs font-black uppercase tracking-widest hover:underline decoration-2">Explorar Tudo</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminRewards.map((reward) => {
            const rewardProgress = Math.min(Math.round((userStats.ftdsTotais / reward.meta) * 100), 100);
            return (
              <div key={reward.id} className="bg-[#050505] border border-gray-800 rounded-[32px] overflow-hidden flex flex-col group hover:border-white/40 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <div className="h-56 bg-gray-900 flex items-center justify-center relative overflow-hidden">
                  <ImageIcon className="w-16 h-16 text-gray-800 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 right-6 bg-black/90 backdrop-blur px-4 py-1.5 rounded-full border border-gray-700 flex items-center gap-2">
                    <Lock className="w-3 h-3 text-gray-500" />
                    <span className="text-[10px] text-white font-black uppercase tracking-widest">Bloqueado</span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col gap-6">
                  <div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{reward.nome}</h4>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Meta: {reward.meta.toLocaleString('pt-BR')} {reward.unidade}</p>
                  </div>
                  <div className="mt-auto space-y-4">
                    <div className="flex justify-between items-end">
                      <div><p className="text-3xl font-black text-white">{userStats.ftdsTotais}</p><p className="text-[10px] text-gray-500 font-black uppercase">Seu Progresso</p></div>
                      <div className="text-right"><p className="text-white font-black text-sm">{rewardProgress}%</p><p className="text-[10px] text-gray-500 font-black">Faltam {(reward.meta - userStats.ftdsTotais).toLocaleString('pt-BR')}</p></div>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-gray-800">
                      <div className="bg-white h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ width: `${rewardProgress}%` }} />
                    </div>
                    <Link to="/premiacoes" className="w-full bg-gray-800 border border-gray-700 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all text-center block">Regulamento</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}