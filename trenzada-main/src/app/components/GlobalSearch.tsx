import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Package,
  Megaphone,
  User,
  Share2,
  TrendingUp,
  ArrowRight,
  X,
} from "lucide-react";
import { getSession } from "../auth/auth";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "produtos" | "campanhas" | "usuarios" | "materiais";
  path?: string;
  metadata?: string;
}

const mockDataBase: SearchResult[] = [
  // Produtos
  {
    id: "p1",
    title: "Curso Completo de Marketing Digital",
    description: "Comissão 40% • R$ 997",
    category: "produtos",
    path: "/produtos",
    metadata: "Educação",
  },
  {
    id: "p2",
    title: "Kit Fitness Premium - Treino em Casa",
    description: "Comissão 35% • R$ 599",
    category: "produtos",
    path: "/produtos",
    metadata: "Saúde",
  },
  {
    id: "p3",
    title: "Mentoria em Investimentos",
    description: "Comissão 45% • R$ 1.497",
    category: "produtos",
    path: "/produtos",
    metadata: "Finanças",
  },
  {
    id: "p4",
    title: "Software de Automação de Marketing",
    description: "Comissão 30% • R$ 197/mês",
    category: "produtos",
    path: "/produtos",
    metadata: "Tecnologia",
  },

  // Campanhas
  {
    id: "c1",
    title: "Black Friday 2026",
    description: "200 vendas • R$ 45.000 em comissões",
    category: "campanhas",
    path: "/campanhas",
    metadata: "Ativa",
  },
  {
    id: "c2",
    title: "Lançamento Curso IA",
    description: "150 vendas • R$ 32.500 em comissões",
    category: "campanhas",
    path: "/campanhas",
    metadata: "Ativa",
  },
  {
    id: "c3",
    title: "Afiliados Premium",
    description: "89 vendas • R$ 18.900 em comissões",
    category: "campanhas",
    path: "/campanhas",
    metadata: "Encerrada",
  },

  // Usuários
  {
    id: "u1",
    title: "Você",
    description: "AFFILIATE PRO • Ranking #47",
    category: "usuarios",
    path: "/meu-perfil",
    metadata: "Você",
  },
  {
    id: "u2",
    title: "Ana Paula Silva",
    description: "AFFILIATE • Ranking #23",
    category: "usuarios",
    path: "/ranking-geral",
    metadata: "Top Performer",
  },
  {
    id: "u3",
    title: "Carlos Mendes",
    description: "AFFILIATE • Ranking #156",
    category: "usuarios",
    path: "/ranking-geral",
    metadata: "Indicado por você",
  },

  // Materiais
  {
    id: "m1",
    title: "Post - Curso de Marketing Digital",
    description: "Instagram • 1080x1080 • PNG",
    category: "materiais",
    path: "/divulgacao",
    metadata: "342 downloads",
  },
  {
    id: "m2",
    title: "Vídeo - Depoimento de Cliente",
    description: "45s • 1080p • MP4",
    category: "materiais",
    path: "/divulgacao",
    metadata: "523 downloads",
  },
  {
    id: "m3",
    title: "Copy - Email de Boas-Vindas",
    description: "Email Marketing • TXT",
    category: "materiais",
    path: "/divulgacao",
    metadata: "234 downloads",
  },
  {
    id: "m4",
    title: "Banner - Desktop 728x90",
    description: "Banner • PNG",
    category: "materiais",
    path: "/divulgacao",
    metadata: "178 downloads",
  },
];

const categoryConfig = {
  produtos: {
    label: "Produtos",
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  campanhas: {
    label: "Campanhas",
    icon: Megaphone,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  usuarios: {
    label: "Usuários",
    icon: User,
    color: "text-white",
    bgColor: "bg-[#121214]/10",
  },
  materiais: {
    label: "Materiais",
    icon: Share2,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
};

export function GlobalSearch() {
  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";

  const mockData: SearchResult[] = mockDataBase.map((item) =>
    item.id === "u1" ? { ...item, title: displayName } : item,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Search logic
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = mockData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.metadata?.toLowerCase().includes(searchQuery)
    );

    setResults(filtered);
  }, [query]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = (result: SearchResult) => {
    if (result.path) {
      navigate(result.path);
    }
    setIsOpen(false);
    setQuery("");
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div ref={searchRef} className="flex-1 max-w-2xl relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar campanhas, produtos, links..."
          className="w-full bg-[#000000] border border-gray-700 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffffff] transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] max-h-[500px] overflow-y-auto z-50">
          {query.trim() === "" ? (
            // Empty state - suggestions
            <div className="p-6 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">
                Busca inteligente em toda plataforma
              </p>
              <p className="text-gray-500 text-xs">
                Digite para buscar produtos, campanhas, usuários e materiais
              </p>
            </div>
          ) : results.length === 0 ? (
            // No results
            <div className="p-6 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-1">
                Nenhum resultado encontrado
              </p>
              <p className="text-gray-500 text-xs">
                Tente usar palavras-chave diferentes
              </p>
            </div>
          ) : (
            // Results grouped by category
            <div className="py-2">
              {Object.entries(groupedResults).map(([category, items]) => {
                const config =
                  categoryConfig[category as keyof typeof categoryConfig];
                const Icon = config.icon;

                return (
                  <div key={category} className="mb-4 last:mb-0">
                    {/* Category Header */}
                    <div className="px-4 py-2 flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className="text-xs font-semibold text-gray-400 uppercase">
                        {config.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({items.length})
                      </span>
                    </div>

                    {/* Results */}
                    <div className="px-2">
                      {items.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#000000] transition-colors group text-left"
                        >
                          <div
                            className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className={`w-5 h-5 ${config.color}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium mb-0.5 truncate">
                              {result.title}
                            </p>
                            <p className="text-gray-400 text-xs truncate">
                              {result.description}
                            </p>
                          </div>

                          {result.metadata && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {result.metadata}
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#ffffff] transition-colors" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-800 mt-2">
                <p className="text-xs text-gray-500 text-center">
                  Mostrando {results.length} resultado
                  {results.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      {isOpen && query && (
        <div className="fixed inset-0 bg-[#000000]/50 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
