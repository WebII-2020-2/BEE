import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './CardProduct.css';

function CardProduct(props) {
  const {
    id,
    image,
    unitary_value: price,
    name,
    admin,
    value_promotion: newPrice,
  } = props;
  const history = useHistory();

  const handleClick = () => {
    if (admin) {
      history.push(`/admin/produtos/${id}`);
    } else {
      history.push(`/produto/${id}`);
    }
  };

  const oldPriceStyle = newPrice
    ? {
        opacity: 0.5,
        textDecoration: 'line-through',
      }
    : {};

  return (
    <Col className="card-product admin container" onClick={handleClick}>
      <div className="card-product admin image container">
        <Image src={image} className="card-product admin image" />
      </div>
      <div className="card-product admin info">
        {name}
        <span className="card-product admin info price">
          <b style={oldPriceStyle}>
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </b>
          &nbsp;
          {newPrice && (
            <b>
              {newPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </b>
          )}
        </span>
      </div>
    </Col>
  );
}

export default CardProduct;
