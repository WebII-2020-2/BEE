import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LogonApiService from '../../../../../../services/api/LogonApiService';
import ConfirmationAlert from '../../../../../../components/Shared/ConfirmationAlert';
import validationShema from '../../../../../../services/validations/validationDataUser';

function Security() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');

  const handleShowModal = () => {
    setShowModal(!showModal);
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

  const getModal = () => (
    <ConfirmationAlert
      show={showModal}
      handleShow={handleShowModal}
      handleSubmit={deleteAccount}
      modalInfo="Tem certeza? Sua conta será deletada e não terá volta."
    />
  );

  return (
    <>
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
                        {loading ? (
                          <Spinner
                            animation="border"
                            variant="light"
                            size="sm"
                          />
                        ) : (
                          'Salvar'
                        )}
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
    </>
  );
}

export default Security;
