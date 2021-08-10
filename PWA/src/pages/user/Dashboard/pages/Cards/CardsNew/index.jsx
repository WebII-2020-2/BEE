import React from 'react';
import FormCard from '../../../../../../components/Shared/FormCard';

function CardsNew() {
  const initialValuesCard = {
    number: '',
    flag: '',
    security_code: '',
    expiration_date: '',
    holder: '',
  };

  return (
    <div className="container-dashboard">
      <h2>Novo cartão</h2>
      <FormCard valuesCard={initialValuesCard} isNew />
    </div>
  );
}

export default CardsNew;
