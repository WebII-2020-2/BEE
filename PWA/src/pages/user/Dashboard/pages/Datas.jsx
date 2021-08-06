import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LogonApiService from '../../../../services/api/LogonApiService';
import emptyImage from '../../../../assets/img/empty-image.png';
import ConfirmationAlert from '../../../../components/Shared/ConfirmationAlert';
import validationShema from '../../../../services/validations/validationDataUser';

function Datas() {
  const history = useHistory();
  const [data, setData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birth_date: '',
  });
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const getUser = async () => {
    try {
      const resp = await LogonApiService.getUser()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setData(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  const editUser = async (form) => {
    console.warn(form);
  };

  const editPassword = async (form) => {
    setErrorPassword('');
    try {
      setLoading(true);
      const resp = await LogonApiService.changePassword(form)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        history.go(0);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      setErrorPassword(err.error_message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      const resp = await LogonApiService.deleteUser()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        history.push('/');
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getModal = () => (
    <ConfirmationAlert
      show={showModal}
      handleShow={handleShowModal}
      handleSubmit={deleteAccount}
      modalInfo="Tem certeza? Sua conta será deletada e não terá volta."
    />
  );

  return (
    <div className="container-dashboard">
      <Formik
        validationSchema={validationShema.validationSchemaData}
        onSubmit={editUser}
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
                    onClick={() => {
                      handleReset();
                      handleEdit();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button variant="success" onClick={handleSubmit}>
                    Salvar
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
      <div className="header-datas-dashboard mt-4">
        <h2 className="m-0">Segurança</h2>
      </div>
      <div className="form-datas-dashboard mb-5 align-items-center">
        <Accordion className="accordion-dashboard">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Alterar senha
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="d-flex justify-content-center">
                <Formik
                  validationSchema={validationShema.validationSchemaPassword}
                  onSubmit={(values) =>
                    editPassword({
                      last_password: values.last_password,
                      new_password: values.new_password,
                    })
                  }
                  initialValues={{
                    last_password: '',
                    new_password: '',
                    confirmationPassword: '',
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        as={Row}
                        className="form-group-datas-dashboard mb-2"
                      >
                        <Form.Label column sm="5">
                          Senha atual
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            type="password"
                            name="last_password"
                            value={values.last_password}
                            onChange={handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="form-group-datas-dashboard mb-2"
                      >
                        <Form.Label column sm="5">
                          Nova senha
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            type="password"
                            name="new_password"
                            value={values.new_password}
                            onChange={handleChange}
                            isInvalid={
                              !!errors.new_password && touched.new_password
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.new_password}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="form-group-datas-dashboard mb-2"
                      >
                        <Form.Label column sm="5">
                          Confirmar nova senha
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            type="password"
                            name="confirmationPassword"
                            value={values.confirmationPassword}
                            onChange={handleChange}
                            isInvalid={
                              !!errors.confirmationPassword &&
                              touched.confirmationPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmationPassword}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      {errorPassword && (
                        <Alert variant="danger" className="text-center">
                          {errorPassword}
                        </Alert>
                      )}
                      <Button
                        variant="success"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? <Spinner animation="border" /> : 'Salvar'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {getModal()}
        <Button variant="outline-danger m-3" onClick={handleShowModal}>
          Deletar conta
        </Button>
      </div>
    </div>
  );
}

export default Datas;
