import React from 'react';
import { Row } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import CardProdutoAdmin from '../../../components/ProdutoAdmin';
import imagemProduto from '../../../assets/img/mock-data-product.svg';
import './ProductsList.css';

function ProductsList() {
  return (
    <AdminContainer link="produtos">
      <Row className="product-list-admin">
        <CardProdutoAdmin image={imagemProduto} name="Amendoim" price="40,00" />
        <CardProdutoAdmin image={imagemProduto} name="Amendoim" price="40,00" />
        <CardProdutoAdmin image={imagemProduto} name="Amendoim" price="40,00" />
        <CardProdutoAdmin image={imagemProduto} name="Amendoim" price="40,00" />
        <CardProdutoAdmin image={imagemProduto} name="Amendoim" price="40,00" />
        <CardProdutoAdmin image={imagemProduto} name="Amendoim" price="40,00" />
      </Row>
    </AdminContainer>
  );
}

export default ProductsList;
