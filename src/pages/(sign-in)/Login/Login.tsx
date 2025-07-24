import { useNavigate, useSearchParams } from "react-router-dom";
import { useLayout } from "@/context/UseLayout";
import { useState } from "react";
import "./style.scss";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useLayout();
  const [search] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  function handleLogin() {
    const redirect = search.get("redirect") || "/";
    login("logado");
    navigate(redirect, { replace: true });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleLogin();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center">
      <div className="container">
        <div className="flex items-center justify-center">
          <div className="w-1/2">
            {/* Container principal com animação */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-fade-in login-container">
              {/* Logo/Header */}
              <div className="text-center mb-8 animate-slide-down">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? "Bem-vindo de volta" : "Criar conta"}
                </h2>
                <p className="text-gray-300">
                  {isLogin ? "Entre com suas credenciais" : "Preencha os dados abaixo"}
                </p>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
                {!isLogin && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                    placeholder="Digite seu email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                      placeholder="Confirme sua senha"
                      required
                    />
                  </div>
                )}



                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl submit-button"
                >
                  {isLogin ? "Entrar" : "Criar conta"}
                </button>
              </form>

              {/* Divisor */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-sm text-gray-400">ou</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>



              {/* Toggle entre login e cadastro */}
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 cursor-pointer text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    {isLogin ? "Criar conta" : "Fazer login"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
