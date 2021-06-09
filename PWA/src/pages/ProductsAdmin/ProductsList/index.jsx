import React from 'react';
import { Row } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import CardProdutoAdmin from '../../../components/CardProdutoAdmin';
import ProdutoAdminApiService from '../../../services/api/ProductAdminApiService';
import './ProductsList.css';

function ProductsList() {
  const products = ProdutoAdminApiService.getAll();
  return (
    <AdminContainer link="produtos">
      <Row className="actions-product-list admin" />
      <Row className="product-list admin">
        {
          products.map(({
            id, image, name, price,
          }) => (
            <CardProdutoAdmin id={id} key={id} image={image} name={name} price={price.toFixed(2).toString().replace('.', ',')} />
          ))
        }
      </Row>
    </AdminContainer>
  );
}

export default ProductsList;
