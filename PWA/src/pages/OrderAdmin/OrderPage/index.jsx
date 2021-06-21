import React, { useEffect, useState } from 'react';
import { Container, Form, Nav } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import ButtonsFormAdmin from '../../../components/ButtonsFormAdmin';
import TableList from '../../../components/TableListAdmin';
import OrderAdminApiService from '../../../services/api/OrderAdminApiService';
import orderStatus from '../../../services/utils/orderStatus';
import './OrderPage.css';

function OrderPage(props) {
  const { match } = props;
  const [order, setOrder] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [tab, setTab] = useState('details');

  const th = {
    name: 'Nome',
    quantity: 'Quantidade',
    unitary_value_selled: 'Valor Unitário',
    total_value: 'Valor Total',
  };

  const getOrder = async () => {
    try {
      const resp = await OrderAdminApiService.getById(match.params.id).then(
        (r) => r.data
      );
      if (resp.success) {
        const selledDate = new Date(resp.data.selled_date).toLocaleDateString();
        const shippedDate = new Date(
          resp.data.shipped_date
        ).toLocaleDateString();
        const estimatedDate = new Date(
          resp.data.estimated_date
        ).toLocaleDateString();
        const finishedDate = new Date(
          resp.data.finished_date
        ).toLocaleDateString();
        setOrder({
          ...resp.data,
          value_shipping: resp.data.value_shipping
            .toFixed(2)
            .toString()
            .replace('.', ','),
          value_total: resp.data.value_total
            .toFixed(2)
            .toString()
            .replace('.', ','),
          selled_date: selledDate,
          shipped_date: shippedDate,
          estimated_date: estimatedDate,
          finished_date: finishedDate,
        });
      }
      throw new Error(`Unable to get orders: ${resp.error}`);
    } catch (err) {
      console.error(err);
    }
  };

  const getOrderProducts = () => {
    if (order.products !== undefined) {
      const listProducts = order.products.map((p) => {
        console.warn(p);
        return {
          ...p,
          unitary_value_selled: p.unitary_value_selled
            .toFixed(2)
            .toString()
            .replace('.', ','),
          total_value: (p.quantity * p.unitary_value_selled)
            .toFixed(2)
            .toString()
            .replace('.', ','),
        };
      });
      setOrderProducts(listProducts);
    }
  };

  const getStatusOptions = () => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return options.map((option) => (
      <option value={option}>
        {`${option} - ${orderStatus.convert(option)}`}
      </option>
    ));
  };

  const handleChange = (event) => {
    setOrder({
      ...order,
      [event.target.name]: Number(event.target.value) || event.target.value,
    });
  };

  const handleChangeTab = (newTab) => {
    setTab(newTab);
  };

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleSubmit = async () => {
    const form = {
      tracking_code: order.tracking_code,
      status_order: order.status_order,
    };
    try {
      setIsSaving(true);
      const resp = await OrderAdminApiService.update(order.id, form).then(
        (r) => r.data
      );
      if (resp.success) {
        handleEdit();
      } else {
        throw new Error(`Unable to update order: ${resp.err}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    getOrderProducts();
  }, [order]);

  return (
    <AdminContainer link="vendas">
      <ButtonsFormAdmin
        path="/admin/vendas"
        handleEdit={handleEdit}
        handleSubmit={handleSubmit}
        isReadOnly={isReadOnly}
        isSaving={isSaving}
      />

      <Nav variant="tabs" activeKey={tab} className="order-page-admin nav">
        <Nav.Item>
          <Nav.Link
            eventKey="details"
            onClick={() => handleChangeTab('details')}
          >
            Informações gerais
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="shipping"
            onClick={() => handleChangeTab('shipping')}
          >
            Informações de envio
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="products"
            onClick={() => handleChangeTab('products')}
          >
            Lista de produtos
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className="order-page-admin container">
        {tab === 'details' && (
          <div className="order-page-admin info container">
            <Form.Label className="order-page-admin info label">
              Número do Pedido:
            </Form.Label>
            <Form.Control
              className="order-page-admin info control"
              value={`#${order.invoice}`}
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
              value={order.status_order}
              disabled={isReadOnly}
            >
              <option value="" hidden>
                Selecione o status do pedido
              </option>
              {getStatusOptions()}
            </Form.Control>

            <Form.Label className="order-page-admin info label">
              Cliente:
            </Form.Label>
            <Form.Control
              className="order-page-admin info control"
              value={order.name_user}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin info label">
              Data da compra:
            </Form.Label>
            <Form.Control
              className="order-page-admin info control"
              value={order.selled_date}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin info label">
              Quantidade de produtos:
            </Form.Label>
            <Form.Control
              className="order-page-admin info control"
              value={order.quantity}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin info label">
              Total da venda:
            </Form.Label>
            <Form.Control
              className="order-page-admin info control"
              value={`R$ ${order.value_total}`}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin info label">
              Forma de Pagamento:
            </Form.Label>
            <Form.Control
              className="order-page-admin info control"
              value={order.payment_method}
              readOnly
              plaintext
            />
          </div>
        )}

        {tab === 'shipping' && (
          <div className="order-page-admin shipping container">
            <Form.Label className="order-page-admin shipping label">
              Endereço de Entrega:
            </Form.Label>
            <Form.Control
              className="order-page-admin shipping control"
              value="endereço"
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin shipping label">
              Método de envio:
            </Form.Label>
            <Form.Control
              className="order-page-admin shipping control"
              value={order.send_method}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin shipping label">
              Valor de envio:
            </Form.Label>
            <Form.Control
              className="order-page-admin shipping control"
              value={`R$ ${order.value_shipping}`}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin shipping label">
              Código de Rastreio:
            </Form.Label>
            <Form.Control
              className="order-page-admin shipping control"
              value={order.tracking_code}
              name="tracking_code"
              readOnly={isReadOnly}
              onChange={handleChange}
            />

            <Form.Label className="order-page-admin shipping label">
              Data de Envio:
            </Form.Label>
            <Form.Control
              className="order-page-admin shipping control"
              value={order.shipped_date}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin shipping label">
              Data prevista da entrega:
            </Form.Label>
            <Form.Control
              className="order-page-admin shipping control"
              value={order.estimated_date}
              readOnly
              plaintext
            />

            <Form.Label className="order-page-admin shipping label">
              Entregue em:
            </Form.Label>
            <Form.Control
              className="order-page-admin shipping control"
              value={order.finished_code}
              readOnly
              plaintext
            />
          </div>
        )}
        {tab === 'products' && (
          <TableList itens={orderProducts} tableHead={th} />
        )}
      </Container>
    </AdminContainer>
  );
}

export default OrderPage;
