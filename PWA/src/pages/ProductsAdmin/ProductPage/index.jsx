import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminContainer from '../../../components/AdminContainer';
import FormProductAdmin from '../../../components/FormProductAdmin';
import ValidationErrorsContainer from '../../../components/ValidationErrorsContainer';
import ButtonsFormAdmin from '../../../components/ButtonsFormAdmin';
import validationSchema from '../../../services/validations/validationProductAdmin';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';

function ProductPage(props) {
  const { match } = props;
  const history = useHistory();

  const [values, setValues] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);

  const getProduct = async () => {
    try {
      const resp = await ProductAdminApiService.getById(
        Number(match.params.id)
      ).then((r) => r.data);
      if (resp.success) {
        setValues(resp.data);
      } else {
        throw new Error(`Unable to get products: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
      history.push('/admin/produtos');
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
        const resp = await ProductAdminApiService.update(values.id, form).then(
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
      const resp = await ProductAdminApiService.remove(values.id).then(
        (r) => r.data
      );
      if (resp.success) {
        history.push('/admin/produtos');
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
    getProduct();
  }, []);

  return (
    <AdminContainer link="produtos">
      <ButtonsFormAdmin
        path="/admin/produtos/page/1"
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
      <FormProductAdmin
        values={values}
        update={setValues}
        readOnly={isReadOnly}
      />
    </AdminContainer>
  );
}

export default ProductPage;
