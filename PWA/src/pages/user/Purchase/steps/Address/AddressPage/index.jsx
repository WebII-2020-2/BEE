import React, { useEffect, useState } from 'react';
import FormAddress from '../../../../../../components/Shared/FormAddress';
import AddressApiService from '../../../../../../services/api/AddressApiService';

function AddressPage(props) {
  const { handleTab, addressId } = props;
  const [values, setValues] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getAddress = async () => {
    try {
      const resp = await AddressApiService.getById(Number(addressId))
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setValues(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      handleTab(1);
    }
  };

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleSubmit = async (form) => {
    try {
      setIsSaving(true);
      const resp = await AddressApiService.update(addressId, form)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setValues(form);
        handleEdit();
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await AddressApiService.remove(addressId)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        handleTab(1, true);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleTabFor1 = () => {
    handleTab(1);
  };

  return (
    <FormAddress
      valuesAddress={values}
      handleSubmitAddress={handleSubmit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      isSaving={isSaving}
      isReadOnly={isReadOnly}
      handleStep={handleTabFor1}
    />
  );
}

export default AddressPage;
