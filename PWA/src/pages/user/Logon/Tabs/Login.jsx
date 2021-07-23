import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

function Login(props) {
  const {
    loading,
    login,
    error,
    tabForgotPassword,
    handleForgotPassword,
    successSendEmail,
    sendEmailForgotPassword,
  } = props;

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');

  const handleUpdateValues = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {!tabForgotPassword ? (
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
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Button
            className="btn-logon"
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
          <Button
            variant="link"
            className="forgot-password mt-3"
            onClick={(e) => {
              e.preventDefault();
              handleForgotPassword(true);
            }}
          >
            Esqueceu a senha?
          </Button>
        </Form>
      ) : (
        <Form className="form-logon">
          <Form.Group className="form-logon-group">
            <Form.Label>
              E-mail
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Label>
          </Form.Group>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          {successSendEmail && (
            <Alert variant="success" className="text-center">
              {successSendEmail}
            </Alert>
          )}
          <Button
            className="btn-logon"
            variant="warning"
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              sendEmailForgotPassword(email);
            }}
          >
            {loading ? <Spinner animation="border" /> : 'Enviar'}
          </Button>
          <Button
            variant="link"
            className="forgot-password mt-3"
            onClick={(e) => {
              e.preventDefault();
              handleForgotPassword(false);
            }}
          >
            Retornar ao login
          </Button>
        </Form>
      )}
    </>
  );
}

export default Login;
