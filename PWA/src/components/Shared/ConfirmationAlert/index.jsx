import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ConfirmationAlert(props) {
  const { show, handleShow, handleSubmit, modalInfo } = props;

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Atenção!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalInfo}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Fechar
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationAlert;
