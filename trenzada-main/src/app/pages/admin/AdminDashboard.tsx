import { useState } from "react";
import {
  Users,
  UserCheck,
  DollarSign,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Lock,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data for charts
const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Fev", users: 180 },
  { month: "Mar", users: 250 },
  { month: "Abr", users: 320 },
  { month: "Mai", users: 410 },
  { month: "Jun", users: 520 },
];

const revenueData = [
  { month: "Jan", revenue: 15000 },
  { month: "Fev", revenue: 22000 },
  { month: "Mar", revenue: 31000 },
  { month: "Abr", revenue: 28000 },
  { month: "Mai", revenue: 45000 },
  { month: "Jun", revenue: 52000 },
];

const activityData = [
  { day: "Seg", active: 45 },
  { day: "Ter", active: 52 },
  { day: "Qua", active: 48 },
  { day: "Qui", active: 61 },
  { day: "Sex", active: 55 },
  { day: "Sab", active: 38 },
  { day: "Dom", active: 32 },
];

// Mock data for users table
const usersData = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    status: "Ativo",
    plan: "Pro",
    avatar: "JS",
    bgColor: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    status: "Ativo",
    plan: "Premium",
    avatar: "MS",
    bgColor: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    status: "Inativo",
    plan: "Free",
    avatar: "PO",
    bgColor: "from-gray-500 to-gray-600",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@email.com",
    status: "Ativo",
    plan: "Pro",
    avatar: "AC",
    bgColor: "from-green-500 to-green-600",
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    status: "Pendente",
    plan: "Pro",
    avatar: "CF",
    bgColor: "from-yellow-500 to-yellow-600",
  },
  {
    id: 6,
    name: "Juliana Lima",
    email: "juliana.lima@email.com",
    status: "Ativo",
    plan: "Premium",
    avatar: "JL",
    bgColor: "from-pink-500 to-pink-600",
  },
];

const statsCards = [
  {
    title: "Total de Usuários",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    bgColor: "from-blue-500 to-blue-600",
  },
  {
    title: "Usuários Ativos",
    value: "892",
    change: "+8.2%",
    trend: "up",
    icon: UserCheck,
    bgColor: "from-green-500 to-green-600",
  },
  {
    title: "Receita do Mês",
    value: "R$ 52.340",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    bgColor: "from-purple-500 to-purple-600",
  },
  {
    title: "Pendências",
    value: "23",
    change: "-5.3%",
    trend: "down",
    icon: AlertCircle,
    bgColor: "from-yellow-500 to-yellow-600",
  },
];

export function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleEdit = (userId: number) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId: number) => {
    console.log("Delete user:", userId);
  };

  const handleBlock = (userId: number) => {
    console.log("Block user:", userId);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Visão geral do sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <div
              key={index}
              className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">{card.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon
                      className={`w-4 h-4 ${
                        card.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        card.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500">vs mês anterior</span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${card.bgColor} rounded-lg flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Crescimento de Usuários</h2>
            <p className="text-sm text-gray-400">Últimos 6 meses</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#000000"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Receita Mensal</h2>
            <p className="text-sm text-gray-400">Últimos 6 meses</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value: number) =>
                  `R$ ${value.toLocaleString("pt-BR")}`
                }
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Chart - Full Width */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">Atividade Semanal</h2>
          <p className="text-sm text-gray-400">Usuários ativos por dia</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Users Table */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden">
        <div className="p-6 border-b border-[#27272a]">
          <h2 className="text-lg font-bold text-white">Usuários Recentes</h2>
          <p className="text-sm text-gray-400">Gerencie os usuários do sistema</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0c] border-b border-[#27272a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#121214] divide-y divide-gray-200">
              {usersData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#0a0a0c] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${user.bgColor} rounded-full flex items-center justify-center`}
                      >
                        <span className="text-white text-sm font-bold">
                          {user.avatar}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-white">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-400">{user.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Ativo"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Inativo"
                          ? "bg-[#1a1a1f] text-gray-100"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.plan === "Premium"
                          ? "bg-purple-100 text-purple-800"
                          : user.plan === "Pro"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-[#1a1a1f] text-gray-100"
                      }`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleBlock(user.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Bloquear"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-[#27272a] bg-[#0a0a0c]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Mostrando <span className="font-medium">1-6</span> de{" "}
              <span className="font-medium">1,234</span> usuários
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-300 bg-[#121214] border border-[#3f3f46] rounded-lg hover:bg-[#0a0a0c] disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-300 bg-[#121214] border border-[#3f3f46] rounded-lg hover:bg-[#0a0a0c]">
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
