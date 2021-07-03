import React, { useMemo } from 'react';
import { Form } from 'react-bootstrap';
import orderStatus from '../../../../../services/utils/orderStatus';
import formatDate from '../../../../../services/utils/formatDate';
import formatFloat from '../../../../../services/utils/formatFloat';

function Details(props) {
  const { order, handleChange, isReadOnly } = props;
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const details = useMemo(
    () => ({
      invoice: order.invoice,
      status_order: order.status_order,
      name_user: order.name_user,
      selled_date: formatDate(order.selled_date),
      quantity: order.quantity,
      value_shipping: formatFloat(order.value_shipping),
      value_total: formatFloat(order.value_total),
      value_total_products: formatFloat(order.value_total_products),
      payment_method: order.payment_method,
    }),
    [order]
  );

  return (
    <div className="order-page-admin info container">
      <Form.Label className="order-page-admin info label">
        Número do Pedido:
      </Form.Label>
      <Form.Control
        className="order-page-admin info control"
        value={`#${details.invoice}`}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin info label">
        Status do Pedido
      </Form.Label>
      <Form.Control
        name="status_order"
        onChange={handleChange}
        className="order-page-admin info control"
        as="select"
        value={details.status_order}
        disabled={isReadOnly}
      >
        <option value="" hidden>
          Selecione o status do pedido
        </option>
        {options.map((option) => (
          <option value={option}>
            {`${option} - ${orderStatus.convert(option)}`}
          </option>
        ))}
      </Form.Control>

      <Form.Label className="order-page-admin info label">Cliente:</Form.Label>
      <Form.Control
        className="order-page-admin info control"
        value={details.name_user}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin info label">
        Data da compra:
      </Form.Label>
      <Form.Control
        className="order-page-admin info control"
        value={details.selled_date}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin info label">
        Quantidade de produtos:
      </Form.Label>
      <Form.Control
        className="order-page-admin info control"
        value={details.quantity}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin info label">
        Total de produtos:
      </Form.Label>
      <Form.Control
        className="order-page-admin info control"
        value={`R$ ${details.value_total_products}`}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin shipping label">
        Valor de envio:
      </Form.Label>
      <Form.Control
        className="order-page-admin shipping control"
        value={`R$ ${details.value_shipping}`}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin info label">
        Total da venda:
      </Form.Label>
      <Form.Control
        className="order-page-admin info control"
        value={`R$ ${details.value_total}`}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin info label">
        Forma de Pagamento:
      </Form.Label>
      <Form.Control
        className="order-page-admin info control"
        value={details.payment_method}
        readOnly
        plaintext
      />
    </div>
  );
}

export default Details;
