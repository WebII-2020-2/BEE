import React from 'react';
import './CartInfo.css';

function CartInfo({ values }) {
  const { totalValue, discount, products } = values;
  return (
    <div className="info values">
      <h3>Resumo do pedido</h3>
      {products && (
        <ul
          className="products-list"
          style={{ listStyle: 'none', padding: '1rem 2rem 0' }}
        >
          {products.map((p) => (
            <li style={{ textAlign: 'left', opacity: 0.8, fontSize: '1.2rem' }}>
              {`${p.quantity}x - ${p.name} (${p.unity})`}
              <span style={{ float: 'right' }}>
                {(p.unitary_value * p.quantity).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
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
