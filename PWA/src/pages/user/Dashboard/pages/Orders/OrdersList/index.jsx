import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import LoadingPage from '../../../../../../components/Shared/LoadingPage';
import OrderApiService from '../../../../../../services/api/OrderAdminApiService';
import formatDate from '../../../../../../services/utils/formatDate';
import formatFloat from '../../../../../../services/utils/formatFloat';
import orderStatus from '../../../../../../services/utils/orderStatus';
import visa from '../../../../../../assets/img/visa-card.png';
import mastercard from '../../../../../../assets/img/master-card.png';

function OrdersList(props) {
  const { match } = props;
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualPage, setActualPage] = useState(1);

  // const valuesTest = [
  //   {
  //     invoice: '611859a17464b',
  //     quantity: 1,
  //     value_total: 26.25,
  //     status_order: 3,
  //     selled_date: '2021-08-15',
  //     card: ['***********24242', 'Visa'],
  //   },
  //   {
  //     invoice: '551259a17464b',
  //     quantity: 4,
  //     value_total: 45.25,
  //     status_order: 5,
  //     selled_date: '2021-08-15',
  //     card: ['***********24242', 'MasterCard'],
  //   },
  //   {
  //     invoice: '551259a12512',
  //     quantity: 6,
  //     value_total: 45.25,
  //     status_order: 2,
  //     selled_date: '2020-09-22',
  //     card: ['***********24242', 'MasterCard'],
  //   },
  // ];

  const setColorStatus = (status) => {
    if ([1, 2, 8].includes(status)) return 'status-yellow';
    if ([4, 9].includes(status)) return 'status-red';
    if ([3, 7].includes(status)) return 'status-green';
    if ([5, 6].includes(status)) return 'status-blue';
    return '';
  };

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const resp = await OrderApiService.getAllUser()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setValues(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsLoading(false);
      // setValues(valuesTest);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const totalPages = useMemo(() => {
    if (values) return Math.ceil(values.length / 4);
    return 0;
  }, [values]);

  const ordersPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 4;
    const indexMax = indexMin + 4;
    if (values) {
      return values.filter((x, index) => index >= indexMin && index < indexMax);
    }
    return [];
  }, [actualPage, values]);

  const handlePrevious = () => {
    setActualPage(actualPage - 1);
  };

  const handleNext = () => {
    setActualPage(actualPage + 1);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="container-dashboard">
      {ordersPerPage.map((value) => (
        <div className="card-order-dashboard" key={value.invoice}>
          <Row className="mb-2">
            <Col>
              Número do pedido: <b>{value.invoice}</b>
            </Col>
            <Col>
              Data da compra: <b>{formatDate(value.selled_date)}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              Quantidade: <b>{value.quantity}</b>
            </Col>
            <Col>
              Valor total: <b>R$ {formatFloat(value.value_total)}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              Cartão: <b>{value.card[0]}</b>
              {value.card[1] === 'Visa' && <img src={visa} alt="cartão Visa" />}
              {value.card[1] === 'MasterCard' && (
                <img src={mastercard} alt="cartão MasterCard" />
              )}
            </Col>
          </Row>
          <Row>
            <Col className="order-status mb-1" sm={6}>
              <Badge className={setColorStatus(value.status_order)}>
                {orderStatus.convert(value.status_order)}
              </Badge>
            </Col>
            <Col className="edit-address-dashboard" sm={6}>
              <Button variant="warning" href={`${match.url}/${value.invoice}`}>
                Ver mais
              </Button>
            </Col>
          </Row>
        </div>
      ))}
      {totalPages > 1 && (
        <Row className="pagination-component admin mb-3">
          <Button
            variant="outline-dark"
            disabled={actualPage <= 1 || actualPage > totalPages}
            onClick={handlePrevious}
          >
            <ChevronLeft />
          </Button>
          <p>{actualPage}</p>
          <Button
            variant="outline-dark"
            disabled={actualPage < 1 || actualPage >= totalPages}
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </Row>
      )}
    </div>
  );
}

export default OrdersList;
