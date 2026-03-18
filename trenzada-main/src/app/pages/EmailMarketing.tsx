import { useState } from "react";
import {
  Mail,
  Plus,
  Send,
  Eye,
  MousePointer,
  TrendingUp,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Image as ImageIcon,
  Type,
  Layout as LayoutIcon,
  Square,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Campaign {
  id: number;
  name: string;
  status: "Enviada" | "Rascunho" | "Agendada";
  date: string;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Lançamento Produto X",
    status: "Enviada",
    date: "15/02/2026",
    sent: 15420,
    opened: 8234,
    clicked: 1245,
    converted: 187,
  },
  {
    id: 2,
    name: "Newsletter Semanal #12",
    status: "Enviada",
    date: "10/02/2026",
    sent: 12350,
    opened: 6175,
    clicked: 925,
    converted: 92,
  },
  {
    id: 3,
    name: "Promoção Relâmpago",
    status: "Agendada",
    date: "25/02/2026",
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
  },
  {
    id: 4,
    name: "Campanha de Reengajamento",
    status: "Rascunho",
    date: "—",
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
  },
];

interface EmailElement {
  id: string;
  type: "text" | "image" | "button" | "divider";
  content: string;
}

const DraggableElement = ({ type, icon: Icon, label }: { type: string; icon: any; label: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "EMAIL_ELEMENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => { drag(node); }}
      className={`flex items-center gap-3 p-3 bg-[#050505] border border-gray-800 rounded-lg cursor-move hover:border-[#ffffff]/50 transition-colors ${isDragging ? "opacity-50" : ""
        }`}
    >
      <Icon className="w-5 h-5 text-[#ffffff]" />
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
};

const DroppableCanvas = ({
  elements,
  onDrop,
}: {
  elements: EmailElement[];
  onDrop: (type: string) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "EMAIL_ELEMENT",
    drop: (item: { type: string }) => onDrop(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => { drop(node); }}
      className={`min-h-[400px] bg-[#121214] rounded-lg p-6 border-2 ${isOver ? "border-[#ffffff]" : "border-[#3f3f46]"
        } transition-colors`}
    >
      {elements.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <LayoutIcon className="w-12 h-12 mb-3" />
          <p>Arraste elementos aqui para construir seu email</p>
        </div>
      ) : (
        <div className="space-y-4">
          {elements.map((element) => (
            <div key={element.id} className="p-4 border border-[#27272a] rounded bg-[#0a0a0c]">
              {element.type === "text" && (
                <p className="text-gray-100">{element.content}</p>
              )}
              {element.type === "image" && (
                <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              {element.type === "button" && (
                <button className="px-6 py-2 bg-[#ffffff] text-white font-semibold rounded">
                  {element.content}
                </button>
              )}
              {element.type === "divider" && (
                <div className="border-t border-[#3f3f46]"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function EmailMarketing() {
  const [showEditor, setShowEditor] = useState(false);
  const [emailElements, setEmailElements] = useState<EmailElement[]>([]);

  const totalSent = mockCampaigns.reduce((acc, c) => acc + c.sent, 0);
  const totalOpened = mockCampaigns.reduce((acc, c) => acc + c.opened, 0);
  const totalClicked = mockCampaigns.reduce((acc, c) => acc + c.clicked, 0);
  const totalConverted = mockCampaigns.reduce((acc, c) => acc + c.converted, 0);

  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0";
  const clickRate = totalOpened > 0 ? ((totalClicked / totalOpened) * 100).toFixed(1) : "0";
  const conversionRate = totalClicked > 0 ? ((totalConverted / totalClicked) * 100).toFixed(1) : "0";

  const handleDrop = (type: string) => {
    const newElement: EmailElement = {
      id: Date.now().toString(),
      type: type as any,
      content:
        type === "text"
          ? "Novo parágrafo de texto..."
          : type === "button"
            ? "Clique aqui"
            : "",
    };
    setEmailElements([...emailElements, newElement]);
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "Enviada":
        return "bg-[#121214]/10 text-white border-white/30";
      case "Agendada":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "Rascunho":
        return "bg-[#0a0a0c]0/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Campanhas de Email</h1>
              <p className="text-gray-400 mt-1">
                Gerencie e otimize suas campanhas de email marketing
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="flex items-center gap-2 px-6 py-3 bg-[#ffffff] text-white font-semibold rounded-lg hover:bg-[#ffffff] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            <Plus className="w-5 h-5" />
            Nova Campanha
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Emails Enviados */}
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#ffffff]/10 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-[#ffffff]" />
              </div>
              <span className="text-xs text-white bg-green-400/10 px-2 py-1 rounded">
                +12.5%
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Emails Enviados</p>
              <p className="text-2xl font-bold text-white">{totalSent.toLocaleString()}</p>
            </div>
          </div>

          {/* Taxa de Abertura */}
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#ffffff]/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#ffffff]" />
              </div>
              <span className="text-xs text-white bg-green-400/10 px-2 py-1 rounded">
                +5.3%
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Taxa de Abertura</p>
              <p className="text-2xl font-bold text-white">{openRate}%</p>
            </div>
          </div>

          {/* Cliques */}
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#ffffff]/10 rounded-lg flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-[#ffffff]" />
              </div>
              <span className="text-xs text-white bg-green-400/10 px-2 py-1 rounded">
                +8.7%
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Cliques</p>
              <p className="text-2xl font-bold text-white">
                {totalClicked.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">CTR: {clickRate}%</p>
            </div>
          </div>

          {/* Conversões */}
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#ffffff]/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#ffffff]" />
              </div>
              <span className="text-xs text-white bg-green-400/10 px-2 py-1 rounded">
                +15.2%
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Conversões</p>
              <p className="text-2xl font-bold text-white">
                {totalConverted.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Taxa: {conversionRate}%</p>
            </div>
          </div>
        </div>

        {/* Email Editor (Premium) */}
        {showEditor && (
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.15)] mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#ffffff]">
                Editor de Email - Drag & Drop
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Elements Palette */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-400 mb-4">
                  ELEMENTOS
                </h3>
                <DraggableElement type="text" icon={Type} label="Texto" />
                <DraggableElement type="image" icon={ImageIcon} label="Imagem" />
                <DraggableElement type="button" icon={Square} label="Botão" />
                <DraggableElement type="divider" icon={LayoutIcon} label="Divisor" />
              </div>

              {/* Canvas */}
              <div className="lg:col-span-3">
                <DroppableCanvas elements={emailElements} onDrop={handleDrop} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-800">
              <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Cancelar
              </button>
              <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                Salvar Rascunho
              </button>
              <button className="px-6 py-2 bg-[#ffffff] text-white font-semibold rounded-lg hover:bg-[#ffffff] transition-colors">
                Agendar Envio
              </button>
            </div>
          </div>
        )}

        {/* Campaigns Table */}
        <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Todas as Campanhas</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">
                    Nome da Campanha
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">
                    Data
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">
                    Performance
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((campaign) => {
                  const openRate =
                    campaign.sent > 0
                      ? ((campaign.opened / campaign.sent) * 100).toFixed(1)
                      : "0";
                  const clickRate =
                    campaign.opened > 0
                      ? ((campaign.clicked / campaign.opened) * 100).toFixed(1)
                      : "0";

                  return (
                    <tr
                      key={campaign.id}
                      className="border-b border-gray-800 hover:bg-[#000000] transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#ffffff]/10 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5 text-[#ffffff]" />
                          </div>
                          <span className="text-white font-medium">{campaign.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            campaign.status
                          )}`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span>{campaign.date}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {campaign.status === "Enviada" ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Send className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">
                                {campaign.sent.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Eye className="w-4 h-4 text-[#ffffff]" />
                              <span className="text-[#ffffff]">{openRate}%</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MousePointer className="w-4 h-4 text-blue-400" />
                              <span className="text-blue-400">{clickRate}%</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors group">
                            <Edit className="w-4 h-4 text-gray-400 group-hover:text-[#ffffff]" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors group">
                            <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors group">
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-gray-800 flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Mostrando {mockCampaigns.length} campanhas
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">
                Anterior
              </button>
              <button className="px-3 py-1 text-sm bg-[#ffffff] text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">
                2
              </button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
