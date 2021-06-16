import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import './FormCategoryAdmin.css';

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
      id: formData.id,
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
    <Button
      variant="outline-success"
      className="btn-admin-category"
      onClick={handleSubmit}
    >
      Salvar
    </Button>
  );

  const buttonsView = () => (isReadOnly ? (
    <div>
      <Button
        variant="outline-danger"
        className="btn-admin-category mr-2"
        onClick={handleDelete}
      >
        Excluir
      </Button>
      <Button
        variant="outline-warning"
        className="btn-admin-category editar"
        onClick={handleEdit}
      >
        Editar
      </Button>
    </div>
  ) : (
    <div>
      <Button
        variant="outline-danger"
        className="btn-admin-category mr-2"
        onClick={handleEdit}
      >
        Cancelar
      </Button>
      <Button
        variant="outline-success"
        className="btn-admin-category"
        onClick={handleSubmit}
      >
        Salvar
      </Button>
    </div>
  )
  );

  return (
    <Form>
      <div className="actions-form-category-admin mt-3">
        <Link to="/admin/categorias" className="arrow-back-category-admin">
          <Button type="button" variant="outline-secondary">
            <ArrowLeft />
            {' '}
            Voltar
          </Button>
        </Link>
        {' '}
        {isNew ? buttonsNew() : buttonsView()}
      </div>

      <Form.Group className="form-category-admin">
        <Form.Label>
          Nome
        </Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          type="text"
          value={name}
          onChange={handleUpdateName}
        />
        <Form.Label className="mt-2">
          Descrição
        </Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          as="textarea"
          rows={3}
          value={description}
          onChange={handleUpdateDescription}
        />
      </Form.Group>
    </Form>
  );
}

export default FormCategory;
