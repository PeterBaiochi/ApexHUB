import { useState, useEffect } from "react";
import {
  Link2,
  Copy,
  ExternalLink,
  TrendingUp,
  MousePointer,
  DollarSign,
  Search,
  Plus,
  CheckCircle2,
  Zap,
  MoreVertical,
  Pause,
  Play,
  QrCode,
  Users,
  Target,
  RefreshCcw,
  X,
  Download
} from "lucide-react";

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

// ==========================================
// MODAL DE QR CODE (NATIVE-SAFE)
// ==========================================
function QRCodeModal({ isOpen, onClose, url, name }: { isOpen: boolean, onClose: () => void, url: string, name: string }) {
  if (!isOpen) return null;

  // Geramos a URL do QR Code via API segura (sem dependências locais para evitar bugs)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&bgcolor=ffffff`;

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = `qrcode-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#0a0a0a] border border-white/20 rounded-[40px] w-full max-w-sm p-10 relative text-center shadow-[0_0_100px_rgba(255,255,255,0.05)]">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h3 className="text-2xl font-black text-white uppercase mb-2 tracking-tighter italic">{name}</h3>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">Ativo QR ApexHub</p>

        <div className="bg-white p-6 rounded-[32px] inline-block mb-8 shadow-2xl">
          <img src={qrImageUrl} alt="QR Code" className="w-48 h-48" />
        </div>

        <button
          onClick={downloadQR}
          className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95"
        >
          <Download size={16} /> Baixar QR Code
        </button>
      </div>
    </div>
  );
}

export function MeusLinks() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // ESTADO PARA CONTROLE DO MODAL DE QR CODE
  const [qrModal, setQrModal] = useState({ isOpen: false, url: "", name: "" });

  const [links] = useState([
    {
      id: "1",
      slug: "bf-2026",
      name: "Campanha Black Friday 2026",
      url: "https://apexhub.com/go/bf-2026",
      clicks: 1247,
      registros: 420,
      ftds: 58,
      cpas: 52,
      revenue: 8450.00,
      deal: "CPA R$ 80,00 + 30% Rev",
      status: "active",
    },
    {
      id: "2",
      slug: "premium-x",
      name: "Produto Infoproduto Premium",
      url: "https://apexhub.com/go/premium-x",
      clicks: 856,
      registros: 150,
      ftds: 30,
      cpas: 28,
      revenue: 5320.00,
      deal: "CPA R$ 120,00",
      status: "active",
    }
  ]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 animate-in fade-in duration-700 text-white font-sans">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Meus <span className="text-gray-500">Links</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest">Gestão de ativos e rastreamento de alta performance.</p>
        </div>

        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:bg-gray-200 shadow-2xl">
            <Plus size={20} /> Novo Ativo
          </button>
        </div>
      </div>

      {/* GRID DE MÉTRICAS MANTIDO */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-8">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">Cliques Totais</p>
          <p className="text-4xl font-black text-white tracking-tighter">{links.reduce((s, l) => s + l.clicks, 0).toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-8">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">Total FTDs</p>
          <p className="text-4xl font-black text-white tracking-tighter">{links.reduce((s, l) => s + l.ftds, 0)}</p>
        </div>
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-8">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">CPAs Validados</p>
          <p className="text-4xl font-black text-white tracking-tighter">{links.reduce((s, l) => s + l.cpas, 0)}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 relative overflow-hidden shadow-2xl text-black">
          <p className="text-black/40 text-[10px] font-black uppercase tracking-widest">Faturamento Líquido</p>
          <p className="text-4xl font-black tracking-tighter mt-4">R$ {links.reduce((s, l) => s + l.revenue, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-black/5 rotate-12" />
        </div>
      </div>

      {/* TABELA DE ATIVOS */}
      <div className="bg-[#050505] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] font-black text-gray-600 uppercase tracking-widest italic">
                <th className="text-left px-8 py-6">Ativo / Tracking ID</th>
                <th className="text-center px-8 py-6">Cliques</th>
                <th className="text-center px-8 py-6">Registros</th>
                <th className="text-center px-8 py-6">FTDs</th>
                <th className="text-center px-8 py-6">CPAs</th>
                <th className="text-center px-8 py-6">Negociação</th>
                <th className="text-right px-8 py-6">Líquido</th>
                <th className="text-right px-8 py-6">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {links.map((link) => (
                <tr key={link.id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-white font-black uppercase text-sm tracking-tight">{link.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black bg-white/10 text-gray-400 px-2 py-0.5 rounded uppercase tracking-tighter">GO/{link.slug}</span>
                        <code className="text-[10px] text-gray-600 font-mono">{link.url}</code>
                        <button
                          onClick={() => copyToClipboard(link.url, link.id)}
                          className={cn("p-1.5 rounded-lg transition-all", copiedId === link.id ? "bg-green-500 text-black shadow-lg" : "text-gray-500 hover:text-white")}
                        >
                          {copiedId === link.id ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center font-black text-gray-400">{link.clicks.toLocaleString('pt-BR')}</td>
                  <td className="px-8 py-6 text-center font-black text-gray-400">{link.registros}</td>
                  <td className="px-8 py-6 text-center font-black text-blue-400">{link.ftds}</td>
                  <td className="px-8 py-6 text-center font-black text-green-500">{link.cpas}</td>
                  <td className="px-8 py-6 text-center text-[10px] font-black uppercase italic">{link.deal}</td>
                  <td className="px-8 py-6 text-right font-black text-lg text-white">R$ {link.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setQrModal({ isOpen: true, url: link.url, name: link.name })}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all"
                      >
                        <QrCode size={16} />
                      </button>
                      <button className="p-3 text-gray-500 hover:text-white transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE QR CODE INTEGRADO */}
      <QRCodeModal
        isOpen={qrModal.isOpen}
        onClose={() => setQrModal({ ...qrModal, isOpen: false })}
        url={qrModal.url}
        name={qrModal.name}
      />
    </div>
  );
}