import { useState } from "react";
import {
  Crown,
  Sparkles,
  TrendingUp,
  DollarSign,
  Zap,
  Gift,
  Award,
  Trophy,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface VIPLevel {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
  icon: typeof Crown;
  benefits: string[];
  requirements: string[];
  minSales?: number;
}

const vipLevels: VIPLevel[] = [
  {
    id: "silver",
    name: "VIP Silver",
    color: "text-gray-300",
    glowColor: "shadow-[0_0_30px_rgba(192,192,192,0.4)]",
    borderColor: "border-gray-400/50",
    bgGradient: "from-gray-700 to-gray-900",
    icon: Award,
    minSales: 50,
    benefits: [
      "Comissão extra de +5% em todos produtos",
      "Acesso prioritário a novos lançamentos",
      "Material de divulgação exclusivo",
      "Suporte prioritário via WhatsApp",
      "Badge VIP Silver no perfil",
      "Participação em webinars exclusivos",
    ],
    requirements: [
      "Mínimo de 50 vendas no último trimestre",
      "Taxa de conversão acima de 2%",
      "Pelo menos 3 produtos ativos",
      "Conta ativa há mais de 6 meses",
      "Sem violações de compliance",
    ],
  },
  {
    id: "gold",
    name: "VIP Gold",
    color: "text-yellow-400",
    glowColor: "shadow-[0_0_40px_rgba(234,179,8,0.5)]",
    borderColor: "border-yellow-500/50",
    bgGradient: "from-yellow-700 to-yellow-900",
    icon: Crown,
    minSales: 100,
    benefits: [
      "Comissão extra de +10% em todos produtos",
      "Acesso antecipado a campanhas exclusivas",
      "Kit completo de criativos personalizados",
      "Suporte VIP 24/7 com gerente dedicado",
      "Badge VIP Gold no perfil",
      "Bônus trimestral de performance",
      "Convite para eventos presenciais",
      "Acesso ao grupo VIP Gold no Telegram",
    ],
    requirements: [
      "Mínimo de 100 vendas no último trimestre",
      "Taxa de conversão acima de 3.5%",
      "Pelo menos 5 produtos ativos",
      "Conta ativa há mais de 1 ano",
      "Faturamento mínimo de R$ 50.000",
      "Indicação de pelo menos 5 afiliados ativos",
    ],
  },
  {
    id: "black",
    name: "VIP Black",
    color: "text-purple-400",
    glowColor: "shadow-[0_0_50px_rgba(168,85,247,0.6)]",
    borderColor: "border-purple-500/50",
    bgGradient: "from-purple-700 to-purple-950",
    icon: Sparkles,
    minSales: 250,
    benefits: [
      "Comissão extra de +15% em todos produtos",
      "Co-criação de produtos exclusivos",
      "Equipe de suporte dedicada",
      "Participação nos lucros da empresa",
      "Badge VIP Black no perfil",
      "Bônus mensal de performance",
      "Viagens internacionais anuais",
      "Mentoria individual com founders",
      "Acesso ao grupo VIP Black exclusivo",
      "Prioridade máxima em todos os processos",
    ],
    requirements: [
      "Mínimo de 250 vendas no último trimestre",
      "Taxa de conversão acima de 5%",
      "Pelo menos 10 produtos ativos",
      "Conta ativa há mais de 2 anos",
      "Faturamento mínimo de R$ 150.000",
      "Indicação de pelo menos 15 afiliados ativos",
      "Aprovação por votação do board",
    ],
  },
];

const rankingBenefits = [
  {
    rank: "Top 10",
    icon: Trophy,
    color: "text-yellow-500",
    benefits: [
      "Destaque no topo do ranking",
      "Bônus mensal de R$ 5.000",
      "Badge especial no perfil",
      "Menção em redes sociais oficiais",
    ],
  },
  {
    rank: "Top 50",
    icon: Award,
    color: "text-orange-500",
    benefits: [
      "Destaque na lista de Top Performers",
      "Bônus mensal de R$ 2.000",
      "Badge de reconhecimento",
      "Acesso a grupo exclusivo",
    ],
  },
  {
    rank: "Top 100",
    icon: TrendingUp,
    color: "text-blue-500",
    benefits: [
      "Aparição na galeria de afiliados",
      "Bônus mensal de R$ 500",
      "Badge de destaque",
      "Materiais exclusivos",
    ],
  },
];

export function VIP() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleSolicitacao = (levelName: string) => {
    alert(
      `Solicitação para ${levelName} enviada com sucesso!\n\nNossa equipe irá analisar seu perfil e retornar em até 48h.`
    );
  };

  const Trophy = ({ className }: { className?: string }) => (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.4)]">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Programa VIP</h1>
          <p className="text-gray-400 mt-1">
            Benefícios exclusivos para nossos melhores afiliados
          </p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-yellow-600/20 via-purple-600/20 to-pink-600/20 border-2 border-yellow-500/30 rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-3">
            🌟 Seja um Afiliado VIP ScaleHub
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            Destrave benefícios exclusivos, comissões extras e participe do
            programa de elite com os maiores afiliados da plataforma.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-[#000000]/30 rounded-lg px-4 py-2">
              <DollarSign className="w-5 h-5 text-[#ffffff]" />
              <span className="text-white font-semibold">
                Comissões até +15%
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#000000]/30 rounded-lg px-4 py-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Suporte Prioritário</span>
            </div>
            <div className="flex items-center gap-2 bg-[#000000]/30 rounded-lg px-4 py-2">
              <Gift className="w-5 h-5 text-pink-400" />
              <span className="text-white font-semibold">Bônus Exclusivos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#ffffff]" />
          Vantagens por Ranking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rankingBenefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.rank}
                className="bg-[#050505] border-2 border-gray-800 rounded-xl p-6 hover:border-[#ffffff]/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff]/20 to-[#ffffff]/20 rounded-xl flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.rank}</h3>
                </div>

                <ul className="space-y-2">
                  {item.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-300 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ffffff] mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* VIP Levels */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-400" />
          Níveis VIP
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vipLevels.map((level) => {
            const Icon = level.icon;
            const isSelected = selectedLevel === level.id;

            return (
              <div
                key={level.id}
                className={`bg-[#050505] border-3 ${level.borderColor} rounded-2xl overflow-hidden transition-all hover:scale-105 ${level.glowColor} ${
                  isSelected ? "ring-2 ring-white" : ""
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                {/* Header */}
                <div
                  className={`bg-gradient-to-br ${level.bgGradient} p-6 relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#121214]/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <Icon className={`w-12 h-12 ${level.color} mb-3`} />
                    <h3 className={`text-2xl font-bold ${level.color} mb-2`}>
                      {level.name}
                    </h3>
                    {level.minSales && (
                      <p className="text-gray-300 text-sm">
                        A partir de {level.minSales} vendas/trimestre
                      </p>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ffffff]" />
                      Benefícios
                    </h4>
                    <ul className="space-y-2">
                      {level.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-300 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#ffffff] mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                      Requisitos
                    </h4>
                    <ul className="space-y-2">
                      {level.requirements.map((requirement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-400 text-xs"
                        >
                          <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleSolicitacao(level.name)}
                    className={`w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r ${level.bgGradient} hover:opacity-90 transition-all ${level.glowColor} flex items-center justify-center gap-2`}
                  >
                    <Crown className="w-5 h-5" />
                    Solicitar {level.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#050505]/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#ffffff] mb-4">
          📋 Como funciona o processo:
        </h3>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-[#ffffff] font-bold">1.</span>
            <span>
              Clique em "Solicitar" no nível VIP desejado que você atende os
              requisitos
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#ffffff] font-bold">2.</span>
            <span>
              Nossa equipe irá analisar seu histórico e performance na
              plataforma
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#ffffff] font-bold">3.</span>
            <span>
              Você receberá um email em até 48h com a aprovação ou feedback
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#ffffff] font-bold">4.</span>
            <span>
              Após aprovação, todos os benefícios são ativados imediatamente!
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
