import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormCard from '../../../../../../components/Shared/FormCard';
import CardsApiService from '../../../../../../services/api/CardsApiService';

function CardsPage(props) {
  const { match } = props;
  const history = useHistory();

  const [values, setValues] = useState({});
  const isReadOnly = true;

  const getCard = async () => {
    try {
      const resp = await CardsApiService.getById(Number(match.params.id))
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setValues({
          ...resp.data,
          expiration_date: `${resp.data.expiration_date.split('/')[1]}-${
            resp.data.expiration_date.split('/')[0]
          }`,
        });
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      history.push('/user/dashboard/cartoes');
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await CardsApiService.remove(match.params.id)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        history.push('/user/dashboard/cartoes');
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  useEffect(() => {
    getCard();
  }, []);

  return (
    <div className="container-dashboard">
      <FormCard
        valuesCard={values}
        handleDelete={handleDelete}
        isReadOnly={isReadOnly}
        path="/user/dashboard/cartoes"
      />
    </div>
  );
}

export default CardsPage;
