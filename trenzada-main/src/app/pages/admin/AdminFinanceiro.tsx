import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  Calendar,
  Search,
} from "lucide-react";
import { getSession } from "../../auth/auth";

export function AdminFinanceiro() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";
  const displayEmail = session?.email?.trim() || "usuario@exemplo.com";

  const financialStats = {
    totalRevenue: 487650.50,
    totalCommissions: 145230.75,
    pendingPayouts: 28450.00,
    completedPayouts: 116780.75,
    averageTicket: 189.50,
    transactionCount: 2574,
  };

  const pendingPayouts = [
    {
      id: "1",
      user: displayName,
      email: displayEmail,
      amount: 2847.50,
      method: "PIX",
      requestDate: "2026-03-12",
      status: "pending",
    },
    {
      id: "2",
      user: "Marina Silva",
      email: "marina@email.com",
      amount: 5680.00,
      method: "Transferência",
      requestDate: "2026-03-12",
      status: "pending",
    },
    {
      id: "3",
      user: "Carlos Eduardo",
      email: "carlos@email.com",
      amount: 1250.00,
      method: "PIX",
      requestDate: "2026-03-11",
      status: "pending",
    },
    {
      id: "4",
      user: "Ana Paula",
      email: "ana@email.com",
      amount: 3420.75,
      method: "PIX",
      requestDate: "2026-03-11",
      status: "processing",
    },
  ];

  const recentTransactions = [
    {
      id: "1",
      type: "commission",
      user: "Lucas Mendes",
      description: "Comissão - Venda #1523",
      amount: 450.00,
      status: "completed",
      date: "2026-03-13",
    },
    {
      id: "2",
      type: "payout",
      user: "Juliana Alves",
      description: "Saque via PIX",
      amount: -2500.00,
      status: "completed",
      date: "2026-03-13",
    },
    {
      id: "3",
      type: "commission",
      user: "Pedro Henrique",
      description: "Comissão - Venda #1524",
      amount: 320.50,
      status: "completed",
      date: "2026-03-13",
    },
    {
      id: "4",
      type: "refund",
      user: "Rafael Costa",
      description: "Estorno - Venda #1450",
      amount: -180.00,
      status: "completed",
      date: "2026-03-12",
    },
    {
      id: "5",
      type: "commission",
      user: "Fernanda Rocha",
      description: "Comissão - Venda #1525",
      amount: 680.00,
      status: "pending",
      date: "2026-03-12",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Financeiro</h1>
          <p className="text-sm text-gray-400 mt-1">Gerencie transações, pagamentos e comissões</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
          >
            <option value="today">Hoje</option>
            <option value="thisWeek">Esta Semana</option>
            <option value="thisMonth">Este Mês</option>
            <option value="lastMonth">Mês Passado</option>
            <option value="all">Todo Período</option>
          </select>
          <button className="bg-[#00ff7f] hover:bg-[#00cc66] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">+12.5%</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Receita Total</p>
          <p className="text-3xl font-bold text-white">R$ {financialStats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">+8.3%</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Comissões Pagas</p>
          <p className="text-3xl font-bold text-white">R$ {financialStats.totalCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">PENDENTE</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Pagamentos Pendentes</p>
          <p className="text-3xl font-bold text-white">R$ {financialStats.pendingPayouts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-400 mt-2">{pendingPayouts.length} solicitações</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Ticket Médio</p>
              <p className="text-xl font-bold text-white">R$ {financialStats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Pagamentos Concluídos</p>
              <p className="text-xl font-bold text-white">R$ {financialStats.completedPayouts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total de Transações</p>
              <p className="text-xl font-bold text-white">{financialStats.transactionCount.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Payouts */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden">
        <div className="border-b border-[#27272a] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Solicitações de Saque Pendentes</h2>
              <p className="text-sm text-gray-400 mt-1">Requer aprovação manual</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-[#1a1a1f] hover:bg-[#3f3f46] text-gray-300 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
                <Filter className="w-4 h-4" />
                Filtrar
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0c] border-b border-[#27272a]">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Usuário</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Método</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-[#0a0a0c] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{payout.user}</p>
                      <p className="text-xs text-gray-500">{payout.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{payout.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      R$ {payout.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(payout.requestDate).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {payout.status === "pending" ? (
                      <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <Clock className="w-3 h-3" />
                        Pendente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <Clock className="w-3 h-3" />
                        Processando
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition-all">
                        Aprovar
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition-all">
                        Rejeitar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden">
        <div className="border-b border-[#27272a] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Transações Recentes</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-[#1a1a1f] border border-[#3f3f46] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-[#0a0a0c] transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.type === "commission" ? "bg-green-100" :
                    transaction.type === "payout" ? "bg-blue-100" :
                      "bg-red-100"
                  }`}>
                  {transaction.amount > 0 ? (
                    <ArrowUpRight className={`w-5 h-5 ${transaction.type === "commission" ? "text-green-600" : "text-blue-600"
                      }`} />
                  ) : (
                    <ArrowDownRight className={`w-5 h-5 ${transaction.type === "payout" ? "text-blue-600" : "text-red-600"
                      }`} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{transaction.user}</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${transaction.type === "commission" ? "bg-green-100 text-green-700" :
                        transaction.type === "payout" ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                      }`}>
                      {transaction.type === "commission" ? "Comissão" :
                        transaction.type === "payout" ? "Saque" : "Estorno"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{transaction.description}</p>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-600" : "text-white"
                    }`}>
                    {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                </div>

                <div>
                  {transaction.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
