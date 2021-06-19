import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import CardProdutoAdmin from '../../../components/CardProductAdmin';
import PaginationAdmin from '../../../components/PaginationAdmin';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import LoadingPageAdmin from '../../../components/LoadingPageAdmin';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import './ProductsList.css';

function ProductsList(props) {
  const { match } = props;
  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsFilter, setProductsFilter] = useState([]);

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

  const getProductsPerPage = () => {
    const indexMin = (actualPage - 1) * 8;
    const indexMax = indexMin + 8;
    if (productsFilter !== -1) {
      const productList = productsFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setProductsPerPage(productList);
      setTotalPages(Math.ceil(productList.length / 8));
    } else {
      const productList = products.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
      setProductsPerPage(productList);
      setTotalPages(Math.ceil(productList.length / 8));
    }
  };

  const handleChangePage = (page) => {
    setActualPage(page);
  };

  const getProductFilter = (valueSearch) => {
    const filter = valueSearch || undefined;
    if (filter) {
      const filtered = products.filter(
        (product) => product.name.toLowerCase().indexOf(filter) !== -1
      );
      setProductsFilter(filtered);
    } else {
      setProductsFilter(-1);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (match.params.number) {
      setActualPage(Number(match.params.number));
    }
    getProductsPerPage();
  }, [products, productsFilter, actualPage, totalPages]);

  return (
    <AdminContainer link="produtos">
      <ButtonsListAdmin
        link="/admin/produtos/novo"
        funcFilter={getProductFilter}
      />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <Row className="product-list admin">
          {productsPerPage.map(({ id, image, name, unitary_value: price }) => (
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
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={handleChangePage}
        baseUrl="/admin/produtos"
      />
    </AdminContainer>
  );
}

export default ProductsList;
