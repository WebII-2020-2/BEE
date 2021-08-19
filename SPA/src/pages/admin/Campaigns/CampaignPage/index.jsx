import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import ButtonsForm from '../../../../components/Admin/ButtonsForm';
import CampaignApiService from '../../../../services/api/CampaignApiService';
import FormCampaign from '../../../../components/Admin/FormCampaign';
import ValidationErrorsContainer from '../../../../components/Shared/ValidationErrorsContainer';
import validationSchema from '../../../../services/validations/validationCampaign';
import CampaignProductsContext from '../../../../context/CampaignProductsContext';

function CampaignsPage(props) {
  const { match } = props;
  const history = useHistory();

  const [values, setValues] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);

  const getBanner = async () => {
    try {
      const resp = await CampaignApiService.getById(Number(match.params.id))
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setValues(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      history.push('/admin/campanhas/page/1');
    }
  };

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const form = {
      ...values,
      active: values.active ? 1 : 0,
    };
    delete form.id;
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
        const resp = await CampaignApiService.update(values.id, form)
          .then((r) => r.data)
          .catch((r) => {
            throw r.response.data.error;
          });
        if (resp.success) {
          handleEdit();
        }
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await CampaignApiService.remove(values.id)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        history.push('/admin/campanhas/page/1');
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  const handleSetProducts = (obj) => {
    setValues({ ...values, ...obj });
  };

  const handleClearErrors = () => {
    setErrors([]);
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <AdminContainer link="campanhas">
      <ButtonsForm
        path="/admin/campanhas/page/1"
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isReadOnly={isReadOnly}
        isSaving={isSaving}
      />
      <ValidationErrorsContainer
        errors={[...errors]}
        clear={handleClearErrors}
      />
      <CampaignProductsContext.Provider value={handleSetProducts}>
        <FormCampaign
          values={values}
          update={setValues}
          readOnly={isReadOnly}
        />
      </CampaignProductsContext.Provider>
    </AdminContainer>
  );
}

export default CampaignsPage;
