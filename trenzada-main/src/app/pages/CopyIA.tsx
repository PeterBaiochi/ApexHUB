import { useState } from "react";
import {
  Sparkles,
  Mail,
  Megaphone,
  FileText,
  MessageCircle,
  Copy,
  RotateCw,
  Save,
  Wand2,
} from "lucide-react";

type CopyType = "email" | "anuncio" | "pagina-vendas" | "whatsapp";

const copyTypes = [
  {
    id: "email" as CopyType,
    label: "Email",
    icon: Mail,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/30 hover:bg-blue-500/20",
  },
  {
    id: "anuncio" as CopyType,
    label: "Anúncio",
    icon: Megaphone,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/30 hover:bg-purple-500/20",
  },
  {
    id: "pagina-vendas" as CopyType,
    label: "Página de Vendas",
    icon: FileText,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/30 hover:bg-orange-500/20",
  },
  {
    id: "whatsapp" as CopyType,
    label: "WhatsApp",
    icon: MessageCircle,
    color: "bg-[#121214]/10 text-white border-white/30 hover:bg-[#121214]/20",
  },
];

const mockGeneratedContent: Record<CopyType, string> = {
  email: `Assunto: 🚀 Transforme Suas Vendas Hoje Mesmo!

Olá [Nome],

Você está pronto para revolucionar seus resultados?

Descobri uma oportunidade incrível que pode multiplicar seus ganhos em até 300% nos próximos 30 dias. E o melhor: sem precisar investir horas intermináveis ou conhecimento técnico avançado.

✨ Por que isso funciona?

• Sistema automatizado que trabalha 24/7 por você
• Suporte completo de especialistas
• Resultados comprovados por +10.000 pessoas

🎁 OFERTA EXCLUSIVA: Os primeiros 50 inscritos ganham acesso VIP com bônus especiais!

[BOTÃO: Quero Transformar Meus Resultados]

Não perca essa chance. As vagas são limitadas.

Até breve,
[Seu Nome]

P.S.: Esta oferta expira em 48 horas. Aja agora!`,

  anuncio: `🔥 PARE DE PERDER DINHEIRO! 🔥

Descubra o método secreto que gerou R$ 500 mil em vendas nos últimos 90 dias.

✅ 100% Online
✅ Sem Experiência Necessária  
✅ Resultados em 7 Dias

👉 APENAS 47 VAGAS DISPONÍVEIS

Mais de 10.000 pessoas já transformaram suas vidas com este sistema comprovado.

[CLIQUE AQUI E GARANTA SUA VAGA]

⏰ Oferta válida por tempo limitado!`,

  "pagina-vendas": `🎯 A SOLUÇÃO QUE VOCÊ SEMPRE PROCUROU

Imagine acordar todos os dias com notificações de vendas...

SEM gastar fortunas em anúncios
SEM precisar ser expert em marketing
SEM trabalhar 12 horas por dia

APRESENTANDO: [Nome do Produto]
O sistema completo que vai revolucionar seu negócio online

━━━━━━━━━━━━━━━━━━━━━━

💎 O QUE VOCÊ VAI RECEBER:

✓ Módulo 1: Fundamentos do Sucesso Digital
✓ Módulo 2: Estratégias de Conversão Avançadas  
✓ Módulo 3: Automação Inteligente
✓ Módulo 4: Escala Exponencial
✓ BÔNUS: Templates Prontos (Valor: R$ 997)
✓ BÔNUS: Mentoria em Grupo (Valor: R$ 1.497)

VALOR TOTAL: R$ 4.491

━━━━━━━━━━━━━━━━━━━━━━

🎁 OFERTA ESPECIAL DE LANÇAMENTO:

De: R$ 1.997
Por apenas: 12x de R$ 97

ou R$ 997 à vista (economize R$ 167)

━━━━━━━━━━━━━━━━━━━━━━

✨ GARANTIA BLINDADA DE 30 DIAS

Se você não ficar 100% satisfeito, devolvemos seu investimento sem perguntas.

[BOTÃO GRANDE: QUERO GARANTIR MINHA VAGA AGORA]

⚠️ ATENÇÃO: Apenas 97 vagas disponíveis neste lote!

Já foram vendidas: 73 vagas | Restam apenas: 24 vagas

━━━━━━━━━━━━━━━━━━━━━━

🏆 DEPOIMENTOS:

"Faturei R$ 50 mil no primeiro mês!" - João Silva
"Mudou completamente meu negócio!" - Maria Santos  
"Melhor investimento que já fiz!" - Pedro Costa

[BOTÃO: SIM, EU QUERO TRANSFORMAR MINHA VIDA]`,

  whatsapp: `Oi! 👋

Tudo bem? Espero que sim!

Tenho uma novidade INCRÍVEL pra te contar... 🎉

Você já imaginou ganhar renda extra trabalhando de casa, no seu tempo livre?

Pois é exatamente isso que eu descobri! 🚀

É um método simples que qualquer pessoa pode aplicar, mesmo sem experiência.

E o melhor: os resultados aparecem RÁPIDO! ⚡

Quer saber como funciona?

É só responder essa mensagem que eu te explico tudo! 😊

Ah, e tem uma surpresa especial pra quem começar essa semana... 🎁

Te espero!`,
};

export function CopyIA() {
  const [selectedType, setSelectedType] = useState<CopyType | null>(null);
  const [description, setDescription] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!selectedType || !description.trim()) return;

    setIsGenerating(true);
    // Simula geração com IA
    setTimeout(() => {
      setGeneratedContent(mockGeneratedContent[selectedType]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleSave = () => {
    // Simula salvamento
    alert("Copy salva com sucesso!");
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-xl flex items-center justify-center">
          <Wand2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Gerador de Copy com IA</h1>
          <p className="text-gray-400 mt-1">
            Crie textos persuasivos em segundos usando inteligência artificial
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] p-8 mb-6">
        {/* Description Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Descreva o que você quer gerar...
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Quero criar um email para divulgar meu novo curso de marketing digital, focado em iniciantes que querem vender online..."
            className="w-full h-32 bg-[#000000] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffffff] resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Seja específico sobre seu produto, público-alvo e objetivo
          </p>
        </div>

        {/* Type Selection Buttons */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Selecione o tipo de copy
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {copyTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                    isSelected
                      ? "border-[#ffffff] bg-[#ffffff]/10"
                      : type.color
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? "text-[#ffffff]" : ""}`} />
                  <span className={`text-sm font-medium ${isSelected ? "text-[#ffffff]" : ""}`}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedType || !description.trim() || isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#ffffff] text-white font-bold text-lg rounded-lg hover:bg-[#ffffff] transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isGenerating ? (
            <>
              <RotateCw className="w-5 h-5 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Gerar com IA
            </>
          )}
        </button>
      </div>

      {/* Result Area */}
      {generatedContent && (
        <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ffffff]" />
              <h2 className="text-xl font-bold text-white">Resultado Gerado</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                Regenerar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] text-white font-semibold rounded-lg hover:bg-[#ffffff] transition-colors"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-[#121214] rounded-lg p-6 min-h-[300px]">
              <pre className="whitespace-pre-wrap font-sans text-gray-100 leading-relaxed">
                {generatedContent}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!generatedContent && (
        <div className="bg-[#050505] border-2 border-gray-800 border-dashed rounded-xl p-12 text-center">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Pronto para criar copies incríveis?
          </h3>
          <p className="text-gray-500">
            Preencha a descrição acima, selecione o tipo e clique em "Gerar com IA"
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-[#050505]/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#ffffff] mb-4">💡 Dicas para melhores resultados:</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>Seja específico sobre seu produto/serviço e seus benefícios</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>Mencione seu público-alvo (idade, interesses, dores)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>Inclua o objetivo da copy (vender, engajar, informar)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffffff] mt-1">•</span>
            <span>Defina o tom desejado (formal, casual, urgente, educativo)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
