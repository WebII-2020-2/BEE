import React, { useEffect, useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
import LogonApiService from '../../../../services/api/LogonApiService';
import emptyImage from '../../../../assets/img/empty-image.png';

function Datas() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birth_date: '',
  });
  const [password, setPassword] = useState({
    last_password: '',
    new_password: '',
  });

  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleUpdateValues = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handlePassword = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
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
        setValues(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container-dashboard">
      <div className="header-datas-dashboard">
        <h2 className="m-0">Dados pessoais</h2>
        {isReadOnly ? (
          <Button variant="warning" onClick={handleEdit}>
            Editar
          </Button>
        ) : (
          <div>
            <Button variant="secondary mr-2" onClick={handleEdit}>
              Cancelar
            </Button>
            <Button variant="success">Salvar</Button>
          </div>
        )}
      </div>
      <Form className="form-datas-dashboard">
        <Form.Group as={Row} className="form-group-datas-dashboard pt-3">
          <Form.Label column sm="4">
            Nome Completo
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              name="name"
              value={values.name}
              onChange={handleUpdateValues}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className="form-group-datas-dashboard">
          <Form.Label column sm="4">
            CPF
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              name="cpf"
              value={values.cpf}
              onChange={handleUpdateValues}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className="form-group-datas-dashboard">
          <Form.Label column sm="4">
            E-mail
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="email"
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              name="email"
              value={values.email}
              onChange={handleUpdateValues}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className="form-group-datas-dashboard">
          <Form.Label column sm="4">
            Telefone
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              name="phone"
              value={values.phone}
              onChange={handleUpdateValues}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className="form-group-datas-dashboard">
          <Form.Label column sm="4">
            Data de nascimento
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="date"
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              name="birth_date"
              value={values.birth_date}
              onChange={handleUpdateValues}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group
          as={Row}
          className="form-group-datas-dashboard align-items-center"
        >
          <Col sm="4" className="d-flex justify-content-center">
            <Image className="image-datas-dashboard" src={emptyImage} />
          </Col>
          <Col sm="8">
            <Form.File
              label="Selecione um arquivo"
              className="form-product-admin control"
              accept="image/*"
              disabled={isReadOnly}
              name="image"
              onChange={handleUpdateValues}
              custom
            />
          </Col>
        </Form.Group>
      </Form>
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
              <Card.Body>
                <Form>
                  <Form.Group as={Row} className="form-group-datas-dashboard">
                    <Form.Label column sm="4">
                      Nova senha
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="password"
                        name="new_password"
                        value={password.new_password}
                        onChange={handlePassword}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Button variant="outline-danger m-3">Deletar conta</Button>
      </div>
    </div>
  );
}

export default Datas;
