import React, { useMemo } from 'react';
import { Form } from 'react-bootstrap';
import formatDate from '../../../../../services/utils/formatDate';

function Shipping(props) {
  const { order, isReadOnly, handleChange } = props;

  const shipping = useMemo(
    () => ({
      shipped_date: formatDate(order.shipped_date),
      estimated_date: formatDate(order.estimated_date),
      finished_date: formatDate(order.finished_date),
      address: order.address,
      send_method: order.send_method,
      tracking_code: order.tracking_code,
    }),
    [order]
  );

  return (
    <div className="order-page-admin shipping container">
      <Form.Label className="order-page-admin shipping label">
        Endereço de Entrega:
      </Form.Label>
      <Form.Control
        className="order-page-admin shipping control address"
        value={`${shipping.address.public_place}, ${shipping.address.number}, ${shipping.address.complement}\n${shipping.address.district} - ${shipping.address.city} - ${shipping.address.state}\n${shipping.address.zip_code}\n${shipping.address.reference_point}`}
        as="textarea"
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin shipping label">
        Método de envio:
      </Form.Label>
      <Form.Control
        className="order-page-admin shipping control"
        value={shipping.send_method}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin shipping label">
        Código de Rastreio:
      </Form.Label>
      <Form.Control
        className="order-page-admin shipping control"
        value={shipping.tracking_code}
        name="tracking_code"
        readOnly={isReadOnly}
        onChange={handleChange}
      />

      <Form.Label className="order-page-admin shipping label">
        Data de Envio:
      </Form.Label>
      <Form.Control
        className="order-page-admin shipping control"
        value={shipping.shipped_date}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin shipping label">
        Data prevista da entrega:
      </Form.Label>
      <Form.Control
        className="order-page-admin shipping control"
        value={shipping.estimated_date}
        readOnly
        plaintext
      />

      <Form.Label className="order-page-admin shipping label">
        Entregue em:
      </Form.Label>
      <Form.Control
        className="order-page-admin shipping control"
        value={shipping.finished_code}
        readOnly
        plaintext
      />
    </div>
  );
}

export default Shipping;
