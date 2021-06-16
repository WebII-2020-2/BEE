import React from 'react';
import { Button } from 'react-bootstrap';
import './ButtonsFormAdmin.css';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';

function ButtonsFormAdmin(props) {
  const {
    handleSubmit, handleDelete, handleEdit, isNew, isReadOnly, path,
  } = props;

  const buttonsNew = () => (
    <Button
      variant="success"
      className="btn-form-admin"
      onClick={handleSubmit}
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
            className="btn-form-admin"
            onClick={handleDelete}
          >
            Excluir
          </Button>
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
        >
          Salvar
        </Button>
      </div>
    );
  }
  return (
    <div className="actions-form-admin">
      <Link to={path} className="arrow-back-form-admin">
        <Button type="button" variant="secondary">
          <ArrowLeft />
          {' '}
          Voltar
        </Button>
      </Link>
      {' '}
      {isNew ? buttonsNew() : buttonsView()}
    </div>
  );
}

export default ButtonsFormAdmin;
