import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Image } from 'react-bootstrap';
import ProductAdminApiService from '../../services/api/ProductAdminApiService';
import CategoryAdminApiService from '../../services/api/CategoryAdminApiService';
import emptyImage from '../../assets/img/empty-image.png';
import ButtonsFormAdmin from '../ButtonsFormAdmin';
import './FormProductAdmin.css';

function FormProdutoAdmin(props) {
  const { isNew, formData } = props;
  const history = useHistory();

  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    id: formData.id || '',
    name: formData.name || '',
    unity: formData.unity || '',
    description: formData.description || '',
    quantity: formData.quantity || '',
    idCategory: formData.idCategory || '',
    unitaryValue: formData.unitaryValue || '',
  });
  const [image, setImage] = useState(formData.image);
  const [isReadOnly, setIsReadOnly] = useState(!isNew);

  const getCategories = async () => {
    try {
      const resp = await CategoryAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setCategories(resp.data);
      }
      throw new Error(`Failed to get categories: ${resp.error}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleUpdate = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateImage = (event) => {
    const file = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    let form = {
      image,
      name: values.name,
      unitaryValue: Number(values.unitaryValue),
      idCategory: values.idCategory,
      quantity: Number(values.quantity),
      description: values.description,
      unity: values.unity,
      barcode: '2333ABR',
      allotment: 8,
      expirationDate: '2021-06-15',
    };

    try {
      if (isNew) {
        const resp = await ProductAdminApiService.create(form).then(
          (r) => r.data
        );
        if (resp.success) {
          history.push('/admin/produtos');
        } else {
          throw new Error(`Failed to create product: ${resp.error}`);
        }
      }
      form = {
        id: values.id,
        ...form,
      };
      const resp = await ProductAdminApiService.update(form).then(
        (r) => r.data
      );
      if (resp.success) {
        handleEdit();
      } else {
        throw new Error(`Failed to update product: ${resp.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await ProductAdminApiService.delete(values.id).then(
        (r) => r.data
      );
      if (resp.succes) {
        history.push('/admin/produtos');
      } else {
        throw new Error(`Failed to delete product: ${resp.error}`);
      }
    } catch (e) {
      console.error(e);
    }
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
      />

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
            name="idCategory"
            onChange={handleUpdate}
            defaultValue={formData.idCategory ? values.idCategory : ''}
          >
            <option value="" disabled>
              Escolha uma categoria
            </option>
            {categories.map((idCategory) => (
              <option value={idCategory.id} key={idCategory.id}>
                {idCategory.name}
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
            name="unitaryValue"
            value={values.unitaryValue}
            onChange={handleUpdate}
          />
        </Form.Group>

        <Form.Group className="form-product-admin group image">
          <Image
            className="form-product-admin image"
            src={image || emptyImage}
          />
          <Form.File
            label="Selecione um arquivo"
            className="form-product-admin control"
            accept="image/*"
            disabled={isReadOnly}
            onChange={handleUpdateImage}
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
