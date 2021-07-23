import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

function Login(props) {
  const { loading, login } = props;
  const [values, setValues] = useState({
    email: '',
    password: '',
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
        <Form.Label>
          E-mail
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={handleUpdateValues}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group className="form-logon-group">
        <Form.Label>
          Senha
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleUpdateValues}
          />
        </Form.Label>
      </Form.Group>
      <Button
        className="btn-logon mb-1"
        variant="warning"
        type="submit"
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          return login(values);
        }}
      >
        {loading ? <Spinner animation="border" /> : 'Entrar'}
      </Button>
      <a href="/" className="forgot-password mt-3">
        Esqueceu a senha?
      </a>
    </Form>
  );
}

export default Login;