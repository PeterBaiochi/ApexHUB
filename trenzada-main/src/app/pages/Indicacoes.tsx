import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Users,
  Copy,
  CheckCircle2,
  QrCode,
  Search,
  Settings2,
  X,
  Download,
  Percent,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { getSession } from "../auth/auth";

// ==========================================
// MODAL DE QR CODE COM LOGO CENTRAL (LEI 8)
// ==========================================
function QRCodeModal({ url, isOpen, onClose }: { url: string, isOpen: boolean, onClose: () => void }) {
  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode-scalehub.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#0a0a0a] border border-white/20 rounded-[40px] w-full max-w-sm p-10 relative text-center shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X /></button>
        <h3 className="text-2xl font-black text-white uppercase mb-8 tracking-tighter italic">Seu Ativo QR</h3>
        <div className="bg-white p-6 rounded-[32px] inline-block mb-8 shadow-2xl">
          <QRCodeCanvas
            value={url}
            size={200}
            level={"H"}
            imageSettings={{
              src: "/imagens/logos/Ativo2.png",
              height: 45,
              width: 45,
              excavate: true,
            }}
          />
        </div>
        <button onClick={downloadQRCode} className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95">
          <Download className="w-4 h-4" /> Baixar PNG
        </button>
      </div>
    </div>
  );
}

// ==========================================
// MODAL DE GESTÃO DE NEGOCIAÇÕES (BACK-END LOGIC)
// ==========================================
function NegotiationModal({ subName, subId, isOpen, onClose }: { subName: string, subId: string, isOpen: boolean, onClose: () => void }) {

  // ESTRUTURA DE DADOS PARA BACK-END (FIREBASE READY)
  // myAgreement: O que o Admin deu para o Afiliado Pai (O teto)
  // subAgreement: O que o Pai está repassando para o Filho
  const [campaignData, setCampaignData] = useState([
    {
      id: "betano_br",
      house: "Betano",
      type: "Hibrido",
      parentCpa: 120.00,
      parentRev: 40,
      subCpa: 100.00,
      subRev: 25,
      // Configuração do Gerente (G.A) setada pelo Admin no acordo do pai
      managerConfig: { type: "percent_cpa", value: 10 }
    },
    {
      id: "betfair_es",
      house: "BetFair",
      type: "CPA",
      parentCpa: 50.00,
      parentRev: 0,
      subCpa: 40.00,
      subRev: 0,
      managerConfig: { type: "fixed", value: 5.00 }
    }
  ]);

  if (!isOpen) return null;

  const handleRateUpdate = (campId: string, field: 'subCpa' | 'subRev', value: number) => {
    setCampaignData(prev => prev.map(c => {
      if (c.id === campId) {
        // Validação de Teto: Não pode ser maior que o que o pai recebe
        const limit = field === 'subCpa' ? c.parentCpa : c.parentRev;
        const safeValue = value > limit ? limit : value;
        return { ...c, [field]: safeValue };
      }
      return c;
    }));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#050505] border border-white/10 rounded-[40px] w-full max-w-4xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center"><Briefcase className="text-black w-6 h-6" /></div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Negociações: {subName}</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest italic">Ajuste de comissão por campanha ativa</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="p-6 max-h-[500px] overflow-y-auto space-y-4">
          {campaignData.map((camp) => (
            <div key={camp.id} className="bg-black border border-white/5 rounded-[24px] p-6 hover:border-white/20 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-3 space-y-1">
                  <p className="text-white font-black uppercase text-sm">{camp.house}</p>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded bg-white/10 text-gray-400 uppercase tracking-widest">{camp.type}</span>
                </div>

                {/* CPA SETTINGS */}
                <div className={cn("lg:col-span-4 space-y-2", camp.parentCpa === 0 && "hidden")}>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Repasse CPA</p>
                    <p className="text-[9px] font-black text-green-500 uppercase tracking-widest">Teto: R$ {camp.parentCpa.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center bg-[#080808] border border-white/10 rounded-xl px-4 py-3 focus-within:border-white transition-all">
                    <span className="text-gray-600 text-xs mr-2 font-black">R$</span>
                    <input
                      type="number"
                      value={camp.subCpa}
                      onChange={(e) => handleRateUpdate(camp.id, 'subCpa', Number(e.target.value))}
                      className="bg-transparent border-none p-0 w-full text-white font-black text-sm focus:ring-0"
                    />
                  </div>
                  <p className="text-[8px] text-gray-700 font-bold uppercase italic">Seu lucro: R$ {(camp.parentCpa - camp.subCpa).toFixed(2)}</p>
                </div>

                {/* REV SETTINGS */}
                <div className={cn("lg:col-span-4 space-y-2", camp.parentRev === 0 && "hidden")}>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Repasse RevShare</p>
                    <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Teto: {camp.parentRev}%</p>
                  </div>
                  <div className="flex items-center bg-[#080808] border border-white/10 rounded-xl px-4 py-3 focus-within:border-white transition-all">
                    <input
                      type="number"
                      value={camp.subRev}
                      onChange={(e) => handleRateUpdate(camp.id, 'subRev', Number(e.target.value))}
                      className="bg-transparent border-none p-0 w-full text-white font-black text-sm text-right focus:ring-0"
                    />
                    <span className="text-gray-600 text-xs ml-2 font-black">%</span>
                  </div>
                  <p className="text-[8px] text-gray-700 font-bold uppercase italic">Seu lucro: {(camp.parentRev - camp.subRev)}%</p>
                </div>

                <div className="lg:col-span-1 flex justify-end">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-white/5 bg-white/[0.01] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-gray-600" />
            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Qualquer alteração requer sincronização de 15min</p>
          </div>
          <button onClick={onClose} className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all shadow-xl active:scale-95 w-full md:w-auto">Salvar Cascata Financeira</button>
        </div>
      </div>
    </div>
  );
}

export function Indicacoes() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [activeNegotiation, setActiveNegotiation] = useState<{ isOpen: boolean, name: string, id: string }>({ isOpen: false, name: "", id: "" });
  const referralLink = "https://apexhub.com/register?ref=victor-cmo";

  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";

  const [referrals] = useState([
    { id: "sub_01", name: displayName, level: "N1 (Direto)", subAffiliates: 12, status: "active" },
    { id: "sub_02", name: "Ana Carolina", level: "N1 (Direto)", subAffiliates: 0, status: "pending" },
    { id: "sub_03", name: "Carlos Oliveira", level: "N2 (Indireto)", subAffiliates: 5, status: "active" },
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 animate-in fade-in duration-700 text-white">

      {/* HEADER LIMPO */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Network <span className="text-white/30">Intelligence</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-xs font-black uppercase tracking-[0.3em]">
            Gestão de Subafiliados em Níveis Ilimitados.
          </p>
        </div>

        <div className="flex bg-white/5 border border-white/10 rounded-[24px] px-6 py-4 items-center gap-4 shadow-inner">
          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-green-500" /></div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocolo de Repasse</p>
            <p className="text-sm font-black text-white uppercase">Sincronização Granular Ativa</p>
          </div>
        </div>
      </div>

      {/* ÁREA DE RECRUTAMENTO */}
      <section className="bg-[#080808] border border-white/10 rounded-[40px] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] -mr-32 -mt-32 transition-all group-hover:bg-white/[0.04]" />
        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-white bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">Recrutamento ApexHub</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Cresça sua <span className="text-gray-500">Própria Rede</span></h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 max-w-5xl">
            <div className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 flex items-center justify-between group/link hover:border-white/40 transition-all">
              <code className="text-white font-mono text-sm truncate">{referralLink}</code>
              <button onClick={copyToClipboard} className={cn("ml-4 p-2 rounded-lg transition-all", copiedLink ? "bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "text-gray-500 hover:text-white")}>
                {copiedLink ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <button onClick={() => setIsQrModalOpen(true)} className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all flex items-center gap-3 shadow-2xl active:scale-95">
              <QrCode className="w-5 h-5" /> Gerar Ativo QR
            </button>
          </div>
        </div>
      </section>

      {/* GESTÃO DE REDE */}
      <section className="bg-[#080808] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <Users className="w-6 h-6 text-white" />
            <h3 className="text-xl font-black uppercase tracking-tighter px-2">Monitor de <span className="text-gray-500">Afiliados</span></h3>
          </div>
          <div className="flex bg-black border border-white/10 rounded-2xl px-4 py-2 items-center gap-3">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="FILTRAR REDE..." className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest w-48 text-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-black/40 text-gray-600 uppercase text-[10px] font-black tracking-widest italic">
                <th className="text-left px-8 py-6">Afiliado</th>
                <th className="text-left px-8 py-6 text-center">Nível</th>
                <th className="text-left px-8 py-6 text-center">Rede Abaixo</th>
                <th className="text-left px-8 py-6 text-center">Status</th>
                <th className="text-right px-8 py-6">Operação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {referrals.map((ref) => (
                <tr key={ref.id} className="group hover:bg-white/[0.02] transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">{ref.name.substring(0, 2).toUpperCase()}</div>
                      <p className="text-white font-black uppercase text-sm tracking-tight">{ref.name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{ref.level}</td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                      <span className="text-white font-black text-xs">{ref.subAffiliates}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                      ref.status === "active" ? "text-green-500 border-green-500/20 bg-green-500/5" : "text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                    )}>
                      {ref.status === "active" ? "Ativo" : "Pendente"}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => setActiveNegotiation({ isOpen: true, name: ref.name, id: ref.id })}
                      className="bg-white/5 border border-white/10 hover:bg-white hover:text-black px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all italic active:scale-95"
                    >
                      Ajustar Negociações
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL QR CODE */}
      <QRCodeModal url={referralLink} isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} />

      {/* MODAL DE NEGOCIAÇÕES DINÂMICO */}
      <NegotiationModal
        subName={activeNegotiation.name}
        subId={activeNegotiation.id}
        isOpen={activeNegotiation.isOpen}
        onClose={() => setActiveNegotiation({ isOpen: false, name: "", id: "" })}
      />
    </div>
  );
}