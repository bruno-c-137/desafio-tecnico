
import { Modal } from "rsuite";
import ListClients from "./sections/ListClients";
import "./style.scss";
import { useState } from "react";
import ModalFormAddClient from "./sections/ModalFormAddClient";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [shouldMutate, setShouldMutate] = useState(false);
  const [clienteParaEditar, setClienteParaEditar] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Função para abrir modal de edição
  const handleOpenEditModal = (cliente: any) => {
    setClienteParaEditar(cliente);
    setIsEditing(true);
    setShowModal(true);
  };

  // Função para abrir modal de adição
  const handleOpenAddModal = () => {
    setClienteParaEditar(null);
    setIsEditing(false);
    setShowModal(true);
  };

  // Função para fechar modal
  const handleCloseModal = () => {
    setShowModal(false);
  };


  const ModalNovoCliente: any = () => {
    return (
      <div className="flex items-center justify-center">
        <Modal
          size={`sm`}
          open={!!showModal}
          onClose={handleCloseModal}
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <ModalFormAddClient
              onClose={handleCloseModal}
              onSuccess={setShouldMutate}
              clienteParaEditar={clienteParaEditar}
              isEditing={isEditing}
            />
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  return (
    <>
      {ModalNovoCliente()}
      <ListClients
        onOpenModal={handleOpenAddModal}
        onOpenEditModal={handleOpenEditModal}
        onMutateReady={shouldMutate}
      />
    </>
  );
}
