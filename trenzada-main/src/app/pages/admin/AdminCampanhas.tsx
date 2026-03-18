import { useState } from "react";
import {
    Search,
    Filter,
    Download,
    MoreVertical,
    Calendar,
    TrendingUp,
    DollarSign,
    Target,
    ShieldCheck,
    CheckCircle2,
    Clock,
    Link2,
    ExternalLink,
    Zap,
    ArrowUpRight,
    User,
    XCircle
} from "lucide-react";
import { getSession } from "../../auth/auth";

export function AdminCampanhas() {
    const [selectedFilter, setSelectedFilter] = useState("pending");
    const [searchTerm, setSearchTerm] = useState("");

    const session = getSession();
    const displayName = session?.name?.trim() || "Usuário";

    const stats = {
        pendingRequests: 14,
        activeLinks: 156,
        totalClicks: 45230,
        topCampaign: "Betano VIP",
    };

    // Mock de solicitações de afiliados vindas do banco
    const [requests, setRequests] = useState([
        {
            id: "req_01",
            userName: displayName,
            userId: "user_123",
            campaign: "Betano High Roller",
            originalUrl: "https://betano.com/aff/tracking_id_999",
            requestedAt: "2026-03-16 14:20",
            status: "pending",
            category: "CASSINO"
        },
        {
            id: "req_02",
            userName: "Marina Silva",
            userId: "user_456",
            campaign: "Bet365 Premier",
            originalUrl: "https://bet365.com/refer?id=marina_apex",
            requestedAt: "2026-03-16 15:10",
            status: "approved",
            slug: "ax79k2",
            category: "APOSTAS"
        }
    ]);

    // FUNÇÃO MESTRA: GERA O REDIRECT NO BANCO (SISTEMA GO)
    const handleApprove = async (requestId: string) => {
        const slug = Math.random().toString(36).substring(2, 8); // Gera o slug aleatório

        // TODO: INTEGRAR COM SEU route.ts
        // await db.collection('links').doc(slug).set({ ... })

        setRequests(prev => prev.map(req =>
            req.id === requestId ? { ...req, status: "approved", slug: slug } : req
        ));

        alert(`Link gerado com sucesso: apexhub.com/go/${slug}`);
    };

    return (
        <div className="space-y-6 text-white font-sans">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold italic uppercase tracking-tighter">Aprovação de Campanhas</h1>
                    <p className="text-sm text-gray-400 mt-1">Gerencie e gere links de redirecionamento para afiliados</p>
                </div>
                <div className="bg-[#1a1a1f] border border-[#27272a] px-4 py-2 rounded-lg flex items-center gap-3 text-xs font-bold uppercase text-gray-400 italic">
                    <Zap className="w-4 h-4 text-[#00ff7f]" />
                    Tracking System v2.0
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-[#121214] border border-[#27272a] p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                            <Clock className="text-orange-500 w-5 h-5" />
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pendentes</p>
                    </div>
                    <p className="text-3xl font-black italic">{stats.pendingRequests}</p>
                </div>

                <div className="bg-[#121214] border border-[#27272a] p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                            <Link2 className="text-green-500 w-5 h-5" />
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Links Ativos</p>
                    </div>
                    <p className="text-3xl font-black italic">{stats.activeLinks}</p>
                </div>

                <div className="bg-[#121214] border border-[#27272a] p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-blue-500 w-5 h-5" />
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cliques Totais</p>
                    </div>
                    <p className="text-3xl font-black italic">{stats.totalClicks.toLocaleString('pt-BR')}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-black w-5 h-5" />
                        </div>
                        <p className="text-[10px] font-black text-black/40 uppercase tracking-widest text-black">Top Oferta</p>
                    </div>
                    <p className="text-2xl font-black italic text-black uppercase">{stats.topCampaign}</p>
                </div>
            </div>

            {/* Barra de Filtros (Seguindo seu Layout) */}
            <div className="bg-[#121214] border border-[#27272a] p-4 rounded-xl flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="BUSCAR AFILIADO OU CAMPANHA..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0a0a0c] border border-[#3f3f46] rounded-lg pl-12 pr-4 py-3 text-xs font-bold text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff7f] transition-all"
                    />
                </div>
                <div className="flex bg-[#0a0a0c] p-1 rounded-lg border border-[#27272a]">
                    <button
                        onClick={() => setSelectedFilter("pending")}
                        className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${selectedFilter === 'pending' ? 'bg-white text-black' : 'text-gray-500'}`}
                    >Pendentes</button>
                    <button
                        onClick={() => setSelectedFilter("approved")}
                        className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${selectedFilter === 'approved' ? 'bg-white text-black' : 'text-gray-500'}`}
                    >Aprovados</button>
                </div>
            </div>

            {/* Tabela de Aprovação */}
            <div className="bg-[#121214] border border-[#27272a] rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#0a0a0c] border-b border-[#27272a] text-[10px] font-black text-gray-500 uppercase tracking-widest italic text-left">
                            <th className="px-8 py-6">Afiliado</th>
                            <th className="px-8 py-6">Campanha</th>
                            <th className="px-8 py-6">Link Raiz (Destino)</th>
                            <th className="px-8 py-6">Data</th>
                            <th className="px-8 py-6 text-center">Status / Slug</th>
                            <th className="px-8 py-6 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-white/[0.02] transition-all">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center"><User size={14} /></div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-tight">{req.userName}</p>
                                            <p className="text-[10px] text-gray-500">UID: {req.userId}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs font-black uppercase italic">{req.campaign}</p>
                                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{req.category}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <code className="text-[10px] text-gray-500 bg-black/40 px-2 py-1 rounded truncate block max-w-[200px]">{req.originalUrl}</code>
                                </td>
                                <td className="px-8 py-6 text-[10px] text-gray-500 font-bold">{req.requestedAt}</td>
                                <td className="px-8 py-6 text-center">
                                    {req.status === "pending" ? (
                                        <span className="text-[9px] font-black uppercase bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full border border-orange-500/20">Aguardando</span>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-[9px] font-black uppercase bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20">Ativo</span>
                                            <code className="text-[10px] text-white/40">/go/{req.slug}</code>
                                        </div>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {req.status === "pending" ? (
                                        <button
                                            onClick={() => handleApprove(req.id)}
                                            className="bg-[#00ff7f] hover:bg-[#00cc66] text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl"
                                        >
                                            Aprovar & Gerar Link
                                        </button>
                                    ) : (
                                        <button className="text-gray-600 hover:text-white transition-all"><MoreVertical size={16} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Quick Actions (Admin Control) */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#121214] border border-[#27272a] p-6 rounded-2xl group hover:border-green-500/50 transition-all">
                    <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                    <h3 className="text-sm font-black uppercase italic mb-2">Aprovar Em Massa</h3>
                    <p className="text-xs text-gray-500 mb-4">Aprova todas as solicitações pendentes de uma vez.</p>
                    <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Executar</button>
                </div>

                <div className="bg-[#121214] border border-[#27272a] p-6 rounded-2xl group hover:border-red-500/50 transition-all">
                    <XCircle className="w-8 h-8 text-red-500 mb-4" />
                    <h3 className="text-sm font-black uppercase italic mb-2">Bloquear Tráfego</h3>
                    <p className="text-xs text-gray-500 mb-4">Pausa todos os redirecionamentos ativos imediatamente.</p>
                    <button className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Pausar Sistema</button>
                </div>

                <div className="bg-[#121214] border border-[#27272a] p-6 rounded-2xl group hover:border-blue-500/50 transition-all">
                    <Link2 className="w-8 h-8 text-blue-500 mb-4" />
                    <h3 className="text-sm font-black uppercase italic mb-2">Logs de Redirecionamento</h3>
                    <p className="text-xs text-gray-500 mb-4">Veja para onde seus usuários estão sendo enviados.</p>
                    <button className="w-full bg-blue-500/10 border border-blue-500/20 text-blue-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">Ver Logs</button>
                </div>
            </div>
        </div>
    );
}