import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Zap,
  DollarSign,
  Globe,
  Info,
  ExternalLink,
  Clock,
  CheckCircle2,
  X,
  Flame,
  ShieldCheck,
  AlertCircle,
  FileText,
  Check,
  SearchX
} from "lucide-react";
import { cn } from "../components/ui/utils";

// ==========================================
// MODAL DE INFORMAÇÕES COM BOTÃO DE AÇÃO (LEI 8)
// ==========================================
function CampaignDetailsModal({
  campaign,
  isOpen,
  onClose,
  onHandleRequest
}: {
  campaign: any,
  isOpen: boolean,
  onClose: () => void,
  onHandleRequest: (id: string) => void
}) {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#050505] border border-white/20 rounded-[40px] w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] text-white">

        {/* Header do Modal */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-inner">
              <div className="text-[8px] font-black text-black uppercase">Logo</div>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic">{campaign.brand}</h3>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Dossiê da Campanha</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-white active:scale-90"><X /></button>
        </div>

        {/* Conteúdo */}
        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Remuneração</p>
              <p className="text-xl font-bold uppercase">{campaign.type}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Payout</p>
              <p className="text-xl font-bold">{campaign.commission}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-gray-400">
              <AlertCircle className="w-4 h-4 text-white" /> Regras de Qualificação (Admin)
            </h4>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-sm text-gray-300 leading-relaxed italic font-medium">
              {campaign.fullRules || "Esta campanha exige que o subafiliado converta jogadores reais com depósito mínimo local. Tráfego de incentivo causará o banimento do acordo."}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 border border-white/5 rounded-[24px] bg-white/[0.01] space-y-3">
              <p className="text-[9px] font-black text-green-500 uppercase tracking-widest border-b border-green-500/10 pb-2">Permitido</p>
              <ul className="text-[10px] font-bold space-y-2 uppercase tracking-tighter text-gray-400">
                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Influencers BR/AR</li>
                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Ads / Orgânico</li>
              </ul>
            </div>
            <div className="p-5 border border-white/5 rounded-[24px] bg-white/[0.01] space-y-3">
              <p className="text-[9px] font-black text-red-500 uppercase tracking-widest border-b border-red-500/10 pb-2">Proibido</p>
              <ul className="text-[10px] font-bold space-y-2 uppercase tracking-tighter text-gray-400">
                <li className="flex items-center gap-2"><X className="w-3 h-3 text-red-500" /> Incentivado</li>
                <li className="flex items-center gap-2"><X className="w-3 h-3 text-red-500" /> Brand Bidding</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="p-8 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">ID Interno: {campaign.id}</p>

          <div className="flex gap-4">
            <button onClick={onClose} className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Fechar</button>

            {/* BOTÃO DINÂMICO NO POPUP */}
            {campaign.status === "available" && (
              <button
                onClick={() => onHandleRequest(campaign.id)}
                className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-2xl"
              >
                Solicitar Acordo
              </button>
            )}
            {campaign.status === "pending" && (
              <button className="bg-yellow-500 text-black px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest cursor-default shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                Solicitado
              </button>
            )}
            {campaign.status === "active" && (
              <button className="bg-green-500 text-black px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest cursor-default">
                Acordo Ativo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Campanhas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  // ==========================================
  // ESTADO DAS CAMPANHAS (BASE DE DADOS)
  // ==========================================
  const [campaigns, setCampaigns] = useState([
    {
      id: "betbox_01",
      brand: "BetBox Casino",
      country: "AR",
      status: "available",
      commission: "20,00 USD",
      type: "CPA",
      conditions: "Dep: 5 USD / Apostar: 5 USD",
      category: "CASSINO",
      hot: true
    },
    {
      id: "888_01",
      brand: "888 Sport",
      country: "ES",
      status: "pending",
      commission: "€ 43,00",
      type: "CPA",
      conditions: "Dep: €30 / Apostar: €30",
      category: "APOSTAS ESPORTIVAS",
      hot: false
    },
    {
      id: "bet7k_01",
      brand: "Bet7k",
      country: "BR",
      status: "active",
      commission: "R$ 50,00",
      type: "Hibrido",
      conditions: "Dep: R$25 / Apostar: R$25",
      category: "APOSTAS ESPORTIVAS",
      hot: true
    },
    {
      id: "betano_01",
      brand: "Betano",
      country: "BR",
      status: "available",
      commission: "R$ 120,00",
      type: "CPA",
      conditions: "Dep: R$ 50 / Apostar: R$ 50",
      category: "APOSTAS ESPORTIVAS",
      hot: true
    }
  ]);

  // ==========================================
  // MOTOR DE FILTRAGEM REATIVA (LEI 7)
  // ==========================================
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((camp) => {
      const matchesSearch =
        camp.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "Todos" ||
        camp.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, campaigns]);

  const handleRequestCampaign = async (id: string) => {
    // TODO: FIREBASE - addDoc(collection(db, "campaign_requests")...)

    setCampaigns(prev => prev.map(c =>
      c.id === id ? { ...c, status: "pending" } : c
    ));

    if (selectedCampaign && selectedCampaign.id === id) {
      setSelectedCampaign((prev: any) => ({ ...prev, status: "pending" }));
    }
  };

  const categories = ["Todos", "CASSINO", "APOSTAS ESPORTIVAS", "E-SPORTS"];

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 animate-in fade-in duration-700 text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Apex <span className="text-white/20">Offers</span>
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Acordos oficiais de iGaming e alta performance</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
          <ShieldCheck className="w-5 h-5 text-white" />
          <p className="text-[10px] font-black text-white uppercase tracking-widest italic">Aprovação em até 24 horas úteis</p>
        </div>
      </div>

      {/* BARRA DE FILTROS REATIVA */}
      <section className="flex flex-col lg:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search className="w-5 h-5 text-gray-600 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="PESQUISAR POR MARCA OU GEO (EX: BR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#080808] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold text-white placeholder-gray-800 focus:border-white transition-all uppercase outline-none"
          />
        </div>

        <div className="flex items-center gap-2 bg-[#080808] border border-white/10 p-1.5 rounded-2xl overflow-x-auto w-full lg:w-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === cat ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* TABELA DE CAMPANHAS COM EMPTY STATE */}
      <section className="bg-[#050505] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] italic">
                <th className="text-left px-8 py-6">Parceiro</th>
                <th className="text-center px-8 py-6">Geo</th>
                <th className="text-center px-8 py-6">Estado</th>
                <th className="text-center px-8 py-6">Payout</th>
                <th className="text-left px-8 py-6">Condições</th>
                <th className="text-right px-8 py-6">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((camp) => (
                  <tr key={camp.id} className="group hover:bg-white/[0.01] transition-all">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl group-hover:scale-110 transition-transform">
                          <div className="text-[10px] font-black text-black uppercase">Logo</div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-white font-black uppercase text-sm tracking-tight">{camp.brand}</p>
                          <span className="text-[8px] font-black bg-white/10 px-2 py-0.5 rounded text-gray-400 uppercase tracking-widest">{camp.category}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6 text-center">
                      <span className="text-white font-black text-xs uppercase border border-white/20 px-3 py-1 rounded-lg">{camp.country}</span>
                    </td>

                    <td className="px-8 py-6 text-center">
                      {camp.status === "available" && (
                        <button
                          onClick={() => handleRequestCampaign(camp.id)}
                          className="bg-white text-black px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
                        >
                          Solicitar
                        </button>
                      )}
                      {camp.status === "pending" && (
                        <button className="bg-yellow-500 text-black px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest cursor-default">
                          Solicitado
                        </button>
                      )}
                      {camp.status === "active" && (
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Ativo</span>
                        </div>
                      )}
                    </td>

                    <td className="px-8 py-6 text-center">
                      <p className="text-white font-black text-sm tracking-tighter">{camp.commission}</p>
                      <p className="text-[8px] text-gray-600 font-bold uppercase mt-1 italic">{camp.type}</p>
                    </td>

                    <td className="px-8 py-6">
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic max-w-[180px] line-clamp-2">{camp.conditions}</p>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => setSelectedCampaign(camp)}
                        className="text-white hover:text-gray-400 transition-all flex items-center gap-2 ml-auto group/info"
                      >
                        <span className="text-[9px] font-black uppercase tracking-widest border-b border-transparent group-hover/info:border-white">Mais Info</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <SearchX className="w-16 h-16" />
                      <p className="text-xs font-black uppercase tracking-[0.5em]">Nenhum acordo encontrado para estes filtros</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL DE DETALHES INTEGRADO */}
      <CampaignDetailsModal
        campaign={selectedCampaign}
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onHandleRequest={handleRequestCampaign}
      />

    </div>
  );
}