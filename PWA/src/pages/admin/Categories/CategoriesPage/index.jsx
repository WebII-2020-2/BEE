import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../../components/Admin/Container';
import FormCategoryAdmin from '../../../../components/Admin/FormCategory';
import ButtonsForm from '../../../../components/Admin/ButtonsForm';
import ValidationErrorsContainer from '../../../../components/Shared/ValidationErrorsContainer';
import validationSchema from '../../../../services/validations/validationCategoryAdmin';
import CategoryApiService from '../../../../services/api/CategoryApiService';

function CategoriesPage(props) {
  const { match } = props;
  const history = useHistory();

  const [values, setValues] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);

  const getCategory = async () => {
    try {
      const resp = await CategoryApiService.getById(
        Number(match.params.id)
      ).then((r) => r.data);
      if (resp.success) {
        setValues(resp.data);
      } else {
        throw new Error(`Unable to get categories: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
      history.push('/admin/categorias/page/1');
    }
  };

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const form = {
      ...values,
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
        const resp = await CategoryApiService.update(values.id, form).then(
          (r) => r.data
        );
        if (resp.success) {
          handleEdit();
        } else {
          throw new Error(`${resp.error.error_message}`);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await CategoryApiService.remove(values.id).then(
        (r) => r.data
      );
      if (resp.success) {
        history.push('/admin/categorias/page/1');
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearErrors = () => {
    setErrors([]);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <AdminContainer link="categorias">
      <ButtonsForm
        path="/admin/categorias/page/1"
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
      <FormCategoryAdmin
        values={values}
        update={setValues}
        readOnly={isReadOnly}
      />
    </AdminContainer>
  );
}

export default CategoriesPage;
