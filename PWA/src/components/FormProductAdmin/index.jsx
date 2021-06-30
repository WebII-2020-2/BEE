import React, { useState, useEffect } from 'react';
import { Form, Image } from 'react-bootstrap';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import emptyImage from '../../assets/img/empty-image.png';
import './FormProductAdmin.css';

function FormProductAdmin(props) {
  const { readOnly, update, values } = props;
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const resp = await CategoryAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setCategories(resp.data);
      } else {
        throw new Error(`Failed to get categories: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (event) => {
    if (event.target.name === 'image') {
      const file = event.target.files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) =>
          update({
            ...values,
            [event.target.name]: e.target.result,
          });
        reader.readAsDataURL(file);
      }
    } else {
      update({
        ...values,
        [event.target.name]: Number(event.target.value) || event.target.value,
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Form.Group className="form-product-admin container">
      <Form.Group className="form-product-admin group">
        <Form.Label className="form-product-admin label">Nome</Form.Label>
        <Form.Control
          className="form-product-admin control"
          readOnly={readOnly}
          type="text"
          name="name"
          value={values.name}
          onChange={handleUpdate}
        />
      </Form.Group>

      <Form.Group className="form-product-admin group">
        <Form.Label className="form-product-admin label">Categoria</Form.Label>
        <Form.Control
          className="form-product-admin control"
          disabled={readOnly}
          as="select"
          name="category_id"
          onChange={handleUpdate}
          value={values.category_id}
        >
          <option value="0" disabled>
            Escolha uma categoria
          </option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="form-product-admin group sm">
        <Form.Label className="form-product-admin label">Unidade</Form.Label>
        <Form.Control
          className="form-product-admin control"
          readOnly={readOnly}
          type="text"
          name="unity"
          value={values.unity}
          onChange={handleUpdate}
        />
      </Form.Group>

      <Form.Group className="form-product-admin group sm">
        <Form.Label className="form-product-admin label">Quantidade</Form.Label>
        <Form.Control
          className="form-product-admin control"
          readOnly={readOnly}
          type="number"
          min="0"
          name="quantity"
          value={values.quantity}
          onChange={handleUpdate}
        />
      </Form.Group>

      <Form.Group className="form-product-admin group sm">
        <Form.Label className="form-product-admin label">Preço</Form.Label>
        <Form.Control
          className="form-product-admin control"
          readOnly={readOnly}
          type="number"
          min="0"
          name="unitary_value"
          value={values.unitary_value}
          onChange={handleUpdate}
        />
      </Form.Group>

      <Form.Group className="form-product-admin group image">
        <Image
          className="form-product-admin image"
          src={values.image || emptyImage}
        />
        <Form.File
          label="Selecione um arquivo"
          className="form-product-admin control"
          accept="image/*"
          disabled={readOnly}
          name="image"
          onChange={handleUpdate}
          custom
        />
      </Form.Group>

      <Form.Group className="form-product-admin group description">
        <Form.Label className="form-product-admin label">Descrição</Form.Label>
        <Form.Control
          as="textarea"
          className="form-product-admin control"
          readOnly={readOnly}
          name="description"
          value={values.description}
          onChange={handleUpdate}
        />
      </Form.Group>
    </Form.Group>
  );
}

export default FormProductAdmin;
