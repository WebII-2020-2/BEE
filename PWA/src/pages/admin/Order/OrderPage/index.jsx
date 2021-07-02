import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsForm from '../../../../components/Admin/ButtonsForm';
import OrderAdminApiService from '../../../../services/api/OrderAdminApiService';
import { Details, Shipping, Products } from './Tabs';
import './OrderPage.css';

function OrderPage(props) {
  const { match } = props;
  const [order, setOrder] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [tab, setTab] = useState('details');
  const history = useHistory();

  const getOrder = async () => {
    try {
      const resp = await OrderAdminApiService.getById(match.params.id).then(
        (r) => r.data
      );
      if (resp.success) {
        setOrder({
          ...resp.data,
        });
      }
      throw new Error(`${resp.error.error_message}`);
    } catch (err) {
      console.error(err);
      history.push('/admin/vendas/page/1');
    }
  };

  const handleChange = (event) => {
    setOrder({
      ...order,
      [event.target.name]: Number(event.target.value) || event.target.value,
    });
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
        throw new Error(`${resp.error.error_message}`);
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

  return (
    <AdminContainer link="vendas">
      <ButtonsForm
        path="/admin/vendas/page/1"
        handleEdit={handleEdit}
        handleSubmit={handleSubmit}
        isReadOnly={isReadOnly}
        isSaving={isSaving}
      />

      <Nav variant="tabs" activeKey={tab} className="order-page-admin nav">
        <Nav.Item>
          <Nav.Link eventKey="details" onClick={() => setTab('details')}>
            Informações gerais
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="shipping" onClick={() => setTab('shipping')}>
            Informações de envio
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="products" onClick={() => setTab('products')}>
            Lista de produtos
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className="order-page-admin container">
        {tab === 'details' && (
          <Details
            order={order}
            handleChange={handleChange}
            isReadOnly={isReadOnly}
          />
        )}
        {tab === 'shipping' && (
          <Shipping
            order={order}
            isReadOnly={isReadOnly}
            handleChange={handleChange}
          />
        )}
        {tab === 'products' && <Products order={order} />}
      </Container>
    </AdminContainer>
  );
}

export default OrderPage;
