import { Formik } from 'formik';
import React from 'react';
import { Col, Form } from 'react-bootstrap';
import onlyNumber from '../../../services/utils/onlyNumber';
import ButtonsForm from '../../Admin/ButtonsForm';

function FormCard(props) {
  const {
    valuesCard,
    handleSubmitCard,
    handleDelete,
    handleEdit,
    isNew,
    isSaving,
    isReadOnly,
  } = props;

  return (
    <Formik
      // validationSchema={validationSchema}
      onSubmit={(values) => handleSubmitCard(values)}
      enableReinitialize
      initialValues={valuesCard}
    >
      {({
        handleSubmit,
        handleChange,
        handleReset,
        values,
        errors,
        touched,
      }) => (
        <>
          <ButtonsForm
            path="/user/dashboard/cartoes"
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            isNew={isNew}
            isSaving={isSaving}
            isReadOnly={isReadOnly}
          />
          <Form className="form-address-dashboard">
            <Form.Row>
              <Form.Group
                as={Col}
                sm={6}
                className="form-group-address-dashboard"
              >
                <Form.Label>
                  Número
                  <Form.Control
                    type="text"
                    name="number"
                    disabled={isReadOnly}
                    value={values.number}
                    onChange={(e) => {
                      if (onlyNumber(e.target.value, false)) handleChange(e);
                    }}
                    isInvalid={errors.number && touched.number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.number}
                  </Form.Control.Feedback>
                </Form.Label>
              </Form.Group>
              <Form.Group
                as={Col}
                sm={3}
                className="form-group-address-dashboard"
              >
                <Form.Label>
                  Bandeira
                  <Form.Control
                    type="text"
                    name="flag"
                    disabled={isReadOnly}
                    value={values.flag}
                    onChange={handleChange}
                    isInvalid={!!errors.flag && touched.flag}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.flag}
                  </Form.Control.Feedback>
                </Form.Label>
              </Form.Group>
              <Form.Group
                as={Col}
                sm={3}
                className="form-group-address-dashboard"
              >
                <Form.Label>
                  Código de segurança
                  <Form.Control
                    type="text"
                    name="security_code"
                    disabled={isReadOnly}
                    value={values.security_code}
                    onChange={(e) => {
                      if (onlyNumber(e.target.value, false)) handleChange(e);
                    }}
                    isInvalid={!!errors.security_code && touched.security_code}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.security_code}
                  </Form.Control.Feedback>
                </Form.Label>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                sm={9}
                className="form-group-address-dashboard"
              >
                <Form.Label>
                  Nome no cartão
                  <Form.Control
                    type="text"
                    name="holder"
                    disabled={isReadOnly}
                    value={values.holder}
                    onChange={handleChange}
                    isInvalid={!!errors.holder && touched.holder}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.holder}
                  </Form.Control.Feedback>
                </Form.Label>
              </Form.Group>
              <Form.Group
                as={Col}
                sm={3}
                className="form-group-address-dashboard"
              >
                <Form.Label>
                  Data de expiração
                  <Form.Control
                    type="month"
                    name="expiration_date"
                    disabled={isReadOnly}
                    value={values.expiration_date}
                    onChange={handleChange}
                    isInvalid={
                      !!errors.expiration_date && touched.expiration_date
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expiration_date}
                  </Form.Control.Feedback>
                </Form.Label>
              </Form.Group>
            </Form.Row>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default FormCard;
