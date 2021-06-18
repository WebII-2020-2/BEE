import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import ButtonsFormAdmin from '../ButtonsFormAdmin';
import './FormCategoryAdmin.css';
import validationSchema from '../../services/validations/validationCategoryAdmin';

function FormCategory(props) {
  const { isNew, categoryId } = props;
  const history = useHistory();

  const [category, setCategory] = useState({
    id: '',
    name: '',
    description: '',
  });

  const [isReadOnly, setIsReadOnly] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);

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

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleChange = (event) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const form = {
      ...category,
    };

    try {
      const isValid = await validationSchema
        .validate(form, { abortEarly: false })
        .then(() => true)
        .catch((err) => {
          setErrors(err.errors);
          return false;
        });
      if (isValid) {
        if (isNew) {
          await CategoryAdminApiService.createNew({
            name: form.name,
            description: form.description,
          });
          history.push('/admin/categorias');
        } else {
          await CategoryAdminApiService.update(form);
          handleEdit();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
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
        isSaving={isSaving}
      />
      {errors.length > 0 && (
        <Alert
          variant="danger"
          onClose={() => setErrors([])}
          dismissible
          className="mt-3"
        >
          {errors.map((e) => (
            <p>{e}</p>
          ))}
        </Alert>
      )}
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
