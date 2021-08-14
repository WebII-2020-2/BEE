import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../../../../../../components/Shared/LoadingPage';
import CardsApiService from '../../../../../../services/api/CardsApiService';

function CardsList(props) {
  const { match } = props;
  const history = useHistory();
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleCLickEdit = (id) => {
    history.push(`${match.url}/${id}`);
  };

  const trCards = () =>
    values.map((row) => (
      <tr key={row.id} onClick={() => handleCLickEdit(Object.values(row)[0])}>
        <td>{row.number}</td>
        <td>{row.flag}</td>
        <td>{row.expiration_date}</td>
      </tr>
    ));

  useEffect(() => {
    getCards();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="container-dashboard mb-4">
      {values.length < 3 && (
        <Button
          variant="dark"
          href={`${match.url}/novo`}
          className="align-self-center"
        >
          Cadastrar novo cartão
        </Button>
      )}
      <Table hover className="w-100 table-cards">
        <thead>
          <tr>
            <th>Nº do cartão</th>
            <th>Bandeira</th>
            <th>Validade</th>
          </tr>
        </thead>
        <tbody>{trCards()}</tbody>
      </Table>
    </div>
  );
}

export default CardsList;
