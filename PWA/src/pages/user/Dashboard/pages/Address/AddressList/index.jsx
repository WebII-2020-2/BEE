import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
// import AddressApiService from '../../../../../../services/api/AddressApiService';

function AddressList(props) {
  const { match } = props;
  const valuesTest = [
    {
      id: '1',
      public_place: 'Rua das bananas1',
      district: 'Bananal',
      number: '10',
      complement: 'Banana',
      zip_code: '10101012',
      city: 'Bananal',
      state: 'Ba',
      reference_point: 'Bananui1',
    },
    {
      id: '2',
      public_place: 'Rua das bananas2',
      district: 'Bananal',
      number: '10',
      complement: 'Banana',
      zip_code: '10101011',
      city: 'Bananal',
      state: 'Ba',
      reference_point: 'Bananui',
    },
  ];
  // const [values, setValues] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const getAddress = async () => {
  //   try {
  //     setIsLoading(true);
  //     const resp = await AddressApiService.getAll()
  //       .then((r) => r.data)
  //       .catch((r) => {
  //         throw r.response.data.error;
  //       });
  //     if (resp.success) {
  //       setValues(resp.data);
  //     }
  //   } catch (err) {
  //     console.error(`ERRO ${err.code}: ${err.error_message}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getAddress();
  // }, []);

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
        <Col>
          <b>Bairro</b> <br /> {value.district}
        </Col>
        <Col>
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
        <Col className="edit-address-dashboard">
          <Button variant="warning" href={`${match.url}/${value.id}`}>
            Editar
          </Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="container-dashboard">
      <Button
        variant="dark"
        href={`${match.url}/novo`}
        className="align-self-center"
      >
        Cadastrar novo endereço
      </Button>
      {valuesTest.map((value) => cardAddress(value))}
    </div>
  );
}

export default AddressList;
