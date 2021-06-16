import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import CardProdutoAdmin from '../../../components/CardProductAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import LoadingPageAdmin from '../../../components/LoadingPageAdmin';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import './ProductsList.css';

function ProductsList() {
  const [actualPage, setActualPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const resp = await ProductAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setProducts(resp.data);
      } else {
        throw new Error(`Unable to get products: ${resp.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChangePage = (value) => {
    setActualPage(value);
  };

  return (
    <AdminContainer link="produtos">
      <ButtonsListAdmin link="/admin/produtos/novo" />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <Row className="product-list admin">
          {products.map(({ id, image, name, unitary_value: price }) => (
            <CardProdutoAdmin
              id={id}
              key={id}
              image={image}
              name={name}
              price={price.toFixed(2).toString().replace('.', ',')}
            />
          ))}
        </Row>
      )}
      <PaginationAdmin
        itensCount={products.length}
        actualPage={actualPage}
        click={handleChangePage}
      />
    </AdminContainer>
  );
}

export default ProductsList;
