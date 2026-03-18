import { useState } from "react";
import {
  Share2,
  Instagram,
  Video,
  FileText,
  Image as ImageIcon,
  Mic,
  Download,
  Eye,
  Search,
} from "lucide-react";

type Category = "instagram" | "videos" | "copies" | "banners" | "scripts";

interface Material {
  id: number;
  category: Category;
  title: string;
  description: string;
  preview: string;
  type: string;
  size?: string;
  downloads: number;
}

const materials: Material[] = [
  // Instagram
  {
    id: 1,
    category: "instagram",
    title: "Post - Curso de Marketing Digital",
    description: "Template quadrado otimizado para feed",
    preview:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBwb3N0JTIwZGVzaWduJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcxODYyODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PNG",
    size: "1080x1080",
    downloads: 342,
  },
  {
    id: 2,
    category: "instagram",
    title: "Stories - Promoção Limitada",
    description: "Vertical para stories com call-to-action",
    preview:
      "https://images.unsplash.com/photo-1521572089244-e5aaacacca6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHRlbXBsYXRlfGVufDF8fHx8MTc3MTg2Mjg0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PNG",
    size: "1080x1920",
    downloads: 287,
  },
  {
    id: 3,
    category: "instagram",
    title: "Carrossel - 5 Dicas de Vendas",
    description: "Kit com 5 slides educativos",
    preview:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBwb3N0JTIwZGVzaWduJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcxODYyODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "ZIP",
    size: "5 arquivos",
    downloads: 456,
  },

  // Videos
  {
    id: 4,
    category: "videos",
    title: "Vídeo - Depoimento de Cliente",
    description: "Testemunhal com resultados reais",
    preview:
      "https://images.unsplash.com/photo-1654288891700-95f67982cbcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmF8ZW58MXx8fHwxNzcxODMwNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "MP4",
    size: "45s - 1080p",
    downloads: 523,
  },
  {
    id: 5,
    category: "videos",
    title: "Vídeo - Demonstração do Produto",
    description: "Showcase completo das funcionalidades",
    preview:
      "https://images.unsplash.com/photo-1673767297241-f072cfefa0cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjB2aWRlbyUyMGNvbnRlbnR8ZW58MXx8fHwxNzcxODYyODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "MP4",
    size: "1m 30s - 1080p",
    downloads: 398,
  },
  {
    id: 6,
    category: "videos",
    title: "Vídeo - Tutorial Rápido",
    description: "Como começar em 3 passos simples",
    preview:
      "https://images.unsplash.com/photo-1654288891700-95f67982cbcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmF8ZW58MXx8fHwxNzcxODMwNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "MP4",
    size: "2m - 1080p",
    downloads: 612,
  },

  // Copies
  {
    id: 7,
    category: "copies",
    title: "Copy - Email de Boas-Vindas",
    description: "Primeira impressão perfeita para novos leads",
    preview: "",
    type: "TXT",
    downloads: 234,
  },
  {
    id: 8,
    category: "copies",
    title: "Copy - Post para Redes Sociais",
    description: "Kit com 10 legendas prontas para usar",
    preview: "",
    type: "DOCX",
    downloads: 445,
  },
  {
    id: 9,
    category: "copies",
    title: "Copy - Anúncio Facebook Ads",
    description: "Copy testada e aprovada com alta conversão",
    preview: "",
    type: "TXT",
    downloads: 567,
  },

  // Banners
  {
    id: 10,
    category: "banners",
    title: "Banner - Desktop 728x90",
    description: "Leaderboard para sites e blogs",
    preview:
      "https://images.unsplash.com/photo-1762325393954-5300a6e35f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlcnRpc2luZyUyMGJhbm5lciUyMGRlc2lnbnxlbnwxfHx8fDE3NzE4NjI4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PNG",
    size: "728x90",
    downloads: 178,
  },
  {
    id: 11,
    category: "banners",
    title: "Banner - Mobile 320x50",
    description: "Otimizado para dispositivos móveis",
    preview:
      "https://images.unsplash.com/photo-1762325393954-5300a6e35f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlcnRpc2luZyUyMGJhbm5lciUyMGRlc2lnbnxlbnwxfHx8fDE3NzE4NjI4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PNG",
    size: "320x50",
    downloads: 203,
  },
  {
    id: 12,
    category: "banners",
    title: "Banner - Retângulo 300x250",
    description: "Formato padrão para Google Ads",
    preview:
      "https://images.unsplash.com/photo-1762325393954-5300a6e35f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlcnRpc2luZyUyMGJhbm5lciUyMGRlc2lnbnxlbnwxfHx8fDE3NzE4NjI4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PNG",
    size: "300x250",
    downloads: 289,
  },

  // Scripts
  {
    id: 13,
    category: "scripts",
    title: "Script - Vídeo VSL (20 min)",
    description: "Roteiro completo para vídeo de vendas",
    preview:
      "https://images.unsplash.com/photo-1672679813065-adb4e17e9be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3JpcHQlMjB3cml0aW5nJTIwbm90ZWJvb2t8ZW58MXx8fHwxNzcxODYyODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PDF",
    downloads: 412,
  },
  {
    id: 14,
    category: "scripts",
    title: "Script - Reels 30 segundos",
    description: "Roteiro viral para Instagram e TikTok",
    preview:
      "https://images.unsplash.com/photo-1672679813065-adb4e17e9be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3JpcHQlMjB3cml0aW5nJTIwbm90ZWJvb2t8ZW58MXx8fHwxNzcxODYyODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PDF",
    downloads: 567,
  },
  {
    id: 15,
    category: "scripts",
    title: "Script - Webinar de Lançamento",
    description: "Estrutura completa para webinar ao vivo",
    preview:
      "https://images.unsplash.com/photo-1672679813065-adb4e17e9be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3JpcHQlMjB3cml0aW5nJTIwbm90ZWJvb2t8ZW58MXx8fHwxNzcxODYyODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "PDF",
    downloads: 321,
  },
];

const categories = [
  {
    id: "instagram" as Category,
    label: "Criativos Instagram",
    icon: Instagram,
    color: "text-pink-500",
  },
  {
    id: "videos" as Category,
    label: "Vídeos",
    icon: Video,
    color: "text-red-500",
  },
  {
    id: "copies" as Category,
    label: "Copies",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: "banners" as Category,
    label: "Banners",
    icon: ImageIcon,
    color: "text-purple-500",
  },
  {
    id: "scripts" as Category,
    label: "Scripts",
    icon: Mic,
    color: "text-orange-500",
  },
];

export function Divulgacao() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = materials.filter((material) => {
    const matchesCategory =
      selectedCategory === "all" || material.category === selectedCategory;
    const matchesSearch = material.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (material: Material) => {
    alert(`Download iniciado: ${material.title}`);
  };

  const handlePreview = (material: Material) => {
    alert(`Preview: ${material.title}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-xl flex items-center justify-center">
          <Share2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            Materiais de Divulgação
          </h1>
          <p className="text-gray-400 mt-1">
            Baixe criativos prontos para suas campanhas
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar materiais..."
            className="w-full bg-[#050505] border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffffff]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
            selectedCategory === "all"
              ? "bg-[#ffffff] text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              : "bg-[#050505] text-gray-400 border border-gray-800 hover:border-[#ffffff]/50"
          }`}
        >
          Todos
        </button>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-[#ffffff] text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-[#050505] text-gray-400 border border-gray-800 hover:border-[#ffffff]/50"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  selectedCategory === category.id
                    ? "text-white"
                    : category.color
                }`}
              />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Materials Grid */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">
          {filteredMaterials.length} materiais encontrados
        </p>
      </div>

      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-[#050505] border-2 border-gray-800 rounded-xl overflow-hidden hover:border-[#ffffff]/50 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
            >
              {/* Preview */}
              {material.preview ? (
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={material.preview}
                    alt={material.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#000000]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handlePreview(material)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#121214] text-white rounded-lg font-medium hover:bg-[#1a1a1f] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Visualizar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-gray-400" />
                </div>
              )}

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold flex-1">
                    {material.title}
                  </h3>
                  <span className="text-xs font-medium text-[#ffffff] bg-[#ffffff]/10 px-2 py-1 rounded ml-2">
                    {material.type}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-3">
                  {material.description}
                </p>

                {material.size && (
                  <p className="text-xs text-gray-500 mb-3">
                    Tamanho: {material.size}
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Download className="w-4 h-4" />
                    <span>{material.downloads}</span>
                  </div>

                  <button
                    onClick={() => handleDownload(material)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] text-white font-semibold rounded-lg hover:bg-[#ffffff] transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                  >
                    <Download className="w-4 h-4" />
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#050505] border-2 border-gray-800 border-dashed rounded-xl p-12 text-center">
          <Share2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Nenhum material encontrado
          </h3>
          <p className="text-gray-500">
            Tente ajustar os filtros ou termos de pesquisa
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-[#050505]/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#ffffff] mb-4">
          💡 Como usar os materiais:
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>
              Todos os materiais já contém seu link de afiliado personalizado
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>
              Você pode editar e adaptar os criativos conforme sua necessidade
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>
              Materiais novos são adicionados semanalmente - volte sempre!
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>
              Em caso de dúvidas sobre uso, consulte nossa página de Compliance
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
