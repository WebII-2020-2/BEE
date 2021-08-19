import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, InputGroup, Row, Button } from 'react-bootstrap';
import { Search } from 'react-feather';
import './ButtonsList.css';

function ButtonsListAdmin(props) {
  const { link, funcFilter, filterType } = props;
  const [valueSearch, setValueSearch] = useState('');

  useEffect(() => {
    funcFilter(valueSearch.toLowerCase());
  }, [valueSearch]);

  return (
    <Row className="mt-3 mb-4">
      <Col style={{ visibility: link ? 'visible' : 'hidden' }}>
        <Link to={link}>
          <Button type="button" variant="dark">
            Cadastrar
          </Button>
        </Link>
      </Col>
      <Col xs={6} lg={3}>
        <InputGroup className="input-group-search">
          <input
            placeholder="Pesquisar"
            className="input-search"
            type={filterType || 'text'}
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
          />
          {!filterType && (
            <InputGroup.Append className="d-flex align-items-center px-2">
              <Search />
            </InputGroup.Append>
          )}
        </InputGroup>
      </Col>
    </Row>
  );
}

export default ButtonsListAdmin;
