import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsForm from '../../../../components/Admin/ButtonsForm';
import CampaignApiService from '../../../../services/api/CampaignApiService';
import FormCampaign from '../../../../components/Admin/FormCampaign';
import ValidationErrorsContainer from '../../../../components/Shared/ValidationErrorsContainer';
import validationSchema from '../../../../services/validations/validationCampaign';

function CampaignsNew() {
  const history = useHistory();

  const [values, setValues] = useState({
    title: '',
    description: '',
    active: true,
    image: '',
    products: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    setIsSaving(true);
    const form = {
      ...values,
      active: values.active ? 1 : 0,
    };
    try {
      const isValid = await validationSchema
        .validate(form, { abortEarly: false })
        .then(() => {
          setErrors([]);
          return true;
        })
        .catch((err) => {
          setErrors([...err.errors]);
          return undefined;
        });
      if (isValid !== undefined) {
        const resp = await CampaignApiService.createNew(form)
          .then((r) => r.data)
          .catch((r) => r.response.data);
        if (resp.success) {
          history.push('/admin/campanhas/page/1');
        } else {
          throw resp.error;
        }
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearErrors = () => {
    setErrors([]);
  };

  return (
    <AdminContainer link="campanhas">
      <ButtonsForm
        path="/admin/campanhas/page/1"
        handleSubmit={handleSubmit}
        isNew
        isSaving={isSaving}
      />
      <ValidationErrorsContainer
        errors={[...errors]}
        clear={handleClearErrors}
      />
      <FormCampaign values={values} update={setValues} />
    </AdminContainer>
  );
}

export default CampaignsNew;
