import { useMemo, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { loginUser, registerUser } from "../auth/auth";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailRepeat, setEmailRepeat] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);
  const normalizedEmailRepeat = useMemo(
    () => emailRepeat.trim().toLowerCase(),
    [emailRepeat],
  );

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (normalizedEmail && normalizedEmailRepeat && normalizedEmail !== normalizedEmailRepeat) {
      setError("Os emails não conferem.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({ name, email: normalizedEmail, password });
      await loginUser({ email: normalizedEmail, password });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível cadastrar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-7 h-7 bg-[#0a0a0a] rounded transform rotate-45"></div>
            </div>
            <h1 className="text-white text-3xl font-bold">ScaleHub</h1>
          </div>
          <p className="text-gray-400 text-sm uppercase tracking-wider">
            Portal de Alta Performance
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8 shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                Informar nome
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Repeat Email */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                Repetir email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={emailRepeat}
                  onChange={(e) => setEmailRepeat(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                Inserir senha
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Carregando...</span>
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
              Já possui acesso?
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <Link to="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">
                Termos de uso
              </Link>
              <span className="text-gray-700">|</span>
              <Link to="/login" className="text-white hover:underline">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

