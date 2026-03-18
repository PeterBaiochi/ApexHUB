import { useState } from "react";
import {
  FolderOpen,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  Image,
  Video,
  Link2,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

export function AdminProjetos() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const contentStats = {
    totalProjects: 156,
    activeProjects: 89,
    drafts: 45,
    archived: 22,
  };

  const projects = [
    {
      id: "1",
      title: "Campanha Black Friday 2026",
      type: "campaign",
      status: "active",
      author: "Admin Principal",
      createdAt: "2026-03-01",
      updatedAt: "2026-03-10",
      views: 12456,
      conversions: 847,
      thumbnail: "campaign-bf.jpg",
    },
    {
      id: "2",
      title: "Curso Avançado de Marketing Digital",
      type: "course",
      status: "active",
      author: "Equipe Academy",
      createdAt: "2026-02-15",
      updatedAt: "2026-03-12",
      views: 5678,
      conversions: 234,
      thumbnail: "course-marketing.jpg",
    },
    {
      id: "3",
      title: "Landing Page Produto Premium",
      type: "landing",
      status: "active",
      author: "Design Team",
      createdAt: "2026-02-20",
      updatedAt: "2026-03-08",
      views: 8934,
      conversions: 456,
      thumbnail: "lp-premium.jpg",
    },
    {
      id: "4",
      title: "Email Marketing - Série de Boas Vindas",
      type: "email",
      status: "draft",
      author: "Marketing Team",
      createdAt: "2026-03-05",
      updatedAt: "2026-03-13",
      views: 0,
      conversions: 0,
      thumbnail: "email-welcome.jpg",
    },
    {
      id: "5",
      title: "Material de Divulgação Instagram",
      type: "media",
      status: "active",
      author: "Social Media",
      createdAt: "2026-02-28",
      updatedAt: "2026-03-11",
      views: 15234,
      conversions: 1023,
      thumbnail: "social-ig.jpg",
    },
    {
      id: "6",
      title: "Webinar: Estratégias de Vendas 2026",
      type: "webinar",
      status: "scheduled",
      author: "Equipe Academy",
      createdAt: "2026-03-08",
      updatedAt: "2026-03-13",
      views: 234,
      conversions: 12,
      thumbnail: "webinar-sales.jpg",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "campaign": return <FolderOpen className="w-4 h-4" />;
      case "course": return <Video className="w-4 h-4" />;
      case "landing": return <Link2 className="w-4 h-4" />;
      case "email": return <FileText className="w-4 h-4" />;
      case "media": return <Image className="w-4 h-4" />;
      case "webinar": return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "campaign": return "bg-purple-100 text-purple-700";
      case "course": return "bg-blue-100 text-blue-700";
      case "landing": return "bg-green-100 text-green-700";
      case "email": return "bg-orange-100 text-orange-700";
      case "media": return "bg-pink-100 text-pink-700";
      case "webinar": return "bg-teal-100 text-teal-700";
      default: return "bg-[#1a1a1f] text-gray-300";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            Ativo
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#1a1a1f] text-gray-300 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Edit className="w-3 h-3" />
            Rascunho
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Agendado
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <AlertCircle className="w-3 h-3" />
            Arquivado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projetos e Conteúdo</h1>
          <p className="text-sm text-gray-400 mt-1">Gerencie campanhas, cursos e materiais</p>
        </div>
        <button className="bg-[#00ff7f] hover:bg-[#00cc66] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Total de Projetos</p>
          <p className="text-3xl font-bold text-white">{contentStats.totalProjects}</p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Projetos Ativos</p>
          <p className="text-3xl font-bold text-white">{contentStats.activeProjects}</p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#1a1a1f] rounded-lg flex items-center justify-center">
              <Edit className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Rascunhos</p>
          <p className="text-3xl font-bold text-white">{contentStats.drafts}</p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Arquivados</p>
          <p className="text-3xl font-bold text-white">{contentStats.archived}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              className="w-full bg-[#0a0a0c] border border-[#3f3f46] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0a0a0c] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
          >
            <option value="all">Todos os Tipos</option>
            <option value="campaign">Campanhas</option>
            <option value="course">Cursos</option>
            <option value="landing">Landing Pages</option>
            <option value="email">Email Marketing</option>
            <option value="media">Mídias Sociais</option>
            <option value="webinar">Webinars</option>
          </select>

          <select className="bg-[#0a0a0c] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]">
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="draft">Rascunhos</option>
            <option value="scheduled">Agendados</option>
            <option value="archived">Arquivados</option>
          </select>

          <button className="bg-[#0a0a0c] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1f] transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Mais Filtros
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden hover:shadow-md transition-all group">
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <div className="w-16 h-16 bg-[#121214]/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                {getTypeIcon(project.type)}
              </div>
              <div className="absolute top-3 right-3">
                {getStatusBadge(project.status)}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{project.title}</h3>
                  <span className={`inline-flex items-center gap-1 ${getTypeColor(project.type)} px-2 py-0.5 rounded text-xs font-semibold`}>
                    {getTypeIcon(project.type)}
                    {project.type === "campaign" ? "Campanha" :
                      project.type === "course" ? "Curso" :
                        project.type === "landing" ? "Landing Page" :
                          project.type === "email" ? "Email" :
                            project.type === "media" ? "Mídia Social" :
                              "Webinar"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <User className="w-3 h-3" />
                  <span>{project.author}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>Atualizado em {new Date(project.updatedAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-[#27272a]">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Visualizações</p>
                  <p className="text-lg font-bold text-white">{project.views.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Conversões</p>
                  <p className="text-lg font-bold text-green-600">{project.conversions.toLocaleString('pt-BR')}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-[#1a1a1f] hover:bg-[#3f3f46] text-gray-300 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  Ver
                </button>
                <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1">
                  <Edit className="w-3 h-3" />
                  Editar
                </button>
                <button className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg text-xs font-semibold transition-all">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
        <h2 className="text-lg font-bold text-white mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-4 gap-4">
          <button className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-all text-left group">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <FolderOpen className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm font-semibold text-white">Nova Campanha</p>
            <p className="text-xs text-gray-400 mt-1">Criar campanha promocional</p>
          </button>

          <button className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-all text-left group">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <Video className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-white">Novo Curso</p>
            <p className="text-xs text-gray-400 mt-1">Adicionar à Academy</p>
          </button>

          <button className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-all text-left group">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <Link2 className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-semibold text-white">Landing Page</p>
            <p className="text-xs text-gray-400 mt-1">Criar página de vendas</p>
          </button>

          <button className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 transition-all text-left group">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm font-semibold text-white">Email Marketing</p>
            <p className="text-xs text-gray-400 mt-1">Nova campanha de email</p>
          </button>
        </div>
      </div>
    </div>
  );
}
