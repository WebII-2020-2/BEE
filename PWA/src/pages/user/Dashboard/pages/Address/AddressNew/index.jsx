import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormAddress from '../../../../../../components/Shared/FormAddress';
import AddressApiService from '../../../../../../services/api/AddressApiService';

function AddressNew() {
  const history = useHistory();
  const initialValuesAddress = {
    zip_code: '',
    public_place: '',
    number: '',
    district: '',
    city: '',
    state: '',
    complement: '',
    reference_point: '',
  };
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (form) => {
    try {
      setIsSaving(true);
      const resp = await AddressApiService.createNew(form)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        history.push('user/dashboard/enderecos');
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container-dashboard">
      <h2>Adicionar endereço</h2>
      <FormAddress
        valuesAddress={initialValuesAddress}
        isSaving={isSaving}
        handleSubmitAddress={handleSubmit}
        isNew
      />
    </div>
  );
}

export default AddressNew;
