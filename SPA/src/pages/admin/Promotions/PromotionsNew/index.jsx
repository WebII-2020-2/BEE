import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import FormPromotionAdmin from '../../../../components/Admin/FormPromotion';
import validationSchema from '../../../../services/validations/validationPromotionAdmin';
import PromotionApiService from '../../../../services/api/PromotionApiService';
import ButtonsForm from '../../../../components/Admin/ButtonsForm';
import ValidationErrorsContainer from '../../../../components/Shared/ValidationErrorsContainer';

function PromotionsNew() {
  const history = useHistory();

  const [values, setValues] = useState({
    name: '',
    type: 1,
    value: 0,
    start_date: '',
    end_date: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    setIsSaving(true);
    const form = {
      ...values,
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
        const resp = await PromotionApiService.createNew(form).then(
          (r) => r.data
        );
        if (resp.success) {
          history.push('/admin/promocoes/page/1');
        } else {
          throw new Error(`Failed to create promotion: ${resp.error}`);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearErrors = () => {
    setErrors([]);
  };

  return (
    <AdminContainer link="promocoes">
      <ButtonsForm
        path="/admin/promocoes/page/1"
        handleSubmit={handleSubmit}
        isNew
        isSaving={isSaving}
      />
      <ValidationErrorsContainer
        errors={[...errors]}
        clear={handleClearErrors}
      />
      <FormPromotionAdmin values={values} update={setValues} isNew />
    </AdminContainer>
  );
}

export default PromotionsNew;
