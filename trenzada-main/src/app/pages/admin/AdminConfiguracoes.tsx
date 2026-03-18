import { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  Mail,
  Globe,
  DollarSign,
  Users,
  Database,
  Lock,
  Key,
  Palette,
  Zap,
  CheckCircle2,
  Save,
} from "lucide-react";

export function AdminConfiguracoes() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "Geral", icon: Settings },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "email", label: "Email", icon: Mail },
    { id: "payments", label: "Pagamentos", icon: DollarSign },
    { id: "users", label: "Usuários", icon: Users },
    { id: "api", label: "API", icon: Key },
    { id: "appearance", label: "Aparência", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações do Sistema</h1>
        <p className="text-sm text-gray-400 mt-1">Gerencie todas as configurações da plataforma</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#121214] rounded-xl shadow-sm border border-[#27272a] overflow-hidden">
        <div className="flex border-b border-[#27272a] overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id
                    ? "border-[#00ff7f] text-[#00ff7f] bg-[#00ff7f]/5"
                    : "border-transparent text-gray-400 hover:text-white hover:bg-[#0a0a0c]"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Configurações Gerais</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Plataforma</label>
                  <input
                    type="text"
                    defaultValue="ScaleHub"
                    className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                  <textarea
                    rows={3}
                    defaultValue="Plataforma de afiliados profissional"
                    className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f] resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email de Contato</label>
                    <input
                      type="email"
                      defaultValue="contato@scalehub.com"
                      className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                    <input
                      type="tel"
                      defaultValue="+55 11 98765-4321"
                      className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fuso Horário</label>
                  <select className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]">
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="America/New_York">Nova York (GMT-5)</option>
                    <option value="Europe/London">Londres (GMT+0)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Idioma Padrão</label>
                  <select className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Configurações de Segurança</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0a0a0c] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Autenticação de Dois Fatores (2FA)</p>
                      <p className="text-xs text-gray-400">Exigir 2FA para todos os administradores</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00ff7f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#121214] after:border-[#3f3f46] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff7f]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0c] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Bloqueio de Conta</p>
                      <p className="text-xs text-gray-400">Bloquear após 5 tentativas de login incorretas</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00ff7f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#121214] after:border-[#3f3f46] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff7f]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0c] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Key className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Expiração de Sessão</p>
                      <p className="text-xs text-gray-400">Deslogar usuários inativos automaticamente</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00ff7f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#121214] after:border-[#3f3f46] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff7f]"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tempo de Expiração de Sessão (minutos)</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Política de Senha</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00ff7f] focus:ring-[#00ff7f] border-[#3f3f46] rounded" />
                      <span className="text-sm text-gray-300">Mínimo de 8 caracteres</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00ff7f] focus:ring-[#00ff7f] border-[#3f3f46] rounded" />
                      <span className="text-sm text-gray-300">Incluir letras maiúsculas e minúsculas</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00ff7f] focus:ring-[#00ff7f] border-[#3f3f46] rounded" />
                      <span className="text-sm text-gray-300">Incluir números</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-[#00ff7f] focus:ring-[#00ff7f] border-[#3f3f46] rounded" />
                      <span className="text-sm text-gray-300">Incluir caracteres especiais</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payments Settings */}
        {activeTab === "payments" && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Configurações de Pagamento</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Valor Mínimo de Saque</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                      <input
                        type="number"
                        defaultValue="50.00"
                        step="0.01"
                        className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Valor Máximo de Saque</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                      <input
                        type="number"
                        defaultValue="50000.00"
                        step="0.01"
                        className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Dias para Liberação de Comissão</label>
                  <input
                    type="number"
                    defaultValue="7"
                    className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Período de espera antes de liberar comissões para saque</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Taxa de Processamento (%)</label>
                  <input
                    type="number"
                    defaultValue="2.5"
                    step="0.1"
                    className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Métodos de Pagamento Aceitos</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00ff7f] focus:ring-[#00ff7f] border-[#3f3f46] rounded" />
                      <span className="text-sm text-gray-300">PIX</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00ff7f] focus:ring-[#00ff7f] border-[#3f3f46] rounded" />
                      <span className="text-sm text-gray-300">Transferência Bancária</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-[#00ff7f] focus:ring-[#00ff7f] border-[#3f3f46] rounded" />
                      <span className="text-sm text-gray-300">PayPal</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0c] rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-white">Aprovação Automática de Saques</p>
                    <p className="text-xs text-gray-400">Saques abaixo de R$ 1.000 são aprovados automaticamente</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00ff7f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#121214] after:border-[#3f3f46] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff7f]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Settings */}
        {activeTab === "api" && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Configurações de API</h3>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Key className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white mb-1">Chave de API Principal</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-[#121214] border border-[#3f3f46] rounded px-3 py-2 text-xs font-mono text-gray-300">
                          sk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
                        </code>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-semibold transition-all">
                          Copiar
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs font-semibold transition-all">
                          Revogar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Limite de Requisições (por minuto)</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full bg-[#121214] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff7f]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0c] rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-white">Webhooks Ativos</p>
                    <p className="text-xs text-gray-400">Receber notificações de eventos via webhook</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00ff7f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#121214] after:border-[#3f3f46] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff7f]"></div>
                  </label>
                </div>

                <button className="bg-[#00ff7f] hover:bg-[#00cc66] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Gerar Nova Chave de API
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-300 px-6 py-3 rounded-lg font-semibold transition-all">
          Cancelar
        </button>
        <button className="bg-[#00ff7f] hover:bg-[#00cc66] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg">
          <Save className="w-5 h-5" />
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
