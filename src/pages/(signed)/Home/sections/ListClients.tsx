import { useState } from "react";
import { useLayout } from "@/context/UseLayout";
import { useNavigate } from "react-router-dom";

interface Cliente {
    id: number;
    nome: string;
    email: string;
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ListClients() {
    const { user, logout } = useLayout();
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([
        { id: 1, nome: "João Silva", email: "joao@email.com" },
        { id: 2, nome: "Maria Souza", email: "maria@email.com" },
    ]);
    const [modalAberto, setModalAberto] = useState(false);
    const [editando, setEditando] = useState<Cliente | null>(null);
    const [form, setForm] = useState({ nome: "", email: "" });
    const [animandoId, setAnimandoId] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    function abrirModalNovo() {
        setEditando(null);
        setForm({ nome: "", email: "" });
        setModalAberto(true);
    }

    function abrirModalEditar(cliente: Cliente) {
        setEditando(cliente);
        setForm({ nome: cliente.nome, email: cliente.email });
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
        setForm({ nome: "", email: "" });
        setEditando(null);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function salvarCliente(e: React.FormEvent) {
        e.preventDefault();
        if (editando) {
            setAnimandoId(editando.id);
            setClientes((prev) =>
                prev.map((c) =>
                    c.id === editando.id ? { ...c, nome: form.nome, email: form.email } : c
                )
            );
            setFeedback("Cliente atualizado com sucesso!");
            await sleep(600);
            setAnimandoId(null);
        } else {
            const novoId = Date.now();
            setAnimandoId(novoId);
            setClientes((prev) => [
                ...prev,
                { id: novoId, nome: form.nome, email: form.email },
            ]);
            setFeedback("Cliente criado com sucesso!");
            await sleep(600);
            setAnimandoId(null);
        }
        fecharModal();
        setTimeout(() => setFeedback(null), 1500);
    }

    async function excluirCliente(id: number) {
        setAnimandoId(id);
        setFeedback("Excluindo...");
        await sleep(400);
        setClientes((prev) => prev.filter((c) => c.id !== id));
        setFeedback("Cliente excluído!");
        await sleep(600);
        setAnimandoId(null);
        setFeedback(null);
    }

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="list-clients bg-gradient-to-br from-green-50 to-green-200 min-h-screen">
            <div className="container flex flex-col flex-1 min-h-screen ">
                <div className="flex flex-col md:flex-row justify-between items-center py-8 px-2 animate-fade-in">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 shadow">
                            {(user && user.name?.[0]?.toUpperCase()) || "U"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-green-900 font-semibold text-lg">{user?.name || "Usuário"}</span>
                            <span className="text-green-600 text-sm">Bem-vindo!</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-6 md:mt-0 px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow hover:scale-105 hover:from-red-500 hover:to-red-700 transition-all duration-200 font-semibold flex items-center gap-2"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5c-1.1 0-2 .9-2 2v6h2V5h14v14H5v-4H3v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" /></svg>
                        Sair
                    </button>
                </div>
                <div className="flex-1 p-5 max-w-3xl mx-auto w-full">
                    <h1 className="text-3xl font-bold my-10 text-green-800 flex items-center gap-2 animate-fade-in">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#22c55e" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 17.93V20a1 1 0 1 1-2 0v-.07A8.001 8.001 0 0 1 4.07 13H4a1 1 0 1 1 0-2h.07A8.001 8.001 0 0 1 11 4.07V4a1 1 0 1 1 2 0v.07A8.001 8.001 0 0 1 19.93 11H20a1 1 0 1 1 0 2h-.07A8.001 8.001 0 0 1 13 19.93Z" /></svg>
                        <span>Clientes</span>
                    </h1>
                    <button
                        className="mb-6 px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-200 font-semibold"
                        onClick={abrirModalNovo}
                    >
                        + Novo Cliente
                    </button>
                    <div className="relative  rounded-xl shadow-lg bg-white animate-fade-in-up">
                        <table className="w-full rounded-xl">
                            <thead>
                                <tr className="bg-green-100 text-green-800">
                                    <th className="px-4 py-3 text-left">Nome</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente) => (
                                    <tr
                                        key={cliente.id}
                                        className={`border-b transition-all duration-500 ${animandoId === cliente.id ? "bg-green-50 scale-[0.98] opacity-60" : "hover:bg-green-50"
                                            } animate-fade-in-up`}
                                        style={{ transition: "all 0.4s cubic-bezier(.4,2,.6,1)" }}
                                    >
                                        <td className="px-4 py-3 font-medium text-green-900">{cliente.nome}</td>
                                        <td className="px-4 py-3 text-green-700">{cliente.email}</td>
                                        <td className="px-4 py-3 flex gap-2 justify-center">
                                            <button
                                                className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all duration-150"
                                                onClick={() => abrirModalEditar(cliente)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all duration-150"
                                                onClick={() => excluirCliente(cliente.id)}
                                                disabled={animandoId === cliente.id}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {clientes.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-8 text-gray-400 animate-fade-in">
                                            Nenhum cliente cadastrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Feedback visual */}
                    {feedback && (
                        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
                            {feedback}
                        </div>
                    )}
                    {/* Modal animado */}
                    {modalAberto && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in">
                            <div className="bg-white p-8 rounded-2xl shadow-2xl min-w-[320px] w-full max-w-sm animate-slide-in-up relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
                                    onClick={fecharModal}
                                    aria-label="Fechar"
                                    type="button"
                                >
                                    ×
                                </button>
                                <h2 className="text-2xl mb-6 text-green-700 font-bold text-center">
                                    {editando ? "Editar Cliente" : "Novo Cliente"}
                                </h2>
                                <form onSubmit={salvarCliente} className="flex flex-col gap-4">
                                    <input
                                        name="nome"
                                        placeholder="Nome"
                                        value={form.nome}
                                        onChange={handleChange}
                                        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                        required
                                    />
                                    <input
                                        name="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                        required
                                        type="email"
                                    />
                                    <div className="flex gap-2 mt-4 justify-center">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-200 font-semibold"
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            type="button"
                                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 hover:scale-105 transition-all duration-200 font-semibold"
                                            onClick={fecharModal}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
