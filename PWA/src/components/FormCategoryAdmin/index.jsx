import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import ButtonsFormAdmin from '../ButtonsFormAdmin';
import './FormCategoryAdmin.css';

function FormCategory(props) {
  const { isNew, formData } = props;

  const history = useHistory();

  const [name, setName] = useState(formData.name);
  const [description, setDescription] = useState(formData.description);
  const [isReadOnly, setIsReadOnly] = useState(!isNew);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleUpdateName = (event) => {
    setName(event.target.value);
  };

  const handleUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    const form = {
      id: formData.id,
      name,
      description,
    };

    try {
      if (isNew) {
        CategoryAdminApiService.createNew({
          name: form.name,
          description: form.description,
        });
        history.push('/admin/categorias');
      } else {
        CategoryAdminApiService.update(form);
        handleEdit();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = () => {
    try {
      CategoryAdminApiService.remove(formData.id);
      history.push('/admin/produtos');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form>
      <ButtonsFormAdmin
        path="/admin/categorias"
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isNew={isNew}
        isReadOnly={isReadOnly}
      />

      <Form.Group className="form-category-admin">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          type="text"
          value={name}
          onChange={handleUpdateName}
        />
        <Form.Label className="mt-2">Descrição</Form.Label>
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
