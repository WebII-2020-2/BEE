import React, { useState } from 'react';
import { Form, Nav } from 'react-bootstrap';
import TablePromotionProducts from '../TablePromotionProducts';
import './FormPromotion.css';

function FormPromotionAdmin(props) {
  const { readOnly, update, values, isNew } = props;

  const [tab, setTab] = useState('details');

  const handleUpdate = (event) => {
    update({
      ...values,
      [event.target.name]: Number(event.target.value) || event.target.value,
    });
  };

  const handleUpdateProducts = (products) => {
    update({
      ...values,
      products,
    });
  };

  const handleUpdateTab = (newTab) => {
    setTab(newTab);
  };

  return (
    <>
      {!isNew && (
        <Nav
          variant="tabs"
          activeKey={tab}
          className="form-promotion-admin nav"
        >
          <Nav.Item>
            <Nav.Link
              eventKey="details"
              onClick={() => handleUpdateTab('details')}
            >
              Informações gerais
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="products"
              onClick={() => handleUpdateTab('products')}
            >
              Produtos da promoção
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}

      {tab === 'details' && (
        <Form className={`form-promotion-admin container ${isNew && 'mt-3'}`}>
          <Form.Group className="form-promotion-admin group lg">
            <Form.Label className="form-promotion-admin label">Nome</Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={readOnly}
              type="text"
              value={values.name}
              name="name"
              onChange={handleUpdate}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group sm">
            <Form.Label className="form-promotion-admin label">
              Data de início
            </Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={readOnly}
              type="date"
              value={values.start_date}
              name="start_date"
              onChange={handleUpdate}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group sm">
            <Form.Label className="form-promotion-admin label">
              Data de fim
            </Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={readOnly}
              type="date"
              value={values.end_date}
              name="end_date"
              onChange={handleUpdate}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group">
            <Form.Label className="form-promotion-admin label">
              Tipo do valor
            </Form.Label>
            <Form.Check
              type="radio"
              name="type"
              label="Decimal"
              disabled={readOnly}
              value={1}
              checked={values.type === 1}
              onChange={handleUpdate}
            />
            <Form.Check
              type="radio"
              name="type"
              label="Porcentagem"
              disabled={readOnly}
              value={2}
              checked={values.type === 2}
              onChange={handleUpdate}
            />
          </Form.Group>

          <Form.Group className="form-promotion-admin group sm">
            <Form.Label className="form-promotion-admin label">
              Valor
            </Form.Label>
            <Form.Control
              className="form-promotion-admin control"
              readOnly={readOnly}
              type="number"
              min="0"
              name="value"
              value={values.value}
              onChange={handleUpdate}
            />
          </Form.Group>
        </Form>
      )}

      {tab === 'products' && (
        <TablePromotionProducts
          readOnly={readOnly}
          updateProducts={handleUpdateProducts}
          values={values.products}
        />
      )}
    </>
  );
}

export default FormPromotionAdmin;
