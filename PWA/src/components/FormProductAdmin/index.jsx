import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { Form, Image } from 'react-bootstrap';
import ProductAdminApiService from '../../services/api/ProductAdminApiService';
import emptyImage from '../../assets/img/empty-image.png';
import ButtonsFormAdmin from '../ButtonsFormAdmin';
import './FormProductAdmin.css';

function FormProdutoAdmin(props) {
  const { isNew, formData } = props;
  const history = useHistory();

  const [values, setValues] = useState({
    id: formData.id,
    name: formData.name,
    weightUnity: formData.weightUnity,
    weight: formData.weight,
    quantity: formData.quantity,
    category: formData.category,
    price: formData.price,
  });
  const [image, setImage] = useState(formData.image);
  const [isReadOnly, setIsReadOnly] = useState(!isNew);

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
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const form = {
      id: values.id || Math.floor(Math.random() * 1000 + 1),
      image,
      name: values.name,
      price: Number(values.price),
      category: values.category,
      quantity: values.quantity,
      weight: values.weight,
      weightUnity: values.weightUnity,
    };

    try {
      if (isNew) {
        ProductAdminApiService.createNew(form);
        history.push('/admin/produtos');
      }
      ProductAdminApiService.update(form);
      handleEdit();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = () => {
    try {
      ProductAdminApiService.remove(values.id);
      history.push('/admin/produtos');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form>
      <div className="actions-form-product-admin">
        <Link
          to="/admin/produtos"
          className="btn btn-admin-produto voltar btn-secondary"
        >
          <ArrowLeft />
          Voltar
        </Link>
        <ButtonsFormAdmin
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isNew={isNew}
          isReadOnly={isReadOnly}
        />
      </div>

      <Form.Group className="form-product-admin">
        <Form.Label className="form-product-label-name">Nome</Form.Label>
        <Form.Control
          className="form-product-name"
          readOnly={isReadOnly}
          type="text"
          name="name"
          value={values.name}
          onChange={handleUpdate}
        />

        <Form.Label className="form-product-label-weight-unity">
          Unidade
        </Form.Label>
        <Form.Control
          className="form-product-weight-unity"
          readOnly={isReadOnly}
          type="text"
          name="weightUnity"
          value={values.weightUnity}
          onChange={handleUpdate}
          required
        />

        <Form.Label className="form-product-label-weight">Peso</Form.Label>
        <Form.Control
          className="form-product-weight"
          readOnly={isReadOnly}
          type="text"
          name="weight"
          value={values.weight}
          onChange={handleUpdate}
          required
        />

        <Form.Label className="form-product-label-quantity">
          Quantidade
        </Form.Label>
        <Form.Control
          className="form-product-quantity"
          readOnly={isReadOnly}
          type="number"
          name="quantity"
          value={values.quantity}
          onChange={handleUpdate}
          required
        />

        <Form.Label className="form-product-label-price">Preço</Form.Label>
        <Form.Control
          className="form-product-price"
          readOnly={isReadOnly}
          type="number"
          name="price"
          value={values.price}
          onChange={handleUpdate}
          required
        />

        <Form.Label className="form-product-label-category">
          Categoria
        </Form.Label>
        <Form.Control
          className="form-product-category"
          disabled={isReadOnly}
          as="select"
          name="category"
          onChange={handleUpdate}
          defaultValue={formData.category ? values.category : ''}
          required
        >
          <option value="" disabled>
            Escolha uma categoria
          </option>
          <option value="graos">Grãos</option>
          <option value="apicola">Apícola</option>
          <option value="outro">Outro...</option>
        </Form.Control>

        <Image className="form-product-image" src={image || emptyImage} />

        <Form.Label className="form-product-label-file">Imagem</Form.Label>

        <Form.File
          id="form-product-admin-file"
          label="Selecione um arquivo"
          className="form-product-file"
          accept="image/*"
          disabled={isReadOnly}
          onChange={handleUpdateImage}
          custom
        />
      </Form.Group>
    </Form>
  );
}

export default FormProdutoAdmin;
