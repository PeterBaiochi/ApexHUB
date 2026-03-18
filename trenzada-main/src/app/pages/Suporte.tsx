import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Send,
  Search,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Zap,
} from "lucide-react";

export function Suporte() {
  const faqCategories = [
    {
      title: "Primeiros Passos",
      questions: [
        { q: "Como criar meu primeiro link de afiliado?", views: 1250 },
        { q: "Como funciona o sistema de comissões?", views: 980 },
        { q: "Quanto tempo leva para receber meu primeiro pagamento?", views: 850 },
      ],
    },
    {
      title: "Pagamentos",
      questions: [
        { q: "Quais são as formas de saque disponíveis?", views: 720 },
        { q: "Qual o valor mínimo para saque?", views: 650 },
        { q: "Como cadastrar meus dados bancários?", views: 580 },
      ],
    },
    {
      title: "Marketing e Vendas",
      questions: [
        { q: "Posso usar anúncios pagos?", views: 920 },
        { q: "Como acessar os materiais de divulgação?", views: 760 },
        { q: "Existe alguma restrição de divulgação?", views: 690 },
      ],
    },
  ];

  const supportChannels = [
    {
      icon: MessageSquare,
      title: "Chat ao Vivo",
      description: "Resposta em até 5 minutos",
      available: true,
      color: "green",
    },
    {
      icon: Mail,
      title: "Email",
      description: "suporte@scalehub.com",
      available: true,
      color: "blue",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      description: "+55 11 98765-4321",
      available: true,
      color: "green",
    },
    {
      icon: Video,
      title: "Videochamada",
      description: "Agende uma sessão",
      available: false,
      color: "purple",
    },
  ];

  const quickLinks = [
    { icon: BookOpen, title: "Central de Ajuda", description: "Base de conhecimento completa" },
    { icon: Video, title: "Tutoriais em Vídeo", description: "Aprenda visualmente" },
    { icon: FileText, title: "Documentação", description: "Guias detalhados" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Central de <span className="text-[#ffffff]">Suporte</span>
        </h1>
        <p className="text-gray-400">Estamos aqui para ajudar você a ter sucesso</p>
      </div>

      {/* Search */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-8">
        <div className="max-w-2xl mx-auto text-center">
          <HelpCircle className="w-12 h-12 text-[#ffffff] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Como podemos ajudar?</h2>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por soluções, tutoriais, perguntas..."
              className="w-full bg-[#000000] border border-gray-800 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffffff]/50"
            />
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Sugestões: <span className="text-[#ffffff] cursor-pointer hover:underline">criar link</span>,
            <span className="text-[#ffffff] cursor-pointer hover:underline ml-1">sacar dinheiro</span>,
            <span className="text-[#ffffff] cursor-pointer hover:underline ml-1">comissões</span>
          </p>
        </div>
      </div>

      {/* Support Channels */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Canais de Atendimento</h2>
        <div className="grid grid-cols-4 gap-4">
          {supportChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <button
                key={channel.title}
                className={`bg-[#050505] border rounded-xl p-6 text-left transition-all ${channel.available
                    ? `border-gray-800 hover:border-${channel.color === 'green' ? '[#ffffff]' : channel.color + '-500'}/50 hover:bg-${channel.color === 'green' ? '[#ffffff]' : channel.color + '-500'}/5`
                    : "border-gray-800 opacity-50 cursor-not-allowed"
                  }`}
                disabled={!channel.available}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${channel.color === 'green' ? 'bg-[#ffffff]/10' :
                    channel.color === 'blue' ? 'bg-blue-500/10' :
                      'bg-purple-500/10'
                  }`}>
                  <Icon className={`w-6 h-6 ${channel.color === 'green' ? 'text-[#ffffff]' :
                      channel.color === 'blue' ? 'text-blue-400' :
                        'text-purple-400'
                    }`} />
                </div>
                <p className="text-white font-semibold mb-1">{channel.title}</p>
                <p className="text-gray-400 text-sm">{channel.description}</p>
                {channel.available && (
                  <div className="flex items-center gap-1 text-[#ffffff] text-xs mt-3">
                    <div className="w-2 h-2 bg-[#ffffff] rounded-full animate-pulse"></div>
                    Disponível agora
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.title}
              className="bg-[#050505] border border-gray-800 rounded-xl p-5 hover:border-[#ffffff]/50 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ffffff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#ffffff]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#ffffff]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">{link.title}</p>
                  <p className="text-gray-400 text-xs">{link.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ffffff] transition-colors" />
              </div>
            </button>
          );
        })}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqCategories.map((category) => (
            <div key={category.title} className="bg-[#050505] border border-gray-800 rounded-xl overflow-hidden">
              <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {category.questions.map((item, index) => (
                  <button
                    key={index}
                    className="w-full px-6 py-4 text-left hover:bg-gray-800/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white font-medium mb-1 group-hover:text-[#ffffff] transition-colors">
                          {item.q}
                        </p>
                        <p className="text-xs text-gray-400">{item.views} visualizações</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ffffff] transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-[#050505] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Não encontrou o que procura?</h2>
        <p className="text-gray-400 mb-6">Envie sua dúvida e nossa equipe retornará em breve</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Assunto</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ffffff]/50">
              <option>Selecione um assunto</option>
              <option>Problema com pagamento</option>
              <option>Dúvida sobre comissões</option>
              <option>Problema técnico</option>
              <option>Sugestão</option>
              <option>Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Mensagem</label>
            <textarea
              rows={5}
              placeholder="Descreva sua dúvida ou problema..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffffff]/50 resize-none"
            ></textarea>
          </div>

          <button className="bg-[#ffffff] hover:bg-[#ffffff] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Send className="w-5 h-5" />
            Enviar Mensagem
          </button>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Horário de Atendimento</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-1">Chat ao Vivo</p>
                <p>Segunda a Sexta: 8h às 22h</p>
                <p>Sábados: 9h às 18h</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Email</p>
                <p>Resposta em até 24h úteis</p>
                <p>Todos os dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
