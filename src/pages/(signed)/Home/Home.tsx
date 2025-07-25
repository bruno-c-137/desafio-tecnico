
import { Modal } from "rsuite";
import ListClients from "./sections/ListClients";
import "./style.scss";
import { useState } from "react";
import ModalFormAddClient from "./sections/ModalFormAddClient";



export default function HomePage() {

  const [showModal, setShowModal] = useState(true);

  const ModalNovoCliente: any = () => {
    return (
      <div className="flex items-center justify-center">
        <Modal
          size={`sm`}
          open={!!showModal}
          onClose={() => {


            setShowModal(false);
          }}
        // dialogClassName={`modal-regulamento`}
        >
          <Modal.Header></Modal.Header>


          <Modal.Body>
            <ModalFormAddClient />
          </Modal.Body>

        </Modal>
      </div>
    )
  }

  return (
    <>
      {ModalNovoCliente()}
      <ListClients />
    </>
  );
}
