import React from 'react';
import './CartInfo.css';

function CartInfo({ values }) {
  const { totalValue, discount } = values;
  return (
    <div className="info values">
      <h3>Resumo do pedido</h3>
      <hr />
      <p>
        Subtotal{' - '}
        {(totalValue + discount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
        <br />
        Desconto{' - '}
        {discount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
      <span className="total-value">
        Total:{' '}
        {totalValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </span>
    </div>
  );
}

export default CartInfo;
