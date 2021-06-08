import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { Form, Image, Button } from 'react-bootstrap';
import ProductAdminApiService from '../../services/api/ProductAdminApiService';
import emptyImage from '../../assets/img/empty-image.png';
import './FormProdutoAdmin.css';

function FormProdutoAdmin(props) {
  const { isNew, formData } = props;

  const history = useHistory();

  const [id] = useState(formData.id);
  const [name, setName] = useState(formData.name);
  const [weightUnity, setWeightUnity] = useState(formData.weightUnity);
  const [weight, setWeight] = useState(formData.weight);
  const [quantity, setQuantity] = useState(formData.quantity);
  const [category, setCategory] = useState(formData.category);
  const [price, setPrice] = useState(formData.price);
  const [image, setImage] = useState(formData.image);
  const [isReadOnly, setIsReadOnly] = useState(!isNew);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleUpdateName = (event) => {
    setName(event.target.value);
  };

  const handleUpdateweightUnity = (event) => {
    setWeightUnity(event.target.value);
  };

  const handleUpdateweight = (event) => {
    setWeight(event.target.value);
  };

  const handleUpdateQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleUpdatePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleUpdateCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleUpdateImage = (event) => {
    const file = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const form = {
      id: id || Math.floor(Math.random() * 1000 + 1),
      image,
      name,
      price: Number(price),
      category,
      quantity,
      weight,
      weightUnity,
    };

    try {
      const response = isNew
        ? ProductAdminApiService.createNew(form)
        : ProductAdminApiService.update(form);
      console.log(response);
      history.push('/admin/produtos');
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    try {
      const response = ProductAdminApiService.remove(id);
      console.log(response);
      history.push('/admin/produtos');
    } catch (e) {
      console.log(e);
    }
  };

  const buttonsNew = () => (
    <Button
      variant="outline-success"
      className="btn-admin-produto"
      onClick={handleSubmit}
    >
      Salvar
    </Button>
  );

  const buttonsView = () => (isReadOnly ? (
    <div>
      <Button
        variant="outline-primary"
        className="btn-admin-produto"
        onClick={handleEdit}
      >
        Editar
      </Button>
      <Button
        variant="outline-danger"
        className="btn-admin-produto"
        onClick={handleDelete}
      >
        Excluir
      </Button>
    </div>
  ) : (
    <div>
      <Button
        variant="outline-danger"
        className="btn-admin-produto"
        onClick={handleEdit}
      >
        Cancelar
      </Button>
      <Button
        variant="outline-success"
        className="btn-admin-produto"
        onClick={handleSubmit}
      >
        Salvar
      </Button>
    </div>
  ));

  return (
    <Form>
      <div className="actions-form-product-admin">
        <Link to="/admin/produtos" className="arrow-back-product-admin">
          <ArrowLeft />
          {' '}
          Voltar
        </Link>
        {' '}
        {isNew ? buttonsNew() : buttonsView()}
      </div>

      <Form.Group className="form-product-admin">
        <Form.Label className="form-product-label-name">Nome</Form.Label>
        <Form.Control
          className="form-product-name"
          readOnly={isReadOnly}
          type="text"
          value={name}
          onChange={handleUpdateName}
        />

        <Form.Label className="form-product-label-weight-unity">
          Unidade
        </Form.Label>
        <Form.Control
          className="form-product-weight-unity"
          readOnly={isReadOnly}
          type="text"
          value={weightUnity}
          onChange={handleUpdateweightUnity}
        />

        <Form.Label className="form-product-label-weight">Peso</Form.Label>
        <Form.Control
          className="form-product-weight"
          readOnly={isReadOnly}
          type="text"
          value={weight}
          onChange={handleUpdateweight}
        />

        <Form.Label className="form-product-label-quantity">
          Quantidade
        </Form.Label>
        <Form.Control
          className="form-product-quantity"
          readOnly={isReadOnly}
          type="number"
          value={quantity}
          onChange={handleUpdateQuantity}
        />

        <Form.Label className="form-product-label-price">Preço</Form.Label>
        <Form.Control
          className="form-product-price"
          readOnly={isReadOnly}
          type="number"
          value={price}
          onChange={handleUpdatePrice}
        />

        <Form.Label className="form-product-label-category">
          Categoria
        </Form.Label>
        <Form.Control
          className="form-product-category"
          disabled={isReadOnly}
          as="select"
          onChange={handleUpdateCategory}
          value={formData.category ? category : 'none'}
        >
          <option value="none" disabled>
            Escolha uma categoria
          </option>
          <option value="graos">Grãos</option>
          <option value="apicola">Apícola</option>
          <option value="outro">Outro...</option>
        </Form.Control>

        <Image className="form-product-image" src={image || emptyImage} />

        <Form.Label className="form-product-label-file">Imagem</Form.Label>
        <Form.File
          className="form-product-file"
          accept="image/*"
          disabled={isReadOnly}
          onChange={(e) => handleUpdateImage(e)}
        />
      </Form.Group>
    </Form>
  );
}

export default FormProdutoAdmin;
