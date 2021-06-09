import React from 'react';
import {
  Col, InputGroup, Row,
} from 'react-bootstrap';
import { Search } from 'react-feather';
import './ButtonsListAdmin.css';

function ButtonsListAdmin(props) {
  const { link } = props;

  return (
    <Row className="mt-3 mb-4">
      <Col>
        <a href={link}>
          <button className="btn btn-dark btn-cadastrar-item-admin" type="button">
            Cadastrar
          </button>
        </a>
      </Col>
      <Col xs={6} lg={3}>
        <InputGroup className="input-group-search">
          <input placeholder="Pesquisar" className="input-search" />
          <InputGroup.Append className="d-flex align-items-center px-2">
            <Search />
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default ButtonsListAdmin;
