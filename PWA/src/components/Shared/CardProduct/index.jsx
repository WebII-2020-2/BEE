import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './CardProduct.css';

function CardProduct(props) {
  const { id, image, unitary_value: price, name, admin } = props;
  const history = useHistory();

  const handleClick = () => {
    if (admin) {
      history.push(`/admin/produtos/${id}`);
    } else {
      history.push(`/produto/${id}`);
    }
  };

  return (
    <Col className="card-product admin container" onClick={handleClick}>
      <div className="card-product admin image container">
        <Image src={image} className="card-product admin image" />
      </div>
      <div className="card-product admin info">
        {name}
        <span className="card-product admin info price">{`R$ ${price
          .toFixed(2)
          .toString()
          .replace('.', ',')}`}</span>
      </div>
    </Col>
  );
}

export default CardProduct;
