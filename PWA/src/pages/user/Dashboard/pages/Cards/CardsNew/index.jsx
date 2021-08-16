import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormCard from '../../../../../../components/Shared/FormCard';
import CardsApiService from '../../../../../../services/api/CardsApiService';

function CardsNew() {
  const history = useHistory();
  const initialValuesCard = {
    number: '',
    flag: '',
    security_code: '',
    expiration_date: '',
    holder: '',
  };
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (form) => {
    try {
      setIsSaving(true);
      const resp = await CardsApiService.createNew({
        ...form,
        expiration_date: `${form.expiration_date.split('-')[1]}/${
          form.expiration_date.split('-')[0]
        }`,
        security_code: Number(form.security_code),
      })
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        history.push('/user/dashboard/cartoes');
      } else {
        console.error(`ERRO ${resp.error.code}: ${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container-dashboard">
      <h2>Novo cartão</h2>
      <FormCard
        valuesCard={initialValuesCard}
        isSaving={isSaving}
        handleSubmitCard={handleSubmit}
        isNew
        path="/user/dashboard/cartoes"
      />
    </div>
  );
}

export default CardsNew;
