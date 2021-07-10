import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

function Login(props) {
  const { loading, register } = props;
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
    birth_date: '',
  });

  const handleUpdateValues = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form className="form-logon">
      <Form.Group className="form-logon-group">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={values.name}
          onChange={handleUpdateValues}
        />
      </Form.Group>
      <Form.Group className="form-logon-group">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={values.email}
          onChange={handleUpdateValues}
        />
      </Form.Group>
      <Form.Group className="form-logon-group">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="text"
          name="password"
          value={values.password}
          onChange={handleUpdateValues}
        />
      </Form.Group>
      <Form.Group className="form-logon-group">
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="text"
          name="cpf"
          value={values.cpf}
          onChange={handleUpdateValues}
        />
      </Form.Group>
      <Form.Group className="form-logon-group">
        <Form.Label>Telefone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={values.phone}
          onChange={handleUpdateValues}
        />
      </Form.Group>
      <Form.Group className="form-logon-group">
        <Form.Label>Data de Nascimento</Form.Label>
        <Form.Control
          type="date"
          name="birth_date"
          value={values.birth_date}
          onChange={handleUpdateValues}
        />
      </Form.Group>
      <Button
        className="btn-logon mb-4"
        variant="warning"
        type="submit"
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          return register(values);
        }}
      >
        {loading ? <Spinner animation="border" /> : 'Cadastrar'}
      </Button>
    </Form>
  );
}

export default Login;
