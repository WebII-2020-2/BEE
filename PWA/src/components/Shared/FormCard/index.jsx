import { Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';

function FormCard(props) {
  const { valuesCard } = props;
  const initialValuesCard = {
    number: '',
    flag: '',
    security_code: '',
    expiration_date: '',
    holder: '',
    type: '',
  };

  return (
    <Formik initialValues={valuesCard || initialValuesCard}>
      {({ handleChange, values, errors, touched }) => (
        <Form className="form-card">
          <Form.Group className="form-card-group">
            <Form.Label>
              Número
              <Form.Control
                type="text"
                name="number"
                value={values.number}
                onChange={handleChange}
                isInvalid={!!errors.number && touched.number}
              />
              <Form.Control.Feedback type="invalid">
                {errors.number}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-card-group">
            <Form.Label>
              Bandeira
              <Form.Control
                type="text"
                name="flag"
                value={values.flag}
                onChange={handleChange}
                isInvalid={!!errors.flag && touched.flag}
              />
              <Form.Control.Feedback type="invalid">
                {errors.flag}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-card-group">
            <Form.Label>
              Nome do titular
              <Form.Control
                type="text"
                name="holder"
                value={values.holder}
                onChange={handleChange}
                isInvalid={!!errors.holder && touched.holder}
              />
              <Form.Control.Feedback type="invalid">
                {errors.holder}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-card-group">
            <Form.Label>
              Data de expiração
              <Form.Control
                type="month"
                name="expiration_date"
                value={values.expiration_date}
                onChange={handleChange}
                isInvalid={!!errors.expiration_date && touched.expiration_date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiration_date}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-card-group">
            <Form.Label>
              Código de segurança
              <Form.Control
                type="number"
                name="security_code"
                value={values.security_code}
                onChange={handleChange}
                isInvalid={!!errors.security_code && touched.security_code}
              />
              <Form.Control.Feedback type="invalid">
                {errors.security_code}
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default FormCard;
