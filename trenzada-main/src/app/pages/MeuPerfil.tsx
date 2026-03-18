import { useState } from "react";
import {
  User,
  Trophy,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Building,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Edit,
  Save,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import { getSession } from "../auth/auth";

export function MeuPerfil() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPix, setIsEditingPix] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj">("cpf");

  const session = getSession();
  const displayName = session?.name?.trim() || "Usuário";
  const displayEmail = session?.email?.trim() || "usuario@exemplo.com";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

  // Mock data
  const profileData = {
    name: displayName,
    email: displayEmail,
    phone: "+55 (11) 98765-4321",
    cpf: "123.456.789-00",
    cnpj: "12.345.678/0001-90",
    birthDate: "15/03/1995",
    address: "Rua das Flores, 123 - São Paulo, SP",
    memberSince: "Janeiro 2024",
    status: "AFFILIATE PRO",
    ranking: "#47",
    totalEarnings: "R$ 127.450,00",
    conversion: "8.5%",
  };

  const pixData = {
    pixKey: displayEmail,
  };

  const activities = [
    {
      id: 1,
      type: "sale",
      description: "Venda realizada - Curso de Marketing Digital",
      value: "R$ 398,00",
      date: "23/02/2026 às 14:35",
      status: "success",
    },
    {
      id: 2,
      type: "withdrawal",
      description: "Saque solicitado",
      value: "R$ 5.000,00",
      date: "22/02/2026 às 09:12",
      status: "pending",
    },
    {
      id: 3,
      type: "sale",
      description: "Venda realizada - Kit Fitness Premium",
      value: "R$ 209,65",
      date: "21/02/2026 às 18:47",
      status: "success",
    },
    {
      id: 4,
      type: "update",
      description: "Dados bancários atualizados",
      value: "",
      date: "20/02/2026 às 11:22",
      status: "info",
    },
    {
      id: 5,
      type: "sale",
      description: "Venda realizada - Mentoria em Investimentos",
      value: "R$ 673,65",
      date: "19/02/2026 às 16:05",
      status: "success",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <TrendingUp className="w-4 h-4 text-white" />;
      case "withdrawal":
        return <CreditCard className="w-4 h-4 text-yellow-500" />;
      case "update":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-[#121214]/10 text-white border border-white/30 rounded">
            Concluído
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded">
            Pendente
          </span>
        );
      case "info":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded">
            Informação
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
          <p className="text-gray-400 mt-1">
            Gerencie suas informações pessoais e configurações
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] p-6">
            <div className="flex flex-col items-center text-center">
              {/* Profile Photo */}
              <div className="relative mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-[#ffffff] to-[#ffffff] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {initials || "U"}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#ffffff] rounded-full flex items-center justify-center hover:bg-[#ffffff] transition-colors shadow-lg">
                  <Edit className="w-5 h-5 text-white" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">
                {profileData.name}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {profileData.email}
              </p>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffffff]/10 border border-[#ffffff]/30 rounded-lg mb-4">
                <CheckCircle className="w-4 h-4 text-[#ffffff]" />
                <span className="text-[#ffffff] font-semibold">
                  {profileData.status}
                </span>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Membro desde {profileData.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bg-[#050505] border-2 border-[#ffffff]/30 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#ffffff]" />
              Ranking Atual
            </h3>

            <div className="space-y-4">
              <div className="text-center p-4 bg-[#000000] rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Posição</p>
                <p className="text-4xl font-bold text-[#ffffff]">
                  {profileData.ranking}
                </p>
                <p className="text-xs text-gray-500 mt-1">de 10.000 afiliados</p>
              </div>

              <div className="p-4 bg-[#000000] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Ganhos Totais</span>
                  <span className="text-lg font-bold text-white">
                    {profileData.totalEarnings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Taxa de Conversão</span>
                  <span className="text-lg font-bold text-[#ffffff]">
                    {profileData.conversion}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Data */}
          <div className="bg-[#050505] border-2 border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-[#ffffff]" />
                Dados Pessoais
              </h3>
              <button
                onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                {isEditingPersonal ? (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Editar
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  defaultValue={profileData.name}
                  disabled={!isEditingPersonal}
                  className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={profileData.email}
                  disabled={!isEditingPersonal}
                  className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  defaultValue={profileData.phone}
                  disabled={!isEditingPersonal}
                  className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
                />
              </div>

              {/* Document Type Selector */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-3">
                  Tipo de Documento
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setDocumentType("cpf")}
                    disabled={!isEditingPersonal}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${
                      documentType === "cpf"
                        ? "bg-[#ffffff] text-white"
                        : "bg-[#000000] text-gray-400 border border-gray-700 hover:border-[#ffffff]"
                    }`}
                  >
                    CPF
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocumentType("cnpj")}
                    disabled={!isEditingPersonal}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${
                      documentType === "cnpj"
                        ? "bg-[#ffffff] text-white"
                        : "bg-[#000000] text-gray-400 border border-gray-700 hover:border-[#ffffff]"
                    }`}
                  >
                    CNPJ
                  </button>
                </div>
              </div>

              {documentType === "cpf" ? (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">CPF</label>
                  <input
                    type="text"
                    defaultValue={profileData.cpf}
                    disabled={!isEditingPersonal}
                    className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">CNPJ</label>
                  <input
                    type="text"
                    defaultValue={profileData.cnpj}
                    disabled={!isEditingPersonal}
                    className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="text"
                  defaultValue={profileData.birthDate}
                  disabled={!isEditingPersonal}
                  className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  defaultValue={profileData.address}
                  disabled={!isEditingPersonal}
                  className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
                />
              </div>
            </div>
          </div>

          {/* Bank Data */}
          <div className="bg-[#050505] border-2 border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#ffffff]" />
                Chave PIX para Pagamentos
              </h3>
              <button
                onClick={() => setIsEditingPix(!isEditingPix)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                {isEditingPix ? (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Editar
                  </>
                )}
              </button>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Chave PIX
              </label>
              <input
                type="text"
                defaultValue={pixData.pixKey}
                disabled={!isEditingPix}
                placeholder="Email, CPF, CNPJ ou telefone"
                className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#ffffff]"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Esta será a chave PIX usada para receber seus pagamentos e comissões
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#050505] border-2 border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#ffffff]" />
              Segurança
            </h3>

            <div className="space-y-4">
              {/* Change Password */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 pr-12 text-white focus:outline-none focus:border-[#ffffff]"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme sua nova senha"
                  className="w-full bg-[#000000] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ffffff]"
                />
              </div>

              <button className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                Alterar Senha
              </button>

              <div className="border-t border-gray-800 pt-4 mt-4">
                {/* 2FA */}
                <div className="flex items-center justify-between p-4 bg-[#000000] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-[#ffffff]" />
                    <div>
                      <p className="text-white font-medium">
                        Autenticação em Dois Fatores (2FA)
                      </p>
                      <p className="text-sm text-gray-400">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#121214] after:border-[#3f3f46] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffffff]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-[#050505] border-2 border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#ffffff]" />
              Histórico de Atividades
            </h3>

            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-[#000000] rounded-lg hover:bg-[#000000]/70 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-white font-medium">
                        {activity.description}
                      </p>
                      {activity.value && (
                        <span className="text-[#ffffff] font-bold whitespace-nowrap">
                          {activity.value}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-400">{activity.date}</p>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
              Ver Histórico Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
