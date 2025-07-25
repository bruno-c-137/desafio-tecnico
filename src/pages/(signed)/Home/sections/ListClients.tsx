import { useState, useEffect } from "react";
import { useLayout } from "@/context/UseLayout";
import { useNavigate } from "react-router-dom";
import Services from "@/services/services";
import useSWR from "swr";
import { fetcher } from "@/services/api";
import DialogConfirm from "@/components/DialogConfirm/DialogConfirm";
import { getCurrentPageClients, getPageNumbers } from "@/helpers";



interface ListClientsProps {
    onMutateReady: boolean;
    onOpenModal: (e: boolean) => void;
    onOpenEditModal: (cliente: any) => void;
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

export default function ListClients({ onMutateReady, onOpenModal, onOpenEditModal }: ListClientsProps) {
    const { user, logout } = useLayout();
    const navigate = useNavigate();
    const [animandoId, setAnimandoId] = useState<number | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [clienteToDelete, setClienteToDelete] = useState<any>(null);
    const [dialogFeedback, setDialogFeedback] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, isLoading, error, mutate } = useSWR<any, any>(
        Services?.listClients(),
        fetcher,
        {
            suspense: true,
            revalidateOnFocus: true,
        }
    );

    // Passar o mutate para o componente pai quando estiver disponível
    useEffect(() => {
        if (onMutateReady) {
            mutate()
        }
    }, [onMutateReady]);

    // Ajustar página quando necessário após exclusões
    useEffect(() => {
        if (data?.data?.clients) {
            const totalPages = Math.ceil(data.data.clients.length / itemsPerPage);

            // Se a página atual é maior que o total de páginas disponíveis, vai para a última página
            if (currentPage > totalPages && totalPages > 0) {
                setCurrentPage(totalPages);
            }
            // Se não há clientes, volta para página 1
            else if (data.data.clients.length === 0) {
                setCurrentPage(1);
            }
        }
    }, [data?.data?.clients, currentPage, itemsPerPage]);


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


    // Calcular total de páginas
    const totalPages = data?.data?.clients ? Math.ceil(data.data.clients.length / itemsPerPage) : 0;

    // Componente de Paginação
    const Pagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-center gap-2 my-8 animate-fade-in-up">
                {/* Botão Anterior */}
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 text-green-700 bg-white border border-green-200 rounded-lg hover:bg-green-50 hover:border-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                    Anterior
                </button>

                {/* Números das páginas */}
                <div className="flex items-center gap-1">
                    {getPageNumbers(currentPage, totalPages).map((page: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            disabled={page === '...'}
                            className={`w-10 cursor-pointer h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200 ${page === currentPage
                                ? 'bg-green-600 text-white shadow-lg scale-105'
                                : page === '...'
                                    ? 'text-green-400 cursor-default'
                                    : 'text-green-700 bg-white border border-green-200 hover:bg-green-50 hover:border-green-300'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Botão Próximo */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-green-700 bg-white border border-green-200 rounded-lg hover:bg-green-50 hover:border-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                    Próximo
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                    </svg>
                </button>
            </div>
        );
    };

    const ListMB: any = () => {
        const currentClients = getCurrentPageClients(data, currentPage, itemsPerPage);

        return (
            <div className="md:hidden p-4 space-y-4">
                {currentClients.map((cliente: any) => (
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
                            <div>
                                <div className="text-sm font-medium text-green-600">Empresa</div>
                                <div className="text-base text-green-700">{cliente.company || "Não informado"}</div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all duration-150 text-sm font-medium"
                                    onClick={() => onOpenEditModal(cliente)}
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
                {currentClients.length === 0 && (
                    <div className="text-center py-8 text-gray-400 animate-fade-in">
                        Nenhum cliente cadastrado.
                    </div>
                )}
            </div>
        )
    }

    const ListDT: any = () => {
        const currentClients = getCurrentPageClients(data, currentPage, itemsPerPage);

        return (
            <div className="hidden md:block">
                <table className="w-full rounded-xl">
                    <thead>
                        <tr className="bg-green-100 text-green-800">
                            <th className="px-4 py-3 text-left">Nome</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Telefone</th>
                            <th className="px-4 py-3 text-left">Empresa</th>
                            <th className="px-4 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClients.map((cliente: any, index: number) => (
                            <tr
                                key={cliente.id}
                                className={`${index + 1 == currentClients?.length ? "" : "border-b"}  transition-all duration-500 ${animandoId === cliente.id ? "bg-green-50 scale-[0.98] opacity-60" : "hover:bg-green-50"
                                    } animate-fade-in-up`}
                                style={{ transition: "all 0.4s cubic-bezier(.4,2,.6,1)" }}
                            >
                                <td className="px-4 py-3 font-medium text-green-900">{cliente.name}</td>
                                <td className="px-4 py-3 text-green-700">{cliente.email}</td>
                                <td className="px-4 py-3 text-green-700">{cliente.phone || "Não informado"}</td>
                                <td className="px-4 py-3 text-green-700">{cliente.company || "Não informado"}</td>
                                <td className="px-4 py-3 flex gap-2 justify-center">
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all duration-150"
                                        onClick={() => onOpenEditModal(cliente)}
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
                        {currentClients.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-400 animate-fade-in">
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
                <div className="flex-1 md:px-25 mx-auto w-full">
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

                    {/* Exibição de erro do SWR */}
                    {error && (
                        <div className="mb-6 flex justify-center">
                            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg bg-red-50 border-2 border-red-200 animate-fade-in-up">
                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                                    </svg>
                                </div>
                                <span className="text-red-700 font-medium">
                                    Erro ao carregar clientes: {error?.message || 'Erro desconhecido'}
                                </span>
                                <button
                                    onClick={() => mutate()}
                                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                                >
                                    Tentar Novamente
                                </button>
                            </div>
                        </div>
                    )}

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

                    {/* Paginação */}
                    {Pagination()}

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
