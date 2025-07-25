import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: 'danger' | 'warning' | 'info';
    feedback?: string | null;
    loading?: boolean;
}

export default function DialogConfirm({
    isOpen,
    title = "Confirmar Ação",
    message = "Tem certeza que deseja continuar?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    type = 'warning',
    feedback,
    loading = false
}: ModalProps) {

    const getIcon = () => {
        switch (type) {
            case 'danger':
                return (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#ef4444" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#f59e0b" d="M12 2L2 20h20L12 2zm0 3.17L19.83 18H4.17L12 5.17zM11 15h2v2h-2v-2zm0-6h2v4h-2V9z" />
                    </svg>
                );
            case 'info':
                return (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#3b82f6" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'danger':
                return {
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    confirmBg: 'bg-red-500 hover:bg-red-600',
                    titleColor: 'text-red-600'
                };
            case 'warning':
                return {
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    confirmBg: 'bg-yellow-500 hover:bg-yellow-600',
                    titleColor: 'text-yellow-600'
                };
            case 'info':
                return {
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    confirmBg: 'bg-blue-500 hover:bg-blue-600',
                    titleColor: 'text-blue-600'
                };
            default:
                return {
                    iconBg: 'bg-gray-100',
                    iconColor: 'text-gray-600',
                    confirmBg: 'bg-gray-500 hover:bg-gray-600',
                    titleColor: 'text-gray-600'
                };
        }
    };

    const colors = getColors();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[99999] dialog-custom"
                onClose={onCancel}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="relative">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-6 text-left align-middle shadow-xl transition-all z-10 relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center`}>
                                            <div className={colors.iconColor}>
                                                {getIcon()}
                                            </div>
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className={`text-xl font-semibold leading-6 ${colors.titleColor}`}
                                        >
                                            {title}
                                        </Dialog.Title>
                                    </div>

                                    <div className="my-4">
                                        <p className="text-base text-gray-600">
                                            {message}
                                        </p>
                                    </div>

                                    {/* Feedback de ações */}
                                    {feedback && (
                                        <div className="my-4">
                                            <div className={`p-4 rounded-xl border-2 ${
                                                feedback.includes("Excluindo") 
                                                    ? "bg-blue-50 border-blue-200" 
                                                    : feedback.includes("excluído") 
                                                    ? "bg-green-50 border-green-200" 
                                                    : "bg-red-50 border-red-200"
                                            }`}>
                                                <div className="flex items-center justify-center gap-3">
                                                    {feedback.includes("Excluindo") ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                            <span className="text-blue-700 font-medium">{feedback}</span>
                                                        </>
                                                    ) : feedback.includes("excluído") ? (
                                                        <>
                                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                                                                    <path fill="#fff" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                                                </svg>
                                                            </div>
                                                            <span className="text-green-700 font-medium">{feedback}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                                                                    <path fill="#fff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                                                                </svg>
                                                            </div>
                                                            <span className="text-red-700 font-medium">{feedback}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6 flex gap-3 justify-end">
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-gray-600 bg-gray-100 rounded-lg transition-colors duration-200 font-medium ${
                                                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                                            }`}
                                            onClick={onCancel}
                                            disabled={loading}
                                        >
                                            {cancelText}
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 font-medium ${
                                                loading ? 'opacity-50 cursor-not-allowed' : colors.confirmBg
                                            }`}
                                            onClick={onConfirm}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Processando...
                                                </div>
                                            ) : (
                                                confirmText
                                            )}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
