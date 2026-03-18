import { useState, useEffect } from "react";
import {
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, AlertCircle, Calendar, Download,
  Filter, CreditCard, Wallet, ChevronRight, FileText, Upload, ShieldCheck, X
} from "lucide-react";

// Hook simulado para o banco de dados (Substitua pelas chamadas reais do seu Firebase)
const useFinanceData = () => {
  return {
    user: {
      isKycVerified: true,
      cnpjStatus: "none", // 'none' | 'pending' | 'approved'
      availableBalance: 2847.50,
      withdrawableLimit: 1000.00,
    },
    transactions: [
      { id: "1", type: "credit", description: "Comissão - Campanha Black Friday", amount: 450.00, status: "completed", date: "2026-03-10", category: "Comissão" },
      { id: "5", type: "credit", description: "Comissão - Link Geral", amount: 680.00, status: "pending", date: "2026-03-06", category: "Comissão" },
    ]
  };
};

export function Financeiro() {
  const { user, transactions } = useFinanceData();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [nfFile, setNfFile] = useState<File | null>(null);

  // DADOS PARA EMISSÃO DE NOTA (Sua empresa)
  const billingInfo = {
    razao: "ApexHub Intermediações LTDA",
    cnpj: "00.000.000/0001-00",
    email: "financeiro@apexhub.com"
  };

  const handleWithdrawRequest = async () => {
    const amount = parseFloat(withdrawAmount);

    // VALIDAÇÃO DE BACK-END (LEI 1)
    if (!user.isKycVerified) return alert("KYC Obrigatório.");
    if (user.cnpjStatus !== 'approved' && amount > user.withdrawableLimit) {
      return alert(`Limite excedido. Sem CNPJ aprovado o limite é R$ ${user.withdrawableLimit}`);
    }
    if (user.cnpjStatus === 'approved' && !nfFile) {
      return alert("Upload da Nota Fiscal obrigatório para contas PJ.");
    }

    // LOGICA DE BANCO DE DADOS
    try {
      // await addDoc(collection(db, "withdrawals"), { userId, amount, nfUrl, status: 'pending' });
      alert("Solicitação enviada para auditoria financeira.");
      setShowWithdrawModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 text-white animate-in fade-in duration-700">

      {/* HEADER ESTRATÉGICO */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">
            Apex <span className="text-white/20">Finance</span>
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Gestão de Ativos e Compliance</p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${user.isKycVerified ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
            <ShieldCheck className={`w-3 h-3 ${user.isKycVerified ? 'text-green-500' : 'text-red-500'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest italic">KYC: {user.isKycVerified ? 'Verificado' : 'Pendente'}</span>
          </div>
        </div>
      </div>

      {/* GRID FINANCEIRO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CARD PRINCIPAL */}
        <div className="lg:col-span-5 bg-white rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em] italic mb-8">Disponível para Saque</p>
            <h2 className="text-7xl font-black text-black tracking-tighter">
              R$ {user.availableBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </div>

          <button
            disabled={!user.isKycVerified}
            onClick={() => setShowWithdrawModal(true)}
            className="relative z-10 w-full bg-black text-white mt-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-20 shadow-2xl"
          >
            {user.isKycVerified ? "Solicitar Saque Imediato" : "Aguardando KYC"} <ArrowUpRight className="w-4 h-4" />
          </button>
          <DollarSign className="absolute -right-8 -bottom-8 w-64 h-64 text-black/5 rotate-12" />
        </div>

        {/* CARDS SECUNDÁRIOS */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#080808] border border-white/10 rounded-[40px] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <Clock className="text-yellow-500 w-6 h-6 mb-4" />
            <div>
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Limite Mensal (Sem CNPJ)</p>
              <p className="text-3xl font-black tracking-tight text-white italic">R$ {user.withdrawableLimit.toLocaleString('pt-BR')}</p>
              <p className="text-[9px] text-orange-500/60 font-bold uppercase mt-2">Valide seu CNPJ para saque ilimitado</p>
            </div>
          </div>

          <div className="bg-[#080808] border border-white/10 rounded-[40px] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <TrendingUp className="text-white w-6 h-6 mb-4" />
            <div>
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Status CNPJ</p>
              <p className={`text-2xl font-black tracking-tight uppercase italic ${user.cnpjStatus === 'approved' ? 'text-green-500' : 'text-white/20'}`}>
                {user.cnpjStatus === 'none' ? 'Não Enviado' : user.cnpjStatus === 'pending' ? 'Em Análise' : 'Aprovado'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSAÇÕES */}
      <div className="bg-[#050505] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-widest italic">Histórico de Transações</h2>
          <button className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all">
            <Download size={16} className="text-gray-400" />
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.map((t) => (
            <div key={t.id} className="p-8 hover:bg-white/[0.01] transition-all flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {t.type === "credit" ? <ArrowUpRight className="text-white" /> : <ArrowDownRight className="text-blue-400" />}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-tight text-white italic">{t.description}</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{t.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black tracking-tighter">R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <span className={`text-[8px] font-black px-2 py-1 rounded uppercase border ${t.status === 'completed' ? 'text-green-500 border-green-500/20' : 'text-yellow-500 border-yellow-500/20'}`}>
                  {t.status === 'completed' ? 'Efetivado' : 'Aguardando'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE SAQUE (LÓGICA KYC + CNPJ + NF) */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[40px] w-full max-w-xl p-10 space-y-8 relative overflow-hidden">
            <button onClick={() => setShowWithdrawModal(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X /></button>

            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Solicitar Retirada</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Conformidade e Liquidez Apex</p>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Valor do Saque (R$)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-3xl font-black text-white focus:border-white transition-all outline-none"
                placeholder="0,00"
              />
            </div>

            {/* SEÇÃO DINÂMICA CNPJ / NOTA FISCAL */}
            {user.cnpjStatus === 'approved' ? (
              <div className="space-y-6 animate-in slide-in-from-bottom-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Dados para Faturamento (NF)</p>
                  <p className="text-xs font-bold uppercase">{billingInfo.razao}</p>
                  <p className="text-xs font-bold uppercase">CNPJ: {billingInfo.cnpj}</p>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Upload size={14} /> Upload da Nota Fiscal (PDF)</p>
                  <input
                    type="file"
                    onChange={(e) => setNfFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-white file:text-black file:uppercase file:cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex items-start gap-4">
                <AlertCircle className="text-orange-500 shrink-0" size={20} />
                <p className="text-[11px] text-orange-200/60 leading-relaxed font-medium">
                  <strong>Atenção:</strong> Como seu CNPJ não foi validado, você está operando como Pessoa Física. Seu limite mensal é de <strong>R$ 1.000,00</strong>.
                </p>
              </div>
            )}

            <button
              onClick={handleWithdrawRequest}
              className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
            >
              Confirmar e Sacar Fundos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}