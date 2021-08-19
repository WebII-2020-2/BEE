import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { Minus, Plus, Trash } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  removeProduct,
  updateQuantity,
} from '../../../store/actions/cart.actions';
import './CartProduct.css';

function CartProduct(props) {
  const {
    id,
    name,
    image,
    unity,
    unitary_value: price,
    value_promotion: newPrice,
    quantity,
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const oldPriceStyle = newPrice
    ? {
        opacity: 0.5,
        textDecoration: 'line-through',
      }
    : undefined;

  const handleClick = (action) => {
    switch (action) {
      case -1:
        dispatch(updateQuantity(id, 'PLUS'));
        break;
      case 1:
        dispatch(updateQuantity(id, 'MINUS'));
        break;
      case 0:
        dispatch(removeProduct(id));
        break;
      default:
        break;
    }
    history.push('/carrinho');
  };

  return (
    <Container className="cart product card">
      <Image src={image} />
      <p>
        {name}
        <br />
        <span>Unidade: {unity}</span>
      </p>
      <span className="price">
        <span style={oldPriceStyle}>
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
        <br />
        {newPrice &&
          newPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
      </span>
      <span className="quantity">
        <Button
          onClick={() => handleClick(1)}
          variant="outline-dark"
          className="quantity-button"
          disabled={quantity === 1}
        >
          <Minus />
        </Button>
        <span>{quantity}</span>
        <Button
          onClick={() => handleClick(-1)}
          className="quantity-button"
          variant="outline-dark"
        >
          <Plus />
        </Button>
      </span>
      <Trash className="delete-product" onClick={() => handleClick(0)} />
    </Container>
  );
}

export default CartProduct;
