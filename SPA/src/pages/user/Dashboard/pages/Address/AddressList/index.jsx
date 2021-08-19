import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import LoadingPage from '../../../../../../components/Shared/LoadingPage';
import AddressApiService from '../../../../../../services/api/AddressApiService';

function AddressList(props) {
  const { match } = props;
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    getAddress();
  }, []);

  const cardAddress = (value) => (
    <div className="card-address-dashboard" key={value.id}>
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
      <Row>
        <Col className="edit-address-dashboard m-0">
          <Button variant="warning" href={`${match.url}/${value.id}`}>
            Editar
          </Button>
        </Col>
      </Row>
    </div>
  );

  if (isLoading) return <LoadingPage />;

  return (
    <div className="container-dashboard mb-4">
      {values.length < 3 && (
        <Button
          variant="dark"
          href={`${match.url}/novo`}
          className="align-self-center"
        >
          Cadastrar novo endereço
        </Button>
      )}
      {values.map((value) => cardAddress(value))}
    </div>
  );
}

export default AddressList;
