import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import AddressApiService from '../../../../../services/api/AddressApiService';
import LoadingPage from '../../../../../components/Shared/LoadingPage';
import AddressNew from './AddressNew';
import AddressPage from './AddressPage';

function Address(props) {
  const { handleUpdateValues, addressId } = props;
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState(1);

  const getAddress = async () => {
    try {
      setIsLoading(true);
      const resp = await AddressApiService.getAll()
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
    if (tab === 1) getAddress();
  }, [tab]);

  const handleSelected = (id, zipCode) => {
    handleUpdateValues({ address_id: id, cep: zipCode });
  };

  const handleTab = (newTab, isDelete) => {
    setTab(newTab);
    if (isDelete) handleUpdateValues({ address_id: '' });
  };

  const cardAddress = (value) => (
    <div
      className={`card-credit-card ${
        addressId === value.id && 'card-selected'
      }`}
      key={value.id}
      onClick={() => handleSelected(value.id, value.zip_code)}
      aria-hidden
    >
      <Row>
        <Col>
          <b>Logradouro</b> <br /> {`${value.public_place}, ${value.number}`}
        </Col>
        <Col>
          <b>CEP</b> <br />
          {`${value.zip_code.substr(0, 5)}-${value.zip_code.substr(5)}`}
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <b>Bairro</b> <br /> {value.district}
        </Col>
        <Col sm={6}>
          <b>Cidade / Estado</b> <br /> {`${value.city} / ${value.state}`}
        </Col>
      </Row>
      {value.complement && (
        <Row>
          <Col>
            <b>Complemento</b> <br /> {value.complement}
          </Col>
        </Row>
      )}
    </div>
  );

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      {tab === 1 && (
        <>
          <div className="header-datas-dashboard">
            {values.length < 3 ? (
              <Button variant="dark" onClick={() => handleTab(2)}>
                Cadastrar
              </Button>
            ) : (
              <span />
            )}
            {addressId && (
              <Button variant="warning" onClick={() => handleTab(3)}>
                Editar
              </Button>
            )}
          </div>
          {values.map((value) => cardAddress(value))}
        </>
      )}
      {tab === 2 && <AddressNew handleTab={handleTab} />}
      {tab === 3 && <AddressPage handleTab={handleTab} addressId={addressId} />}
    </div>
  );
}

export default Address;
