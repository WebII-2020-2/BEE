import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormAddress from '../../../../../../components/Shared/FormAddress';
import AddressApiService from '../../../../../../services/api/AddressApiService';

function AddressPage(props) {
  const { match } = props;
  const history = useHistory();

  const [values, setValues] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getAddress = async () => {
    try {
      const resp = await AddressApiService.getById(Number(match.params.id))
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setValues(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      history.push('/user/dashboard/enderecos');
    }
  };

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleSubmit = async (form) => {
    try {
      setIsSaving(true);
      const resp = await AddressApiService.update(match.params.id, form)
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
      const resp = await AddressApiService.remove(match.params.id)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        history.push('/user/dashboard/enderecos');
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="container-dashboard">
      <FormAddress
        valuesAddress={values}
        handleSubmitAddress={handleSubmit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isSaving={isSaving}
        isReadOnly={isReadOnly}
      />
    </div>
  );
}

export default AddressPage;
