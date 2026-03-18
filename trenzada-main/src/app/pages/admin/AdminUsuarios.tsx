import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  DollarSign,
  Target,
  ShieldCheck,
  ShieldAlert,
  Crown,
  Award,
  Star,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { getSession } from "../../auth/auth";

export function AdminUsuarios() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";
  const displayEmail = session?.email?.trim() || "usuario@exemplo.com";

  const userStats = {
    totalUsers: 3521,
    activeUsers: 2847,
    inactiveUsers: 674,
    newThisMonth: 234,
    topAffiliates: 156,
  };

  const users = [
    {
      id: "1",
      name: displayName,
      email: displayEmail,
      phone: "+55 11 98765-4321",
      status: "active",
      level: "Bronze",
      sales: 127,
      revenue: 24130.00,
      commission: 4826.00,
      joinedAt: "2026-01-15",
      lastLogin: "2026-03-13 14:32",
      verified: true,
    },
    {
      id: "2",
      name: "Lucas Mendes",
      email: "lucas.mendes@email.com",
      phone: "+55 11 99876-5432",
      status: "active",
      level: "Diamante",
      sales: 1523,
      revenue: 287450.00,
      commission: 57490.00,
      joinedAt: "2025-08-20",
      lastLogin: "2026-03-13 16:15",
      verified: true,
    },
    {
      id: "3",
      name: "Marina Silva",
      email: "marina.silva@email.com",
      phone: "+55 21 98765-1234",
      status: "active",
      level: "Diamante",
      sales: 1387,
      revenue: 264130.00,
      commission: 52826.00,
      joinedAt: "2025-09-10",
      lastLogin: "2026-03-13 15:48",
      verified: true,
    },
    {
      id: "4",
      name: "Rafael Costa",
      email: "rafael.costa@email.com",
      phone: "+55 11 97654-3210",
      status: "active",
      level: "Ouro",
      sales: 1245,
      revenue: 236550.00,
      commission: 47310.00,
      joinedAt: "2025-10-05",
      lastLogin: "2026-03-13 12:20",
      verified: true,
    },
    {
      id: "5",
      name: "Ana Paula",
      email: "ana.paula@email.com",
      phone: "+55 11 96543-2109",
      status: "inactive",
      level: "Prata",
      sales: 867,
      revenue: 164730.00,
      commission: 32946.00,
      joinedAt: "2025-11-12",
      lastLogin: "2026-02-28 09:15",
      verified: true,
    },
    {
      id: "6",
      name: "Carlos Eduardo",
      email: "carlos.eduardo@email.com",
      phone: "+55 21 95432-1098",
      status: "active",
      level: "Prata",
      sales: 923,
      revenue: 175370.00,
      commission: 35074.00,
      joinedAt: "2025-11-20",
      lastLogin: "2026-03-13 11:05",
      verified: true,
    },
    {
      id: "7",
      name: "Fernanda Rocha",
      email: "fernanda.rocha@email.com",
      phone: "+55 11 94321-0987",
      status: "active",
      level: "Prata",
      sales: 987,
      revenue: 187530.00,
      commission: 37506.00,
      joinedAt: "2025-12-01",
      lastLogin: "2026-03-13 13:42",
      verified: true,
    },
    {
      id: "8",
      name: "Pedro Henrique",
      email: "pedro.henrique@email.com",
      phone: "+55 11 93210-9876",
      status: "pending",
      level: "Ouro",
      sales: 1089,
      revenue: 206910.00,
      commission: 41382.00,
      joinedAt: "2025-12-15",
      lastLogin: "2026-03-13 10:25",
      verified: false,
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Diamante": return "bg-cyan-100 text-cyan-700";
      case "Ouro": return "bg-yellow-100 text-yellow-700";
      case "Prata": return "bg-gray-200 text-gray-300";
      case "Bronze": return "bg-orange-100 text-orange-700";
      default: return "bg-[#1a1a1f] text-gray-400";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Diamante": return <Crown className="w-3 h-3" />;
      case "Ouro": return <Award className="w-3 h-3" />;
      case "Prata": return <Star className="w-3 h-3" />;
      case "Bronze": return <Target className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string, verified: boolean) => {
    if (!verified) {
      return (
        <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-semibold">
          <Clock className="w-3 h-3" />
          Pendente
        </span>
      );
    }

    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            Ativo
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#1a1a1f] text-gray-300 px-2.5 py-1 rounded-full text-xs font-semibold">
            <XCircle className="w-3 h-3" />
            Inativo
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Pendente
          </span>
        );
      case "blocked":
        return (
          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Ban className="w-3 h-3" />
            Bloqueado
          </span>
        );
      default:
        return null;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "active") return matchesSearch && user.status === "active";
    if (selectedFilter === "inactive") return matchesSearch && user.status === "inactive";
    if (selectedFilter === "pending") return matchesSearch && !user.verified;

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h1>
          <p className="text-sm text-gray-400 mt-1">Gerencie todos os afiliados e usuários da plataforma</p>
        </div>
        <button className="bg-[#00ff7f] hover:bg-[#00cc66] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
          <UserPlus className="w-4 h-4" />
          Adicionar Usuário
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-6">
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Total de Usuários</p>
          <p className="text-3xl font-bold text-white">{userStats.totalUsers.toLocaleString('pt-BR')}</p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Usuários Ativos</p>
          <p className="text-3xl font-bold text-white">{userStats.activeUsers.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-green-600 mt-1">
            {((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}% do total
          </p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#1a1a1f] rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Usuários Inativos</p>
          <p className="text-3xl font-bold text-white">{userStats.inactiveUsers.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-gray-500 mt-1">
            {((userStats.inactiveUsers / userStats.totalUsers) * 100).toFixed(1)}% do total
          </p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Novos Este Mês</p>
          <p className="text-3xl font-bold text-white">{userStats.newThisMonth.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-purple-600 mt-1">+15% vs. mês anterior</p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Top Afiliados</p>
          <p className="text-3xl font-bold text-white">{userStats.topAffiliates.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-gray-500 mt-1">Ouro e Diamante</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-[#3f3f46] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === "all"
                  ? "bg-[#00ff7f] text-white"
                  : "bg-[#1a1a1f] text-gray-300 hover:bg-[#3f3f46]"
                }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === "active"
                  ? "bg-green-600 text-white"
                  : "bg-[#1a1a1f] text-gray-300 hover:bg-[#3f3f46]"
                }`}
            >
              Ativos
            </button>
            <button
              onClick={() => setSelectedFilter("inactive")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === "inactive"
                  ? "bg-gray-600 text-white"
                  : "bg-[#1a1a1f] text-gray-300 hover:bg-[#3f3f46]"
                }`}
            >
              Inativos
            </button>
            <button
              onClick={() => setSelectedFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === "pending"
                  ? "bg-orange-600 text-white"
                  : "bg-[#1a1a1f] text-gray-300 hover:bg-[#3f3f46]"
                }`}
            >
              Pendentes
            </button>
          </div>

          <button className="bg-[#1a1a1f] hover:bg-[#3f3f46] text-gray-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
            <Filter className="w-4 h-4" />
            Filtros
          </button>

          <button className="bg-[#1a1a1f] hover:bg-[#3f3f46] text-gray-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0c] border-b border-[#27272a]">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Usuário</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contato</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Nível</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Performance</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Último Login</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#0a0a0c] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#00ff7f] to-[#00cc66] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Mail className="w-3 h-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone className="w-3 h-3" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${getLevelColor(user.level)} px-2.5 py-1 rounded-full text-xs font-semibold`}>
                      {getLevelIcon(user.level)}
                      {user.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Target className="w-3 h-3 text-blue-600" />
                        <span className="text-white font-semibold">{user.sales} vendas</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <DollarSign className="w-3 h-3 text-green-600" />
                        <span className="text-white font-semibold">
                          R$ {user.commission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status, user.verified)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(user.lastLogin).toLocaleString('pt-BR')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-all" title="Ver Detalhes">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:bg-[#1a1a1f] rounded transition-all" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-all" title="Bloquear">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:bg-[#1a1a1f] rounded transition-all" title="Mais opções">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#27272a] px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Mostrando <span className="font-semibold">{filteredUsers.length}</span> de <span className="font-semibold">{users.length}</span> usuários
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#1a1a1f] hover:bg-[#3f3f46] rounded transition-all">
                Anterior
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-[#00ff7f] rounded">
                1
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#1a1a1f] hover:bg-[#3f3f46] rounded transition-all">
                2
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#1a1a1f] hover:bg-[#3f3f46] rounded transition-all">
                3
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#1a1a1f] hover:bg-[#3f3f46] rounded transition-all">
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Aprovar Pendentes</p>
              <p className="text-xs text-gray-400">8 usuários aguardando verificação</p>
            </div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            Ver Pendentes
          </button>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Usuários Bloqueados</p>
              <p className="text-xs text-gray-400">3 contas bloqueadas</p>
            </div>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            Ver Bloqueados
          </button>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Enviar Comunicado</p>
              <p className="text-xs text-gray-400">Email em massa para usuários</p>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            Criar Comunicado
          </button>
        </div>
      </div>
    </div>
  );
}
