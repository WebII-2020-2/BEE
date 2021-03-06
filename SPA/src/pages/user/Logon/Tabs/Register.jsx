import React from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import validationSchema from '../../../../services/validations/validationRegister';
import onlyNumber from '../../../../services/utils/onlyNumber';

function Login(props) {
  const { loading, register, error } = props;

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => register(values)}
      initialValues={{
        name: '',
        email: '',
        password: '',
        cpf: '',
        phone: '',
        birth_date: '',
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Form className="form-logon" onSubmit={handleSubmit}>
          <Form.Group className="form-logon-group">
            <Form.Label>
              Nome
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name && touched.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-logon-group">
            <Form.Label>
              E-mail
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email && touched.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-logon-group">
            <Form.Label>
              Senha
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password && touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-logon-group">
            <Form.Label>
              CPF
              <Form.Control
                type="text"
                name="cpf"
                value={values.cpf}
                onChange={(e) => {
                  if (onlyNumber(e.target.value, false)) handleChange(e);
                }}
                isInvalid={!!errors.cpf && touched.cpf}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cpf}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-logon-group">
            <Form.Label>
              Telefone
              <Form.Control
                type="text"
                name="phone"
                value={values.phone}
                onChange={(e) => {
                  if (onlyNumber(e.target.value, true)) handleChange(e);
                }}
                isInvalid={!!errors.phone && touched.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-logon-group">
            <Form.Label>
              Data de Nascimento
              <Form.Control
                type="date"
                name="birth_date"
                value={values.birth_date}
                onChange={handleChange}
                isInvalid={!!errors.birth_date && touched.birth_date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birth_date}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Button
            className="btn-logon mb-4"
            variant="warning"
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" /> : 'Cadastrar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
