import React from 'react';
import './CartInfo.css';

function CartInfo({ values }) {
  const { totalValue, discount, products, frete, dataEnvio } = values;
  return (
    <div className="info values">
      <h3>Resumo do pedido</h3>
      {products && (
        <ul className="products-list">
          {products.map((p) => (
            <li>
              {`${p.quantity}x - ${p.name} (${p.unity})`}
              <span>
                {(p.unitary_value * p.quantity).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
      {frete && (
        <p className="frete">
          Envio em até {dataEnvio} dias
          <span>
            {frete.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </p>
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
