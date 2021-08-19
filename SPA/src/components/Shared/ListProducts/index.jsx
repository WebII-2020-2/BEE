import React, { useMemo, useState } from 'react';
import { Button, FormControl, Row } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import CardProduct from '../CardProduct';
import LoadingPage from '../LoadingPage';
import './ListProducts.css';

function ListProducts(props) {
  const { productsData, loadingData } = props;
  const [orderOption, setOrderOption] = useState('1');
  const [actualPage, setActualPage] = useState(1);

  const totalPages = useMemo(() => {
    if (productsData) return Math.ceil(productsData.length / 12);
    return 0;
  }, [productsData]);

  const productPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 12;
    const indexMax = indexMin + 12;
    if (productsData) {
      return productsData.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
    }
    return [];
  }, [actualPage, productsData]);

  const products = useMemo(() => {
    if (productPerPage)
      switch (orderOption) {
        case '1':
          return productPerPage.sort((a, b) => (a.name <= b.name ? -1 : 1));
        case '2':
          return productPerPage.sort((a, b) => (a.name <= b.name ? 1 : -1));
        case '3':
          return productPerPage.sort((a, b) =>
            a.unitary_value <= b.unitary_value ? -1 : 1
          );
        case '4':
          return productPerPage.sort((a, b) =>
            a.unitary_value <= b.unitary_value ? 1 : -1
          );
        default:
          return productPerPage;
      }
    return [];
  }, [productPerPage, orderOption]);

  const handlePrevious = () => {
    setActualPage(actualPage - 1);
  };

  const handleNext = () => {
    setActualPage(actualPage + 1);
  };

  if (loadingData) return <LoadingPage />;

  return (
    <>
      <div className="list-products-actions">
        <FormControl
          as="select"
          aria-label="Ordenar produtos"
          value={orderOption}
          onChange={(e) => setOrderOption(e.target.value)}
        >
          <option value="1">Ordenar por nome (A-Z)</option>
          <option value="2">Ordenar por nome (Z-A)</option>
          <option value="3">Ordenar por preço (Menor)</option>
          <option value="4">Ordenar por preço (Maior)</option>
        </FormControl>
      </div>
      <Row className="product-list admin">
        {products.length !== 0 ? (
          products.map((product) => (
            <CardProduct {...product} key={product.id} />
          ))
        ) : (
          <p className="text-center w-100">
            Não foi possível carregar os produtos
          </p>
        )}
      </Row>
      {totalPages > 1 && (
        <Row className="pagination-component admin">
          <Button
            variant="outline-dark"
            disabled={actualPage <= 1 || actualPage > totalPages}
            onClick={handlePrevious}
          >
            <ChevronLeft />
          </Button>
          <p>{actualPage}</p>
          <Button
            variant="outline-dark"
            disabled={actualPage < 1 || actualPage >= totalPages}
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </Row>
      )}
    </>
  );
}

export default ListProducts;
