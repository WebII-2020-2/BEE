import React from 'react';
import { Form } from 'react-bootstrap';
import './FormCategory.css';

function FormCategoryAdmin(props) {
  const { readOnly, update, values } = props;

  const handleUpdate = (event) => {
    update({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form>
      <Form.Group className="form-category-admin">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          readOnly={readOnly}
          type="text"
          value={values.name}
          name="name"
          onChange={handleUpdate}
        />
        <Form.Label className="mt-2">Descrição</Form.Label>
        <Form.Control
          readOnly={readOnly}
          as="textarea"
          rows={3}
          value={values.description}
          name="description"
          onChange={handleUpdate}
        />
      </Form.Group>
    </Form>
  );
}

export default FormCategoryAdmin;
