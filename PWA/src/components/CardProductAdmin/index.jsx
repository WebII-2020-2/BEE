import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './CardProductAdmin.css';

function CardProdutoAdmin(props) {
  const { id, image, price, name } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/admin/produtos/${id}`);
  };

  return (
    <Col className="card-product admin" onClick={handleClick}>
      <div className="image-container admin">
        <Image src={image} className="image-product admin" />
      </div>
      <div className="product-details admin">
        {name}
        <span className="product-details-price admin">{`R$ ${price}`}</span>
      </div>
    </Col>
  );
}

export default CardProdutoAdmin;
