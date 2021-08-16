import React, { useState } from 'react';
import FormAddress from '../../../../../../components/Shared/FormAddress';
import AddressApiService from '../../../../../../services/api/AddressApiService';

function AddressNew(props) {
  const { handleTab } = props;
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
        handleTab(1);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTabFor1 = () => {
    handleTab(1);
  };

  return (
    <FormAddress
      valuesAddress={initialValuesAddress}
      isSaving={isSaving}
      handleSubmitAddress={handleSubmit}
      isNew
      handleStep={handleTabFor1}
    />
  );
}

export default AddressNew;
