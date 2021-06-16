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
    <Col className="card-product admin container" onClick={handleClick}>
      <div className="card-product admin image container">
        <Image src={image} className="card-product admin image" />
      </div>
      <div className="card-product admin info">
        {name}
        <span className="card-product admin info price">{`R$ ${price}`}</span>
      </div>
    </Col>
  );
}

export default CardProdutoAdmin;
