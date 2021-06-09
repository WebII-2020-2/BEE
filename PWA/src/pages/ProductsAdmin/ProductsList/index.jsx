import React from 'react';
import { Row } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import CardProdutoAdmin from '../../../components/CardProdutoAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import ProdutoAdminApiService from '../../../services/api/ProductAdminApiService';
import './ProductsList.css';

function ProductsList() {
  const products = ProdutoAdminApiService.getAll();
  return (
    <AdminContainer link="produtos">
      <ButtonsListAdmin link="/admin/produtos/novo" />
      <Row className="product-list admin">
        {
          products.map(({
            id, image, name, price,
          }) => (
            <CardProdutoAdmin id={id} key={id} image={image} name={name} price={price.toFixed(2).toString().replace('.', ',')} />
          ))
        }
      </Row>
      <PaginationAdmin />
    </AdminContainer>
  );
}

export default ProductsList;
