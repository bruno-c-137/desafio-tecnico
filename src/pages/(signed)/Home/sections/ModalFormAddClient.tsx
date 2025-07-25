import { useState } from "react";
import { useForm } from "react-hook-form";
import Services from "@/services/services";

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
}

interface ModalFormAddClientProps {
    onSuccess: (e: boolean) => void;
    onClose: (e: boolean) => void;
}

export default function ModalFormAddClient({ onSuccess, onClose }: ModalFormAddClientProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
        onSuccess(false);

        try {
            const response = await Services.addClients(data);

            if (response) {
                setSuccess(true);
                reset();

                // Chamar mutate para atualizar a lista de clientes

                onSuccess(true);


                // Mostrar sucesso por 2 segundos e depois limpar
                // setTimeout(() => {
                //     setSuccess(false);
                // }, 2000);
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erro ao adicionar cliente");
        } finally {

            setLoading(false);
        }
    };



    const handleAddAnother = () => {
        setSuccess(false);
        setError(null);
    };

    if (success) {
        return (
            <div className="text-center py-8 animate-feedback">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Cliente adicionado com sucesso!</h3>
                <p className="text-green-600 mb-6">O cliente foi cadastrado no sistema.</p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={handleAddAnother}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                        Adicionar Outro Cliente
                    </button>
                    <button
                        onClick={() => onClose(false)}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-2">Adicionar Novo Cliente</h2>
                <p className="text-green-600">Preencha os dados do cliente abaixo</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Nome */}
                <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                        Nome Completo *
                    </label>
                    <input
                        {...register("name", {
                            required: "Nome é obrigatório",
                            minLength: {
                                value: 2,
                                message: "Nome deve ter pelo menos 2 caracteres"
                            }
                        })}
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all ${errors.name ? "border-red-300 focus:ring-red-400" : "border-green-200"
                            }`}
                        placeholder="Digite o nome completo"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                        Email *
                    </label>
                    <input
                        {...register("email", {
                            required: "Email é obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all ${errors.email ? "border-red-300 focus:ring-red-400" : "border-green-200"
                            }`}
                        placeholder="Digite o email"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                    )}
                </div>

                {/* Telefone e Empresa lado a lado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Telefone */}
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                            Telefone *
                        </label>
                        <input
                            {...register("phone", {
                                required: "Telefone é obrigatório",
                                pattern: {
                                    value: /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/,
                                    message: "Telefone inválido (ex: (11) 99999-9999)"
                                }
                            })}
                            type="tel"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all ${errors.phone ? "border-red-300 focus:ring-red-400" : "border-green-200"
                                }`}
                            placeholder="(11) 99999-9999"
                        />
                        {errors.phone && (
                            <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
                        )}
                    </div>

                    {/* Empresa */}
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                            Empresa *
                        </label>
                        <input
                            {...register("company", {
                                required: "Empresa é obrigatória",
                                minLength: {
                                    value: 2,
                                    message: "Empresa deve ter pelo menos 2 caracteres"
                                }
                            })}
                            type="text"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all ${errors.company ? "border-red-300 focus:ring-red-400" : "border-green-200"
                                }`}
                            placeholder="Digite o nome da empresa"
                        />
                        {errors.company && (
                            <span className="text-red-500 text-sm mt-1">{errors.company.message}</span>
                        )}
                    </div>
                </div>

                {/* Erro geral */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex">
                            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-red-700">{error}</span>
                        </div>
                    </div>
                )}

                {/* Botões */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adicionando...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Adicionar Cliente
                            </>
                        )}
                    </button>

                </div>
            </form>
        </div>
    );
}