import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import FormCategoryAdmin from '../../../../components/Admin/FormCategory';
import ButtonsForm from '../../../../components/Admin/ButtonsForm';
import ValidationErrorsContainer from '../../../../components/Shared/ValidationErrorsContainer';
import validationSchema from '../../../../services/validations/validationCategoryAdmin';
import CategoryAdminApiService from '../../../../services/api/CategoryAdminApiService';

function CategoriesNew() {
  const history = useHistory();

  const [values, setValues] = useState({
    name: '',
    description: '',
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
        const resp = await CategoryAdminApiService.createNew(form).then(
          (r) => r.data
        );
        if (resp.success) {
          history.push('/admin/categorias');
        } else {
          throw new Error(`Failed to create category: ${resp.error}`);
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
    <AdminContainer link="categorias">
      <ButtonsForm
        path="/admin/produtos/page/1"
        handleSubmit={handleSubmit}
        isNew
        isSaving={isSaving}
      />
      <ValidationErrorsContainer
        errors={[...errors]}
        clear={handleClearErrors}
      />
      <FormCategoryAdmin values={values} update={setValues} />
    </AdminContainer>
  );
}

export default CategoriesNew;
