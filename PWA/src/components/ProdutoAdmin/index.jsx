import React from 'react';
import { Col, Image } from 'react-bootstrap';
import './CardProdutoAdmin.css';

function CardProdutoAdmin({ image, name, price }) {
  return (
    <Col md={3} sm className="card-produ-admin">
      <div className="image-container">
        <Image src={image} className="image-product" />
      </div>
      <div className="product-details-container">
        <p>
          {name}
          <br />
          <span>
            {`R$ ${price}`}
          </span>
        </p>
      </div>
    </Col>
  );
}

export default CardProdutoAdmin;
