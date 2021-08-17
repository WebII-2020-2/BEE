import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import CardsApiService from '../../../../../services/api/CardsApiService';
import AddressApiService from '../../../../../services/api/AddressApiService';
import LogonApiService from '../../../../../services/api/LogonApiService';
import LoadingPage from '../../../../../components/Shared/LoadingPage';
import visa from '../../../../../assets/img/visa-card.png';
import mastercard from '../../../../../assets/img/master-card.png';

function ReviewInfo(props) {
  const { card_id: cardId, address_id: addressId } = props;
  const [card, setCard] = useState({});
  const [address, setAddress] = useState({ zip_code: '' });
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const resp = await LogonApiService.getUser()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });

      if (resp.success) {
        setUser(resp.data);
        console.warn(user);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getAddress = async () => {
    setIsLoading(true);
    try {
      const resp = await AddressApiService.getById(addressId)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setAddress(resp.data);
        console.warn(address);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getCard = async () => {
    setIsLoading(true);
    try {
      const resp = await CardsApiService.getById(cardId)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setCard(resp.data);
        console.warn(card);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAddress();
    getCard();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <div className="card-credit-card">
        <Row>
          <Col>
            <b>Nome :</b> {user.name}
          </Col>
          <Col>
            <b>CPF :</b> {user.cpf}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <b>E-mail :</b> {user.email}
          </Col>
          <Col sm={6}>
            <b>Telefone :</b> {user.phone}
          </Col>
        </Row>
      </div>
      <div className="card-credit-card">
        <Row>
          <Col>
            <b>Logradouro</b> <br />{' '}
            {`${address.public_place}, ${address.number}`}
          </Col>
          <Col>
            <b>CEP</b> <br />
            {`${address.zip_code.substr(0, 5)}-${address.zip_code.substr(5)}`}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <b>Bairro</b> <br /> {address.district}
          </Col>
          <Col sm={6}>
            <b>Cidade / Estado</b> <br /> {`${address.city} / ${address.state}`}
          </Col>
        </Row>
        {address.complement && (
          <Row>
            <Col>
              <b>Complemento</b> <br /> {address.complement}
            </Col>
          </Row>
        )}
      </div>
      <div className="card-credit-card pt-1">
        <Row>
          <Col>
            <b>Cartão :</b> {card.number}
            {card.flag === 'Visa' && <img src={visa} alt="cartão Visa" />}
            {card.flag === 'MasterCard' && (
              <img src={mastercard} alt="cartão MasterCard" />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <b>Nome :</b> {card.holder}
          </Col>
          <Col>
            <b>Data de expiração :</b> {card.expiration_date}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ReviewInfo;
