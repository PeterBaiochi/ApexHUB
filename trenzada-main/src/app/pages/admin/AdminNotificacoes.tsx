import { useState } from "react";
import {
  Bell,
  Send,
  Users,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Megaphone,
  Mail,
  MessageSquare,
  Target,
  Plus,
} from "lucide-react";

export function AdminNotificacoes() {
  const [selectedType, setSelectedType] = useState("all");

  const notificationStats = {
    totalSent: 15847,
    delivered: 15230,
    failed: 617,
    openRate: 68.5,
  };

  const scheduledNotifications = [
    {
      id: "1",
      title: "Nova Campanha Black Friday Disponível",
      message: "Confira as novas oportunidades de vendas com comissões especiais",
      type: "campaign",
      audience: "Todos os Afiliados",
      scheduledFor: "2026-03-15 10:00",
      status: "scheduled",
      recipients: 2847,
    },
    {
      id: "2",
      title: "Manutenção Programada do Sistema",
      message: "O sistema ficará offline por 2 horas para manutenção",
      type: "system",
      audience: "Todos os Usuários",
      scheduledFor: "2026-03-14 02:00",
      status: "scheduled",
      recipients: 3521,
    },
    {
      id: "3",
      title: "Novo Curso Disponível na Academy",
      message: "Aprenda estratégias avançadas de marketing digital",
      type: "educational",
      audience: "Afiliados Ativos",
      scheduledFor: "2026-03-16 14:00",
      status: "draft",
      recipients: 1834,
    },
  ];

  const recentNotifications = [
    {
      id: "1",
      title: "Lembrete: Prazo para Saque Encerrando",
      message: "Solicite seu saque até o dia 20 para receber ainda este mês",
      type: "financial",
      sentAt: "2026-03-13 09:30",
      recipients: 2456,
      delivered: 2401,
      opened: 1680,
      status: "sent",
    },
    {
      id: "2",
      title: "Ranking Mensal Atualizado",
      message: "Confira sua posição no ranking de afiliados deste mês",
      type: "engagement",
      sentAt: "2026-03-12 15:00",
      recipients: 3124,
      delivered: 3089,
      opened: 2145,
      status: "sent",
    },
    {
      id: "3",
      title: "Novos Materiais de Divulgação",
      message: "Baixe os novos banners e templates para suas campanhas",
      type: "marketing",
      sentAt: "2026-03-11 11:20",
      recipients: 2847,
      delivered: 2820,
      opened: 1950,
      status: "sent",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "campaign": return <Megaphone className="w-4 h-4" />;
      case "system": return <AlertCircle className="w-4 h-4" />;
      case "educational": return <Info className="w-4 h-4" />;
      case "financial": return <Target className="w-4 h-4" />;
      case "engagement": return <Users className="w-4 h-4" />;
      case "marketing": return <Mail className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "campaign": return "bg-purple-100 text-purple-700";
      case "system": return "bg-red-100 text-red-700";
      case "educational": return "bg-blue-100 text-blue-700";
      case "financial": return "bg-green-100 text-green-700";
      case "engagement": return "bg-orange-100 text-orange-700";
      case "marketing": return "bg-pink-100 text-pink-700";
      default: return "bg-[#1a1a1f] text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Central de Notificações</h1>
          <p className="text-sm text-gray-400 mt-1">Gerencie notificações e comunicações com usuários</p>
        </div>
        <button className="bg-[#00ff7f] hover:bg-[#00cc66] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" />
          Nova Notificação
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Total Enviadas</p>
          <p className="text-3xl font-bold text-white">{notificationStats.totalSent.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-gray-500 mt-2">Últimos 30 dias</p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Entregues</p>
          <p className="text-3xl font-bold text-white">{notificationStats.delivered.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-green-600 mt-2">
            {((notificationStats.delivered / notificationStats.totalSent) * 100).toFixed(1)}% taxa de entrega
          </p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Falhas</p>
          <p className="text-3xl font-bold text-white">{notificationStats.failed.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-red-600 mt-2">
            {((notificationStats.failed / notificationStats.totalSent) * 100).toFixed(1)}% taxa de falha
          </p>
        </div>

        <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Taxa de Abertura</p>
          <p className="text-3xl font-bold text-white">{notificationStats.openRate}%</p>
          <p className="text-xs text-gray-500 mt-2">Média geral</p>
        </div>
      </div>

      {/* Create Notification Form */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] p-6">
        <h2 className="text-lg font-bold text-white mb-4">Criar Nova Notificação</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                type="text"
                placeholder="Ex: Nova campanha disponível"
                className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
              <select className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]">
                <option value="campaign">Campanha</option>
                <option value="system">Sistema</option>
                <option value="educational">Educacional</option>
                <option value="financial">Financeiro</option>
                <option value="engagement">Engajamento</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
            <textarea
              rows={3}
              placeholder="Escreva a mensagem da notificação..."
              className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff7f] resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Público-Alvo</label>
              <select className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]">
                <option>Todos os Usuários</option>
                <option>Todos os Afiliados</option>
                <option>Afiliados Ativos</option>
                <option>Afiliados Inativos</option>
                <option>Top 100 Ranking</option>
                <option>Nível Bronze</option>
                <option>Nível Prata</option>
                <option>Nível Ouro</option>
                <option>Nível Diamante</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Agendar Para</label>
              <input
                type="datetime-local"
                className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button className="bg-[#00ff7f] hover:bg-[#00cc66] text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all">
              Enviar Agora
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all">
              Agendar
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-300 px-6 py-2 rounded-lg text-sm font-semibold transition-all">
              Salvar Rascunho
            </button>
          </div>
        </div>
      </div>

      {/* Scheduled Notifications */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden">
        <div className="border-b border-[#27272a] p-6">
          <h2 className="text-lg font-bold text-white">Notificações Agendadas</h2>
          <p className="text-sm text-gray-400 mt-1">Gerenciar envios programados</p>
        </div>

        <div className="divide-y divide-gray-200">
          {scheduledNotifications.map((notification) => (
            <div key={notification.id} className="p-6 hover:bg-[#0a0a0c] transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white">{notification.title}</h3>
                    {notification.status === "scheduled" ? (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <Clock className="w-3 h-3" />
                        Agendado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-[#1a1a1f] text-gray-300 px-2 py-0.5 rounded-full text-xs font-semibold">
                        Rascunho
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{notification.audience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <span>{notification.recipients.toLocaleString('pt-BR')} destinatários</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(notification.scheduledFor).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-[#1a1a1f] hover:bg-[#3f3f46] text-gray-300 px-3 py-1.5 rounded text-xs font-semibold transition-all">
                    Editar
                  </button>
                  <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded text-xs font-semibold transition-all">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden">
        <div className="border-b border-[#27272a] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Notificações Enviadas</h2>
              <p className="text-sm text-gray-400 mt-1">Histórico e métricas</p>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#121214] border border-[#3f3f46] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
            >
              <option value="all">Todos os Tipos</option>
              <option value="campaign">Campanhas</option>
              <option value="system">Sistema</option>
              <option value="educational">Educacional</option>
              <option value="financial">Financeiro</option>
              <option value="engagement">Engajamento</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentNotifications.map((notification) => (
            <div key={notification.id} className="p-6 hover:bg-[#0a0a0c] transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">{notification.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{notification.message}</p>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0a0a0c] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Destinatários</p>
                      <p className="text-lg font-bold text-white">{notification.recipients.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="bg-[#0a0a0c] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Entregues</p>
                      <p className="text-lg font-bold text-green-600">{notification.delivered.toLocaleString('pt-BR')}</p>
                      <p className="text-xs text-gray-500">{((notification.delivered / notification.recipients) * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-[#0a0a0c] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Abertos</p>
                      <p className="text-lg font-bold text-blue-600">{notification.opened.toLocaleString('pt-BR')}</p>
                      <p className="text-xs text-gray-500">{((notification.opened / notification.delivered) * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-[#0a0a0c] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Enviado em</p>
                      <p className="text-sm font-semibold text-white">
                        {new Date(notification.sentAt).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.sentAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
