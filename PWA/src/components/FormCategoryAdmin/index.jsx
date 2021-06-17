import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import ButtonsFormAdmin from '../ButtonsFormAdmin';
import './FormCategoryAdmin.css';

function FormCategory(props) {
  const { isNew, categoryId } = props;
  const history = useHistory();

  const [category, setCategory] = useState({
    id: '',
    name: '',
    description: '',
  });

  const getCategoryById = async () => {
    try {
      const resp = await CategoryAdminApiService.getById(categoryId).then(
        (r) => r.data
      );
      if (resp.success) {
        setCategory(resp.data);
      } else {
        throw new Error(`Unable to get categories: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategoryById();
  }, []);

  const [isReadOnly, setIsReadOnly] = useState(!isNew);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleChange = (event) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const form = {
      ...category,
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
      CategoryAdminApiService.remove(category.id);
      history.push('/admin/categorias');
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
          value={category.name}
          name="name"
          onChange={handleChange}
        />
        <Form.Label className="mt-2">Descrição</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          as="textarea"
          rows={3}
          value={category.description}
          name="description"
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
}

export default FormCategory;
