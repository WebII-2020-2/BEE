import React from 'react';
import { Button } from 'react-bootstrap';
import './ButtonsFormAdmin.css';

function ButtonsFormAdmin(props) {
  const { handleSubmit, handleDelete, handleEdit, isNew, isReadOnly } = props;

  const buttonsNew = () => (
    <Button
      variant="outline-success"
      className="btn-admin-produto"
      onSubmit={handleSubmit}
    >
      Salvar
    </Button>
  );

  function buttonsView() {
    if (isReadOnly) {
      return (
        <div>
          <Button
            variant="danger"
            className="btn-admin-produto"
            onClick={handleDelete}
          >
            Excluir
          </Button>
          <Button
            variant="warning"
            className="btn-admin-produto editar"
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
          className="btn-admin-produto"
          onClick={handleEdit}
        >
          Cancelar
        </Button>
        <Button
          variant="success"
          className="btn-admin-produto"
          onClick={handleSubmit}
        >
          Salvar
        </Button>
      </div>
    );
  }
  return <>{isNew ? buttonsNew() : buttonsView()}</>;
}

export default ButtonsFormAdmin;
