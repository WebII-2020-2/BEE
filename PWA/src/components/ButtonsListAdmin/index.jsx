import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col, InputGroup, Row, Button,
} from 'react-bootstrap';
import { Search } from 'react-feather';
import './ButtonsListAdmin.css';

function ButtonsListAdmin(props) {
  const { link } = props;

  return (
    <Row className="mt-3 mb-4">
      <Col>
        <Link to={link}>
          <Button type="button" variant="dark">
            Cadastrar
          </Button>
        </Link>
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
