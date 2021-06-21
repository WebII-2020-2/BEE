import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './ButtonsFormAdmin.css';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import ConfirmationAlert from '../ConfirmationAlert';

function ButtonsFormAdmin(props) {
  const {
    handleSubmit,
    handleDelete,
    handleEdit,
    isNew,
    isReadOnly,
    path,
    isSaving,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const getModal = () => (
    <ConfirmationAlert
      show={showModal}
      handleShow={handleShowModal}
      handleSubmit={handleDelete}
      modalInfo="Tem certeza? Essa opção não poderá ser desfeita!"
    />
  );

  const buttonsNew = () => (
    <Button
      variant="success"
      className="btn-form-admin"
      disabled={isSaving}
      onClick={handleSubmit}
    >
      {isSaving ? (
        <Spinner animation="border" variant="light" size="sm" />
      ) : (
        'Salvar'
      )}
    </Button>
  );

  function buttonsView() {
    if (isReadOnly) {
      return (
        <div>
          {handleDelete && (
            <Button
              variant="danger"
              className="btn-form-admin"
              onClick={handleShowModal}
            >
              Excluir
            </Button>
          )}
          <Button
            variant="warning"
            className="btn-form-admin editar"
            onClick={handleEdit}
          >
            Editar
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Button
          variant="danger"
          className="btn-form-admin"
          onClick={handleEdit}
        >
          Cancelar
        </Button>
        <Button
          variant="success"
          className="btn-form-admin"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Salvar'
          )}
        </Button>
      </div>
    );
  }
  return (
    <div className="actions-form-admin">
      <Link to={path} className="btn btn-secondary btn-form-admin voltar">
        <ArrowLeft /> Voltar
      </Link>
      {getModal()}
      {isNew ? buttonsNew() : buttonsView()}
    </div>
  );
}

export default ButtonsFormAdmin;
