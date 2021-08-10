import React from 'react';
import { Image } from 'react-bootstrap';

function CartProduct(props) {
  const {
    name,
    image,
    category,
    unitary_value: price,
    value_promotion: newPrice,
    quantity,
  } = props;

  return (
    <div className="cart product card" style={{ margin: 5 }}>
      <Image src={image} width={100} />
      <p>
        {name}
        <br />
        <span>{category}</span>
      </p>
      <span>
        {price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </span>
      {newPrice && (
        <span>
          {newPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      )}
      <input type="text" value={quantity} />
    </div>
  );
}

export default CartProduct;
