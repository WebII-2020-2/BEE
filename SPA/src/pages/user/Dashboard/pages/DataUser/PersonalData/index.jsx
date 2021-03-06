import React from 'react';
import { Formik } from 'formik';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import emptyImage from '../../../../../../assets/img/empty-image.png';
import validationShema from '../../../../../../services/validations/validationDataUser';
import onlyNumber from '../../../../../../services/utils/onlyNumber';

function PersonalData(props) {
  const { data, editUser, isReadOnly, handleEdit, loading } = props;

  return (
    <Formik
      validationSchema={validationShema.validationSchemaData}
      onSubmit={(values) => editUser(values)}
      enableReinitialize
      initialValues={data}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleReset,
        setFieldValue,
      }) => (
        <>
          <div className="header-datas-dashboard">
            <h2 className="m-0">Dados pessoais</h2>
            {isReadOnly ? (
              <Button variant="warning" onClick={handleEdit}>
                Editar
              </Button>
            ) : (
              <div>
                <Button
                  variant="secondary mr-2"
                  disabled={loading}
                  onClick={() => {
                    handleReset();
                    handleEdit();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </div>
            )}
          </div>
          <Form className="form-datas-dashboard pb-2">
            <Form.Group as={Row} className="form-group-datas-dashboard pt-3">
              <Form.Label column sm="4" htmlFor="name">
                Nome Completo
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  id="name"
                  plaintext={isReadOnly}
                  readOnly={isReadOnly}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} className="form-group-datas-dashboard">
              <Form.Label column sm="4" htmlFor="cpf">
                CPF
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  id="cpf"
                  plaintext={isReadOnly}
                  readOnly={isReadOnly}
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
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} className="form-group-datas-dashboard">
              <Form.Label column sm="4" htmlFor="email">
                E-mail
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  id="email"
                  plaintext={isReadOnly}
                  readOnly={isReadOnly}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} className="form-group-datas-dashboard">
              <Form.Label column sm="4" htmlFor="phone">
                Telefone
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  id="phone"
                  plaintext={isReadOnly}
                  readOnly={isReadOnly}
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
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} className="form-group-datas-dashboard">
              <Form.Label column sm="4" htmlFor="birth_date">
                Data de nascimento
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="date"
                  id="birth_date"
                  plaintext={isReadOnly}
                  readOnly={isReadOnly}
                  name="birth_date"
                  value={values.birth_date}
                  onChange={handleChange}
                  isInvalid={!!errors.birth_date && touched.birth_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birth_date}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <hr />
            <Form.Group
              as={Row}
              className="form-group-datas-dashboard align-items-center"
            >
              <Col sm="4" className="d-flex justify-content-center">
                <Image
                  className="image-datas-dashboard"
                  src={values.image || emptyImage}
                />
              </Col>
              <Col sm="8">
                <Form.File
                  label="Selecione um arquivo"
                  accept="image/*"
                  disabled={isReadOnly}
                  name="image"
                  onChange={(event) => {
                    const file = event.target.files.item(0);
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) =>
                        setFieldValue('image', e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  custom
                />
              </Col>
            </Form.Group>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default PersonalData;
