import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import './FormCategory.css';

function FormCategory(props) {
  const { isNew, formData } = props;

  const history = useHistory();

  const [name, setName] = useState(formData.name);
  const [description, setDescription] = useState(formData.description);
  const [isReadOnly, setIsReadOnly] = useState(!isNew);

  const handleUpdateName = (event) => {
    setName(event.target.value);
  };

  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleDelete = () => {
    //
  };

  const handleSubmit = () => {
    const form = {
      id: Math.floor((Math.random() * 1000) + 1),
      name,
      description,
    };

    try {
      const response = CategoryAdminApiService.createNew(form);
      console.log(response);
      history.push('/admin/categorias');
    } catch (e) {
      console.log(e);
    }
  };

  const buttonsNew = () => (
    <Button variant="primary" onClick={handleSubmit}>
      Salvar
    </Button>
  );

  const buttonsView = () => (
    isReadOnly
      ? (
        <div>
          <Button
            variant="outline-danger"
            className="btn-admin-produto"
            onClick={handleDelete}
          >
            Excluir
          </Button>
          <Button
            variant="outline-primary"
            className="btn-admin-produto"
            onClick={handleEdit}
          >
            Editar
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="danger" onClick={handleEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </div>
      )
  );

  return (
    <Form>
      <Form.Group className="actions-form-category-admin">
        <Link to="/admin/produtos" className="arrow-back-category-admin">
          <ArrowLeft />
          {' '}
          Voltar
        </Link>
        {' '}
        {isNew ? buttonsNew() : buttonsView()}
      </Form.Group>
      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <Form.Control readOnly={isReadOnly} type="text" value={name} onChange={handleUpdateName} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <Form.Control readOnly={isReadOnly} type="text" value={description} onChange={handleUpdateDescription} />
      </Form.Group>
    </Form>
  );
}

export default FormCategory;
