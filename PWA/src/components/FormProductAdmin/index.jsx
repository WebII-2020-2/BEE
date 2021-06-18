import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Image } from 'react-bootstrap';
import ProductAdminApiService from '../../services/api/ProductAdminApiService';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import emptyImage from '../../assets/img/empty-image.png';
import ButtonsFormAdmin from '../ButtonsFormAdmin';
import validationSchema from '../../services/validations/validationProductAdmin';
import './FormProductAdmin.css';
import ValidationErrorsContainer from '../ValidationErrorsContainer';

function FormProdutoAdmin(props) {
  const { isNew, productId } = props;
  const history = useHistory();

  const [values, setValues] = useState({
    id: '',
    name: '',
    unity: '',
    description: '',
    quantity: 0,
    category_id: 0,
    unitary_value: 0,
    image: '',
  });
  const [isReadOnly, setIsReadOnly] = useState(!isNew);
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState([]);

  const getCategories = async () => {
    try {
      const resp = await CategoryAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setCategories(resp.data);
      } else {
        throw new Error(`Failed to get categories: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getProduct = async () => {
    try {
      const resp = await ProductAdminApiService.getById(Number(productId)).then(
        (r) => r.data
      );
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

  useEffect(() => {
    getCategories();
    if (!isNew) {
      getProduct();
    }
  }, []);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleUpdate = (event) => {
    if (event.target.name === 'image') {
      const file = event.target.files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) =>
          setValues({
            ...values,
            [event.target.name]: e.target.result,
          });
        reader.readAsDataURL(file);
      }
    } else {
      setValues({
        ...values,
        [event.target.name]: Number(event.target.value) || event.target.value,
      });
    }
  };

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
        if (isNew) {
          delete form.id;
          const resp = await ProductAdminApiService.create(form).then(
            (r) => r.data
          );
          if (resp.success) {
            history.push('/admin/produtos');
          } else {
            throw new Error(`Failed to create product: ${resp.error}`);
          }
        } else {
          const resp = await ProductAdminApiService.update(form).then(
            (r) => r.data
          );
          if (resp.success) {
            handleEdit();
          } else {
            throw new Error(`Failed to update product: ${resp.error}`);
          }
        }
      }
    } catch (e) {
      console.warn(e);
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
        throw new Error(`Failed to delete product: ${resp.error}`);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleClearErrors = () => {
    setErrors([]);
  };

  return (
    <Form>
      <ButtonsFormAdmin
        path="/admin/produtos"
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isNew={isNew}
        isReadOnly={isReadOnly}
        isSaving={isSaving}
      />

      {errors.length > 0 && (
        <ValidationErrorsContainer
          errors={[...errors]}
          clear={handleClearErrors}
        />
      )}

      <Form.Group className="form-product-admin container">
        <Form.Group className="form-product-admin group">
          <Form.Label className="form-product-admin label">Nome</Form.Label>
          <Form.Control
            className="form-product-admin control"
            readOnly={isReadOnly}
            type="text"
            name="name"
            value={values.name}
            onChange={handleUpdate}
          />
        </Form.Group>

        <Form.Group className="form-product-admin group">
          <Form.Label className="form-product-admin label">
            Categoria
          </Form.Label>
          <Form.Control
            className="form-product-admin control"
            disabled={isReadOnly}
            as="select"
            name="category_id"
            onChange={handleUpdate}
            value={values.category_id}
          >
            <option value="0" disabled>
              Escolha uma categoria
            </option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-product-admin group sm">
          <Form.Label className="form-product-admin label">Unidade</Form.Label>
          <Form.Control
            className="form-product-admin control"
            readOnly={isReadOnly}
            type="text"
            name="unity"
            value={values.unity}
            onChange={handleUpdate}
          />
        </Form.Group>

        <Form.Group className="form-product-admin group sm">
          <Form.Label className="form-product-admin label">
            Quantidade
          </Form.Label>
          <Form.Control
            className="form-product-admin control"
            readOnly={isReadOnly}
            type="number"
            min="0"
            name="quantity"
            value={values.quantity}
            onChange={handleUpdate}
          />
        </Form.Group>

        <Form.Group className="form-product-admin group sm">
          <Form.Label className="form-product-admin label">Preço</Form.Label>
          <Form.Control
            className="form-product-admin control"
            readOnly={isReadOnly}
            type="number"
            min="0"
            name="unitary_value"
            value={values.unitary_value}
            onChange={handleUpdate}
          />
        </Form.Group>

        <Form.Group className="form-product-admin group image">
          <Image
            className="form-product-admin image"
            src={values.image || emptyImage}
          />
          <Form.File
            label="Selecione um arquivo"
            className="form-product-admin control"
            accept="image/*"
            disabled={isReadOnly}
            name="image"
            onChange={handleUpdate}
            custom
          />
        </Form.Group>

        <Form.Group className="form-product-admin group description">
          <Form.Label className="form-product-admin label">
            Descrição
          </Form.Label>
          <Form.Control
            as="textarea"
            className="form-product-admin control"
            readOnly={isReadOnly}
            name="description"
            value={values.description}
            onChange={handleUpdate}
          />
        </Form.Group>
      </Form.Group>
    </Form>
  );
}

export default FormProdutoAdmin;
