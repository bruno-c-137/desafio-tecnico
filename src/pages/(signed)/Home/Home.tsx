
import { Modal } from "rsuite";
import ListClients from "./sections/ListClients";
import "./style.scss";
import { useState } from "react";
import ModalFormAddClient from "./sections/ModalFormAddClient";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const [shouldMutate, setShouldMutate] = useState(false);

  // Efeito para chamar o mutate quando shouldMutate for true




  const ModalNovoCliente: any = () => {
    return (
      <div className="flex items-center justify-center">
        <Modal
          size={`sm`}
          open={!!showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <ModalFormAddClient onClose={setShowModal} onSuccess={setShouldMutate} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  return (
    <>
      {ModalNovoCliente()}
      <ListClients onOpenModal={setShowModal} onMutateReady={shouldMutate} />
    </>
  );
}
