import { useNavigate, useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLayout } from "@/context/UseLayout";
import { useState } from "react";
import "./style.scss";
import Services from "@/services/services";
import DialogError from "@/components/DialogError/DialogError";

type Inputs = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useLayout();
  const [search] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setSending(true);

    try {
      if (isLogin) {
        // Login
        const body: any = {
          email: data?.email,
          password: data?.password,
        };

        const resp = await Services.login(body);
        if (resp) {
          Services.setStorageToken(resp?.data);
          console.log('Login realizado com sucesso');

          const redirect = search.get("redirect") || "/";
          login("logado");
          navigate(redirect, { replace: true });
        } else {
          throw new Error("");
        }
      } else {
        // Cadastro
        const body: any = {
          name: data?.name,
          email: data?.email,
          password: data?.password,
          confirmPassword: data?.confirmPassword,
        };

        const resp = await Services.cadastro(body);
        if (resp) {
          console.log('Cadastro realizado com sucesso');
          reset();
          setIsLogin(true); // Volta para o formulário de login
        } else {
          throw new Error("");
        }
      }
    } catch (e: any) {
      setError([
        e?.response?.data?.message || "Algo deu errado. Tente novamente.",
      ]);
      setIsOpen(true);
    } finally {
      setSending(false);
    }
  };



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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-up">
                {!isLogin && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Nome é obrigatório"
                      })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                      placeholder="Digite seu nome"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-sm mt-1">{errors.name.message}</span>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                      }
                    })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                    placeholder="Digite seu email"
                  />
                  {errors.email && (
                    <span className="text-red-400 text-sm mt-1">{errors.email.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Senha é obrigatória",
                      minLength: {
                        value: 6,
                        message: "Senha deve ter pelo menos 6 caracteres"
                      }
                    })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                    placeholder="Digite sua senha"
                  />
                  {errors.password && (
                    <span className="text-red-400 text-sm mt-1">{errors.password.message}</span>
                  )}
                </div>

                {!isLogin && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Confirmação de senha é obrigatória",
                        validate: (value) => {
                          const password = watch("password");
                          return value === password || "Senhas não coincidem";
                        }
                      })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-field"
                      placeholder="Confirme sua senha"
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</span>
                    )}
                  </div>
                )}



                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl submit-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isLogin ? "Entrando..." : "Criando conta..."}
                    </span>
                  ) : (
                    isLogin ? "Entrar" : "Criar conta"
                  )}
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
      <DialogError
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        errors={error}
      />

    </div>
  );
}

