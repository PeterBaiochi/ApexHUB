import { useState } from "react";
import {
  Package,
  TrendingUp,
  DollarSign,
  Search,
  ChevronDown,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  commission: number;
  commissionType: "%" | "fixed";
  price: number;
  image: string;
  popularity: "high" | "medium" | "low";
}

const products: Product[] = [
  {
    id: 1,
    name: "Curso Completo de Marketing Digital",
    category: "Educação",
    commission: 40,
    commissionType: "%",
    price: 997,
    image: "https://images.unsplash.com/photo-1588912914078-2fe5224fd8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBjb3Vyc2UlMjBsYXB0b3B8ZW58MXx8fHwxNzcxODAzMzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "high",
  },
  {
    id: 2,
    name: "Kit Fitness Premium - Treino em Casa",
    category: "Saúde",
    commission: 35,
    commissionType: "%",
    price: 599,
    image: "https://images.unsplash.com/photo-1609858922226-d8e75c4502e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwd29ya291dHxlbnwxfHx8fDE3NzE4MDMzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "high",
  },
  {
    id: 3,
    name: "Livro: Estratégias de Vendas Online",
    category: "Educação",
    commission: 50,
    commissionType: "%",
    price: 79,
    image: "https://images.unsplash.com/photo-1621763211885-243bb801ff60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBib29rcyUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MTgwMzMyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "medium",
  },
  {
    id: 4,
    name: "Software de Automação de Marketing",
    category: "Tecnologia",
    commission: 30,
    commissionType: "%",
    price: 197,
    image: "https://images.unsplash.com/photo-1764123108291-0f48d2c7e563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc29mdHdhcmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTgwMzMzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "high",
  },
  {
    id: 5,
    name: "Suplementos Nutricionais Premium",
    category: "Saúde",
    commission: 25,
    commissionType: "%",
    price: 299,
    image: "https://images.unsplash.com/photo-1611779013424-1ec1aaf87be7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBzdXBwbGVtZW50cyUyMGhlYWx0aHl8ZW58MXx8fHwxNzcxODAzMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "medium",
  },
  {
    id: 6,
    name: "Coleção Fashion Primavera/Verão",
    category: "Moda",
    commission: 20,
    commissionType: "%",
    price: 449,
    image: "https://images.unsplash.com/photo-1733324961657-8c60ff1e7c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHlsZXxlbnwxfHx8fDE3NzE4MDMzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "low",
  },
  {
    id: 7,
    name: "Mentoria em Investimentos",
    category: "Finanças",
    commission: 45,
    commissionType: "%",
    price: 1497,
    image: "https://images.unsplash.com/photo-1764407395696-495d7fb7fc71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZmluYW5jZSUyMG1vbmV5fGVufDF8fHx8MTc3MTgwMzMzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "high",
  },
  {
    id: 8,
    name: "Kit Skincare Profissional",
    category: "Beleza",
    commission: 30,
    commissionType: "%",
    price: 349,
    image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBza2luY2FyZXxlbnwxfHx8fDE3NzE3MTYyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    popularity: "medium",
  },
];

const categories = ["Todas", "Educação", "Saúde", "Tecnologia", "Moda", "Finanças", "Beleza"];
const commissionRanges = ["Todas", "0-25%", "26-40%", "41%+"];
const popularityOptions = ["Todas", "Alta", "Média", "Baixa"];

export function Produtos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCommission, setSelectedCommission] = useState("Todas");
  const [selectedPopularity, setSelectedPopularity] = useState("Todas");

  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory;

    // Commission filter
    let matchesCommission = true;
    if (selectedCommission === "0-25%") {
      matchesCommission = product.commission <= 25;
    } else if (selectedCommission === "26-40%") {
      matchesCommission = product.commission > 25 && product.commission <= 40;
    } else if (selectedCommission === "41%+") {
      matchesCommission = product.commission > 40;
    }

    // Popularity filter
    let matchesPopularity = true;
    if (selectedPopularity === "Alta") {
      matchesPopularity = product.popularity === "high";
    } else if (selectedPopularity === "Média") {
      matchesPopularity = product.popularity === "medium";
    } else if (selectedPopularity === "Baixa") {
      matchesPopularity = product.popularity === "low";
    }

    return (
      matchesSearch && matchesCategory && matchesCommission && matchesPopularity
    );
  });

  const getPopularityBadge = (popularity: string) => {
    switch (popularity) {
      case "high":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-[#121214]/10 text-white border border-white/30 rounded">
            🔥 Alta
          </span>
        );
      case "medium":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded">
            📈 Média
          </span>
        );
      case "low":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-[#0a0a0c]0/10 text-gray-400 border border-gray-500/30 rounded">
            📊 Baixa
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-xl flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Produtos</h1>
          <p className="text-gray-400 mt-1">
            Encontre os melhores produtos para promover
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar produtos..."
            className="w-full bg-[#050505] border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffffff]"
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] sticky top-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#ffffff]" />
              Filtros
            </h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                CATEGORIA
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-[#ffffff] text-white font-medium"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Commission Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                COMISSÃO
              </h3>
              <div className="space-y-2">
                {commissionRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedCommission(range)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCommission === range
                        ? "bg-[#ffffff] text-white font-medium"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Popularity Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                POPULARIDADE
              </h3>
              <div className="space-y-2">
                {popularityOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedPopularity(option)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPopularity === option
                        ? "bg-[#ffffff] text-white font-medium"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory("Todas");
                setSelectedCommission("Todas");
                setSelectedPopularity("Todas");
                setSearchQuery("");
              }}
              className="w-full mt-6 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              {filteredProducts.length} produtos encontrados
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#050505] border-2 border-gray-800 rounded-xl overflow-hidden hover:border-[#ffffff]/50 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      {getPopularityBadge(product.popularity)}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <span className="text-xs font-medium text-[#ffffff] bg-[#ffffff]/10 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-white font-semibold mb-3 line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      {/* Commission */}
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#ffffff]" />
                        <div>
                          <p className="text-xs text-gray-400">Comissão</p>
                          <p className="text-lg font-bold text-[#ffffff]">
                            {product.commission}%
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-white" />
                        <div>
                          <p className="text-xs text-gray-400">Preço</p>
                          <p className="text-lg font-bold text-white">
                            R$ {product.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Earnings Estimation */}
                    <div className="bg-[#000000] rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 mb-1">
                        Você ganha por venda:
                      </p>
                      <p className="text-xl font-bold text-[#ffffff]">
                        R${" "}
                        {((product.price * product.commission) / 100).toFixed(
                          2
                        )}
                      </p>
                    </div>

                    {/* Promote Button */}
                    <button className="w-full px-4 py-3 bg-[#ffffff] text-white font-semibold rounded-lg hover:bg-[#ffffff] transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                      Promover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#050505] border-2 border-gray-800 border-dashed rounded-xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou termos de pesquisa
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
