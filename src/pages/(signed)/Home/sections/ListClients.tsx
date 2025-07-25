import { useState, useEffect } from "react";
import { useLayout } from "@/context/UseLayout";
import { useNavigate } from "react-router-dom";
import Services from "@/services/services";
import useSWR from "swr";
import { fetcher } from "@/services/api";
import DialogConfirm from "@/components/DialogConfirm/DialogConfirm";

interface Cliente {
    id: number;
    nome: string;
    email: string;
}

interface ListClientsProps {
    onMutateReady: boolean;
    onOpenModal: (e: boolean) => void;
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Componente Skeleton
const TableSkeleton = () => (
    <div className="space-y-7">

        {[...Array(4)].map((_, index) => (
            <div key={index} className="flex gap-x-2 sm:gap-x-5">
                <div className="h-7 animate-pulse bg-gray-100 rounded-lg w-1/3 "></div>
                <div className="h-7 animate-pulse bg-gray-100 rounded-lg w-1/3 "></div>
                <div className="h-7 animate-pulse bg-gray-100 rounded-lg  w-1/3 "></div>


            </div>
        ))}
    </div>
);

export default function ListClients({ onMutateReady, onOpenModal }: ListClientsProps) {
    const { user, logout } = useLayout();
    const navigate = useNavigate();


    const [animandoId, setAnimandoId] = useState<number | null>(null);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [clienteToDelete, setClienteToDelete] = useState<any>(null);
    const [dialogFeedback, setDialogFeedback] = useState<string | null>(null);

    const { data, isLoading, error, mutate } = useSWR<any, any>(
        Services?.listClients(),
        fetcher,
        {
            suspense: true,
            revalidateOnFocus: true,
        }
    );

    console.log(user);

    // Passar o mutate para o componente pai quando estiver disponível
    useEffect(() => {


        if (onMutateReady) {

            mutate()
        }
    }, [onMutateReady]);





    function confirmarExclusao(cliente: any) {
        setClienteToDelete(cliente);
        setShowDeleteDialog(true);
    }

    async function executarExclusao() {
        if (!clienteToDelete) return;

        setAnimandoId(clienteToDelete.id);
        setDialogFeedback("Excluindo...");
        // Não fechar o dialog imediatamente

        try {
            // Chamada para a API de exclusão
            await Services.deletClients(clienteToDelete.id);

            // Atualizar a lista de clientes após exclusão bem-sucedida
            mutate();

            setDialogFeedback("Cliente excluído!");
            await sleep(1500); // Mostrar sucesso por mais tempo

            // Fechar dialog após mostrar sucesso
            setShowDeleteDialog(false);

            setClienteToDelete(null);
            setDialogFeedback(null);


        } catch (error) {
            setDialogFeedback("Erro ao excluir cliente");
            await sleep(2000); // Mostrar erro por mais tempo

            // Fechar dialog após mostrar erro
            setShowDeleteDialog(false);

            setClienteToDelete(null);
            setDialogFeedback(null);

        } finally {
            setAnimandoId(null);
        }
    }

    function cancelarExclusao() {
        setShowDeleteDialog(false);
        // Limpar o cliente após fechar o dialog para evitar undefined na mensagem
        setTimeout(() => {
            setClienteToDelete(null);
        }, 300); // Aguarda a animação de fechamento
    }

    function handleLogout() {
        logout();
        navigate("/login");
    }

    const ListMB: any = () => {
        return (
            <div className="md:hidden p-4 space-y-4">
                {data?.data?.clients.map((cliente: any) => (
                    <div
                        key={cliente.id}
                        className={`bg-white border border-green-200 rounded-lg p-4 shadow-sm transition-all duration-500 ${animandoId === cliente.id ? "bg-green-50 scale-[0.98] opacity-60" : "hover:bg-green-50"
                            } animate-fade-in-up`}
                        style={{ transition: "all 0.4s cubic-bezier(.4,2,.6,1)" }}
                    >
                        <div className="flex flex-col space-y-3">
                            <div>
                                <div className="text-sm font-medium text-green-600">Nome</div>
                                <div className="text-base font-semibold text-green-900">{cliente.name}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-green-600">Email</div>
                                <div className="text-base text-green-700">{cliente.email}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-green-600">Telefone</div>
                                <div className="text-base text-green-700">{cliente.phone || "Não informado"}</div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all duration-150 text-sm font-medium"
                                // onClick={() => abrirModalEditar(cliente)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all duration-150 text-sm font-medium"
                                    onClick={() => confirmarExclusao(cliente)}
                                    disabled={animandoId === cliente.id}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {data?.data?.clients.length === 0 && (
                    <div className="text-center py-8 text-gray-400 animate-fade-in">
                        Nenhum cliente cadastrado.
                    </div>
                )}
            </div>
        )
    }

    const ListDT: any = () => {
        return (
            <div className="hidden md:block">
                <table className="w-full rounded-xl">
                    <thead>
                        <tr className="bg-green-100 text-green-800">
                            <th className="px-4 py-3 text-left">Nome</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Telefone</th>
                            <th className="px-4 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.clients.map((cliente: any, index: number) => (
                            <tr
                                key={cliente.id}
                                className={`${index + 1 == data?.data?.clients?.length ? "" : "border-b"}  transition-all duration-500 ${animandoId === cliente.id ? "bg-green-50 scale-[0.98] opacity-60" : "hover:bg-green-50"
                                    } animate-fade-in-up`}
                                style={{ transition: "all 0.4s cubic-bezier(.4,2,.6,1)" }}
                            >
                                <td className="px-4 py-3 font-medium text-green-900">{cliente.name}</td>
                                <td className="px-4 py-3 text-green-700">{cliente.email}</td>
                                <td className="px-4 py-3 text-green-700">{cliente.phone || "Não informado"}</td>
                                <td className="px-4 py-3 flex gap-2 justify-center">
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all duration-150"
                                    // onClick={() => abrirModalEditar(cliente)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all duration-150"
                                        onClick={() => confirmarExclusao(cliente)}
                                        disabled={animandoId === cliente.id}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data?.data?.clients.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-400 animate-fade-in">
                                    Nenhum cliente cadastrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="list-clients bg-gradient-to-br from-green-50 to-green-200 min-h-screen">
            <div className="container flex flex-col flex-1 min-h-screen ">
                <div className="flex  justify-between items-center py-8 px-2 animate-fade-in">
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
                        className=" px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow hover:scale-105 hover:from-red-500 hover:to-red-700 transition-all duration-200 font-semibold flex items-center gap-2"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5c-1.1 0-2 .9-2 2v6h2V5h14v14H5v-4H3v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" /></svg>
                        Sair
                    </button>
                </div>
                <div className="flex-1 p-5 max-w-3xl mx-auto w-full">
                    <h1 className="text-3xl font-bold my-10 text-green-800 flex items-center gap-2 animate-fade-in">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#22c55e" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 17.93V20a1 1 0 1 1-2 0v-.07A8.001 8.001 0 0 1 4.07 13H4a1 1 0 1 1 0-2h.07A8.001 8.001 0 0 1 11 4.07V4a1 1 0 1 1 2 0v.07A8.001 8.001 0 0 1 13 19.93Z" /></svg>
                        <span>Clientes</span>
                    </h1>
                    <button
                        className="mb-6 px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-200 font-semibold"
                        onClick={() => onOpenModal(true)}
                    >
                        + Novo Cliente
                    </button>

                    <div className="relative  rounded-xl shadow-lg bg-white animate-fade-in-up">
                        {isLoading ? (
                            <div className="p-6">
                                <TableSkeleton />
                            </div>
                        ) : (
                            <>
                                {/* Versão Desktop - Tabela */}
                                {ListDT()}

                                {/* Versão Mobile - Cards */}
                                {ListMB()}
                            </>
                        )}
                    </div>



                </div>
            </div>
            <DialogConfirm
                isOpen={showDeleteDialog}
                onCancel={cancelarExclusao}
                onConfirm={executarExclusao}
                title="Confirmar Exclusão"
                message={`Tem certeza que deseja excluir o cliente "${clienteToDelete?.name || 'selecionado'}"? Esta ação não pode ser desfeita.`}
                confirmText="Excluir"
                cancelText="Cancelar"
                type="danger"
                feedback={dialogFeedback}
                loading={!!dialogFeedback}
            />
        </div>
    );
}
