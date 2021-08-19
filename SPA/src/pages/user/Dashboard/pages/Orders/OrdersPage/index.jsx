import React, { useEffect, useState } from 'react';
import { Badge, Col, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import OrderApiService from '../../../../../../services/api/OrderApiService';
import orderStatus from '../../../../../../services/utils/orderStatus';
import formatDate from '../../../../../../services/utils/formatDate';
import visa from '../../../../../../assets/img/visa-card.png';
import mastercard from '../../../../../../assets/img/master-card.png';

// import imageTest from '../../../../../../assets/img/user.jpeg';

function OrdersPage(props) {
  const { match } = props;
  const history = useHistory();
  const [values, setValues] = useState({
    id: '',
    invoice: '',
    selled_date: '',
    value_total_products: 0,
    value_shipping: 0,
    value_total: 0,
    quantity: 0,
    status_order: 0,
    send_method: '',
    tracking_code: '',
    shipped_date: '',
    estimated_date: '',
    finished_date: '',
    address: {
      public_place: '',
      district: '',
      number: '',
      complement: '',
      zip_code: '',
      city: '',
      state: '',
      reference_point: '',
    },
    payment_method: '',
    card: ['', ''],
    products: [],
  });

  const getOrder = async () => {
    try {
      const resp = await OrderApiService.getByIdUser(match.params.invoice)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setValues(resp.data);
        console.warn(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      history.push('/user/dashboard/pedidos');
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const setColorStatus = (status) => {
    if ([1, 2, 8].includes(status)) return 'status-yellow';
    if ([4, 9].includes(status)) return 'status-red';
    if ([3, 7].includes(status)) return 'status-green';
    if ([5, 6].includes(status)) return 'status-blue';
    return '';
  };

  const productsOrder = (value) => (
    <Row key={value.id} className="products-order-dashboard">
      <Col className="d-block">
        <Image className="image-order-dashboard" src={value.image} />
        <b>{value.name}</b>
      </Col>
      <Col className="d-flex justify-content-center">{`${value.quantity}x`}</Col>
      <Col>
        {value.unitary_value_selled.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Col>
      {/* <Col>
        {value.unitary_value_product === value.unitary_value_selled ? (
          value.unitary_value_product.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        ) : (
          <span>
            <span className="old-price-order-dashboard">
              {value.unitary_value_product.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            {value.unitary_value_selled.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        )}
      </Col> */}
    </Row>
  );

  return (
    <div className="container-dashboard">
      <h2>Número do pedido: {values.invoice}</h2>
      <div className="card-order-page-dashboard">
        <Row>
          <Col className="order-status m-0">
            <b>Status :</b>
            <Badge className={`${setColorStatus(values.status_order)} ml-3`}>
              {orderStatus.convert(values.status_order)}
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col className="m-0">
            <b>Forma de pagamento :</b>{' '}
            {`${values.payment_method} | ${values.card[0]}`}
            {values.card[1] === 'Visa' && <img src={visa} alt="cartão Visa" />}
            {values.card[1] === 'MasterCard' && (
              <img src={mastercard} alt="cartão MasterCard" />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <b>Data da compra :</b> {formatDate(values.selled_date)}
          </Col>
        </Row>
        {values.tracking_code && (
          <Row>
            <Col>
              <b>Código de rastreio :</b> {values.tracking_code}
            </Col>
          </Row>
        )}
        {values.shipped_date && (
          <Row>
            <Col>
              <b>Data de envio :</b> {formatDate(values.shipped_date)}
            </Col>
          </Row>
        )}
        {values.estimated_date && (
          <Row>
            <Col>
              <b>Data de entrega estimada :</b>{' '}
              {formatDate(values.estimated_date)}
            </Col>
          </Row>
        )}
        {values.finished_date && (
          <Row>
            <Col>
              <b>Data de finalização :</b> {formatDate(values.finished_date)}
            </Col>
          </Row>
        )}
      </div>
      <h3>Endereço</h3>
      <div className="card-order-page-dashboard">
        <Row>
          <Col>
            <b>Logradouro :</b>{' '}
            {`${values.address.public_place}, ${values.address.number}`}
          </Col>
          <Col>
            <b>CEP :</b>{' '}
            {`${values.address.zip_code.substr(
              0,
              5
            )}-${values.address.zip_code.substr(5)}`}
          </Col>
        </Row>
        <Row>
          <Col>
            <b>Bairro :</b> {values.address.district}
          </Col>
          <Col>
            <b>Cidade / Estado :</b>{' '}
            {`${values.address.city} / ${values.address.state}`}
          </Col>
        </Row>
        {values.address.complement && (
          <Row>
            <Col>
              <b>Complemento :</b> {values.address.complement}
            </Col>
          </Row>
        )}
      </div>
      <h3>Produtos</h3>
      <div className="card-order-page-dashboard products">
        {values.products.map((product) => productsOrder(product))}
        <hr />
        <Row>
          <Col>
            Subtotal dos produtos:{' '}
            <span>
              {values.value_total_products.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            Preço de envio:{' '}
            <span>
              {values.value_shipping.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="order-value-total-dashboard">
            Total :{' '}
            <span>
              {values.value_total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default OrdersPage;
