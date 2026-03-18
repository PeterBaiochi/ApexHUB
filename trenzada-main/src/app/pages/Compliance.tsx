import { useState } from "react";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  FileText,
  Lock,
  Eye,
  Download,
  Clock,
  Shield,
  Check,
  X,
  Gavel,
  UploadCloud,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Info
} from "lucide-react";
import { cn } from "../components/ui/utils";

export function Compliance() {
  // ==========================================
  // LÓGICA DE ESTADOS E ABAS (PRESERVADA)
  // ==========================================
  const [activeTab, setActiveTab] = useState("kyc");

  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Documento de Identidade (RG/CNH)",
      description: "Frente e verso nítidos em boa iluminação",
      status: "missing",
    },
    {
      id: "2",
      name: "Comprovante de Residência",
      description: "Contas de luz, água ou internet (máx 90 dias)",
      status: "missing",
    },
    {
      id: "3",
      name: "Cartão CNPJ / MEI",
      description: "Documento oficial do governo (PDF ou Imagem)",
      status: "missing",
    },
    {
      id: "4",
      name: "Dados Bancários",
      description: "Extrato ou print que comprove a titularidade",
      status: "missing",
    },
  ]);

  const isKycVerified = documents.every(doc => doc.status === "approved");

  const complianceStatus = {
    documentsSubmitted: documents.filter(d => d.status !== "missing").length,
    documentsApproved: documents.filter(d => d.status === "approved").length,
    documentsPending: documents.filter(d => d.status === "pending").length,
    accountStatus: isKycVerified ? "verified" : "pending",
  };

  const [uploadModal, setUploadModal] = useState({ isOpen: false, docId: "", docName: "" });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const openModal = (id: string, name: string) => {
    setUploadModal({ isOpen: true, docId: id, docName: name });
    setFileToUpload(null);
  };

  const closeModal = () => {
    setUploadModal({ isOpen: false, docId: "", docName: "" });
    setFileToUpload(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      if (validTypes.includes(file.type)) {
        setFileToUpload(file);
      } else {
        alert("Formato inválido.");
        e.target.value = '';
      }
    }
  };

  const handleSubmitDocument = async () => {
    if (!fileToUpload || !uploadModal.docId) return;
    setDocuments(docs => docs.map(d =>
      d.id === uploadModal.docId ? { ...d, status: "pending", submittedAt: new Date().toISOString() } : d
    ));
    closeModal();
  };

  const guidelines = [
    {
      title: "Práticas Permitidas",
      icon: CheckCircle2,
      color: "green",
      items: [
        "Divulgação em redes sociais pessoais",
        "Criação de conteúdo educativo sobre os produtos",
        "Compartilhamento de links em grupos permitidos",
        "E-mail marketing com base de leads própria",
      ],
    },
    {
      title: "Práticas Proibidas",
      icon: AlertCircle,
      color: "red",
      items: [
        "SPAM em qualquer plataforma",
        "Uso de informações falsas ou enganosas",
        "Compra de tráfego bot ou fake",
        "Violação de direitos autorais",
      ],
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-20 animate-in fade-in duration-700 relative text-white">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className={cn(
          "w-16 h-16 border rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500",
          isKycVerified ? "bg-green-500/20 border-green-500/40 text-green-400" : "bg-white/10 border-white/20 text-white"
        )}>
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">
            Compliance & <span className="text-gray-400">Segurança</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm font-bold uppercase tracking-[0.2em]">
            Sua operação blindada sob protocolos internacionais de conformidade.
          </p>
        </div>
      </div>

      {/* STATUS DASHBOARD */}
      <section className={cn(
        "relative overflow-hidden rounded-[40px] border p-8 lg:p-12 transition-all duration-500 bg-[#080808]",
        isKycVerified ? "border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)] hover:border-green-500/50" : "border-gray-700 hover:border-gray-500"
      )}>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <Fingerprint className={cn("w-6 h-6", isKycVerified ? "text-green-400" : "text-white")} />
              <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Identidade Digital</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                {isKycVerified ? "Conta Verificada" : "Verificação Necessária"}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm font-semibold">
                {isKycVerified
                  ? "Sua conta atingiu o nível de confiança máximo."
                  : "Complete o envio da documentação para liberar saques e prêmios."}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-2 transition-all hover:bg-white/10 hover:border-white/20">
              <UploadCloud className="w-5 h-5 text-gray-300" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Arquivos</p>
              <p className="text-2xl font-black text-white">{complianceStatus.documentsSubmitted}/4</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-2 transition-all hover:bg-white/10 hover:border-white/20">
              <ShieldAlert className="w-5 h-5 text-gray-300" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saque</p>
              <p className={cn("text-2xl font-black", isKycVerified ? "text-green-400" : "text-yellow-400")}>{isKycVerified ? "Ok" : "Falta KYC"}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-2 transition-all hover:bg-white/10 hover:border-white/20">
              <Clock className="w-5 h-5 text-gray-300" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SLA</p>
              <p className="text-2xl font-black text-white">72h</p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="flex gap-2 p-1.5 bg-[#080808] border border-gray-700 rounded-2xl w-fit mx-auto lg:mx-0">
        {[
          { id: "kyc", label: "Verificação KYC", icon: ShieldCheck },
          { id: "conduta", label: "Conduta", icon: Gavel },
          { id: "termos", label: "Contratos", icon: FileText },
          { id: "privacidade", label: "Privacidade", icon: Lock }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab.id ? "bg-white text-black shadow-xl" : "text-gray-300 hover:text-white hover:bg-white/10"
            )}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {activeTab === "kyc" && (
            <div className="bg-[#080808] border border-gray-700 rounded-[32px] overflow-hidden">
              <div className="p-8 border-b border-gray-800 bg-white/[0.05] flex justify-between items-center">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">Documentação</h3>
                <span className="text-[10px] font-black text-white bg-gray-800 px-3 py-1 rounded-full uppercase italic">Segurança Ativa</span>
              </div>
              <div className="divide-y divide-gray-800">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-8 flex flex-col sm:flex-row justify-between items-center gap-6 transition-all hover:bg-white/[0.03]">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                        doc.status === "approved" ? "bg-green-500/20 text-green-400" :
                          doc.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-800 text-white"
                      )}>
                        {doc.status === "approved" ? <CheckCircle2 /> : doc.status === "pending" ? <Clock /> : <FileText />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-white font-black uppercase text-sm tracking-tight">{doc.name}</p>
                        <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">{doc.description}</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {doc.status === "missing" ? (
                        <button onClick={() => openModal(doc.id, doc.name)} className="bg-white text-black px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 hover:scale-105 transition-all shadow-lg active:scale-95">Enviar</button>
                      ) : (
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg border",
                          doc.status === "approved" ? "text-green-400 border-green-500/40 bg-green-500/10" : "text-yellow-400 border-yellow-500/40 bg-yellow-500/10"
                        )}>
                          {doc.status === "approved" ? "Verificado" : "Em Análise"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "conduta" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guidelines.map((g, i) => (
                <div key={i} className={cn("bg-[#080808] border rounded-[32px] p-8 space-y-8 transition-all hover:bg-white/[0.02]", g.color === "green" ? "border-green-500/30" : "border-red-500/30")}>
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", g.color === "green" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                      <g.icon />
                    </div>
                    <h3 className="text-white font-black uppercase text-sm tracking-widest">{g.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {g.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-gray-200 text-sm font-bold leading-relaxed">
                        <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]", g.color === "green" ? "bg-green-400" : "bg-red-400")} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {(activeTab === "termos" || activeTab === "privacidade") && (
            <div className="bg-[#080808] border border-gray-700 rounded-[32px] p-10 space-y-10 hover:border-gray-500 transition-colors">
              <div className="space-y-6">
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter italic">Acordo Geral</h3>
                <div className="space-y-8 text-gray-200 text-sm leading-relaxed font-bold">
                  <p>Ao utilizar o ApexHub, você concorda integralmente com os termos. Fraudes resultam em banimento imediato.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
                    <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="font-black uppercase text-xs tracking-widest border-b border-white/20 pb-2">Privacidade</h4>
                      <p className="text-gray-300">Dados criptografados AES-256.</p>
                    </div>
                    <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="font-black uppercase text-xs tracking-widest border-b border-white/20 pb-2">Retenção</h4>
                      <p className="text-gray-300">Logs mantidos por 24 meses.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR - CORREÇÃO DO BUG VISUAL LEGAL ASSETS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[32px] p-8 space-y-6 shadow-2xl">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
              <Download className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-black font-black uppercase text-sm tracking-tight">Legal Assets</h4>
              <p className="text-black/40 text-[10px] font-black uppercase tracking-widest">Downloads Seguros</p>
            </div>
            <div className="space-y-2 pt-4">
              {["Termos de Uso", "Privacidade", "Conduta"].map((file, i) => (
                <button
                  key={i}
                  className="w-full flex justify-between items-center p-4 rounded-2xl border border-black/10 transition-all bg-gray-50 text-black hover:bg-black hover:text-white hover:border-black group/btn active:scale-95 shadow-sm"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{file}</span>
                  <Download className="w-4 h-4 opacity-40 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#080808] border border-gray-700 rounded-[32px] p-8 space-y-6 transition-all hover:border-gray-500">
            <div className="flex items-center gap-3">
              <Info className="text-white w-5 h-5" />
              <h4 className="text-white font-black uppercase text-xs tracking-widest">Compliance FAQ</h4>
            </div>
            <div className="space-y-4">
              <div className="space-y-1 border-l-2 border-white/20 pl-4 text-white">
                <p className="text-xs font-black uppercase">Limite CPF</p>
                <p className="text-gray-300 text-[11px] font-bold leading-relaxed uppercase">R$ 1.000,00 mensais.</p>
              </div>
            </div>
            <button className="bg-white text-black w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl font-bold active:scale-95">
              Oficial de Compliance
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {uploadModal.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-[40px] w-full max-w-xl p-10 relative">
            <button onClick={closeModal} className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Processar Gateway</h3>
                <p className="text-gray-300 text-[11px] font-black uppercase tracking-[0.2em]">{uploadModal.docName}</p>
              </div>

              <label className="border-2 border-dashed border-white/20 bg-white/5 rounded-[32px] p-12 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-white/50 hover:bg-white/10 group">
                <UploadCloud className="w-12 h-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-white font-black text-xs uppercase tracking-widest">Selecionar Arquivo</p>
                <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
              </label>

              {fileToUpload && (
                <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4 flex justify-between items-center animate-in slide-in-from-top-2">
                  <span className="text-xs text-white font-black uppercase truncate flex-1 pr-4">{fileToUpload.name}</span>
                  <button onClick={() => setFileToUpload(null)}><X className="w-4 h-4 text-white hover:text-red-500 transition-colors" /></button>
                </div>
              )}

              <div className="flex gap-4">
                <button onClick={closeModal} className="flex-1 bg-white/10 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all">Sair</button>
                <button
                  onClick={handleSubmitDocument}
                  disabled={!fileToUpload}
                  className="flex-1 bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 disabled:opacity-30 transition-all shadow-2xl active:scale-95"
                >
                  Confirmar Envio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}