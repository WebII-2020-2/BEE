import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Trash } from 'react-feather';
import LoadingPage from '../../../../../components/Shared/LoadingPage';
import CardsApiService from '../../../../../services/api/CardsApiService';
import visa from '../../../../../assets/img/visa-card.png';
import mastercard from '../../../../../assets/img/master-card.png';
import PaymentMethodNew from './PaymentMethodNew';
import ConfirmationAlert from '../../../../../components/Shared/ConfirmationAlert';

function PaymentMethod(props) {
  const { handleUpdateValues, cardId } = props;
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabList, setTabList] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const getCards = async () => {
    try {
      setIsLoading(true);
      const resp = await CardsApiService.getAll()
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
    }
  };

  useEffect(() => {
    if (tabList) getCards();
  }, [tabList]);

  const handleSelected = (id) => {
    handleUpdateValues({ card_id: id });
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async () => {
    try {
      const resp = await CardsApiService.remove(cardId)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        handleShowModal();
        handleUpdateValues({ card_id: '' });
        getCards();
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  const handleTab = () => {
    setTabList(!tabList);
  };

  const getModal = () => (
    <ConfirmationAlert
      show={showModal}
      handleShow={handleShowModal}
      handleSubmit={handleDelete}
      modalInfo="Tem certeza? O cartão selecionado será deletado!"
    />
  );

  const cardCreditCard = (value) => (
    <div
      className={`card-credit-card pt-1 ${
        cardId === value.id && 'card-selected'
      }`}
      key={value.id}
      onClick={() => handleSelected(value.id)}
      aria-hidden
    >
      <Row>
        <Col>
          <b>Cartão :</b> {value.number}
          {value.flag === 'Visa' && <img src={visa} alt="cartão Visa" />}
          {value.flag === 'MasterCard' && (
            <img src={mastercard} alt="cartão MasterCard" />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <b>Nome :</b> {value.holder}
        </Col>
        <Col>
          <b>Data de expiração :</b> {value.expiration_date}
        </Col>
      </Row>
    </div>
  );

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      {getModal()}
      {tabList ? (
        <>
          <div className="header-datas-dashboard">
            {values.length < 3 ? (
              <Button variant="dark" onClick={handleTab}>
                Cadastrar
              </Button>
            ) : (
              <span />
            )}
            {cardId && (
              <Button variant="danger" onClick={handleShowModal}>
                <Trash />
              </Button>
            )}
          </div>
          {values.map((value) => cardCreditCard(value))}
        </>
      ) : (
        <PaymentMethodNew handleTab={handleTab} />
      )}
    </div>
  );
}

export default PaymentMethod;
