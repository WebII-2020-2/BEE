import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import CardProdutoAdmin from '../../../components/CardProdutoAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import ProdutoAdminApiService from '../../../services/api/ProductAdminApiService';
import './ProductsList.css';

function ProductsList() {
  const [actualPage, setActualPage] = useState(1);
  const products = ProdutoAdminApiService.getAll();

  const handleChangePage = (value) => {
    setActualPage(value);
  };
  return (
    <AdminContainer link="produtos">
      <ButtonsListAdmin link="/admin/produtos/novo" />
      <Row className="product-list admin">
        {products.map(({
          id, image, name, price,
        }) => (
          <CardProdutoAdmin
            id={id}
            key={id}
            image={image}
            name={name}
            price={price.toFixed(2).toString().replace('.', ',')}
          />
        ))}
      </Row>
      <PaginationAdmin
        itensCount={products.length}
        actualPage={actualPage}
        click={handleChangePage}
      />
    </AdminContainer>
  );
}

export default ProductsList;
