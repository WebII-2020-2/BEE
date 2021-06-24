import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import AdminContainer from '../../../components/AdminContainer';
import CardProductAdmin from '../../../components/CardProduct';
import PaginationAdmin from '../../../components/PaginationAdmin';
import ButtonsListAdmin from '../../../components/ButtonsListAdmin';
import LoadingPageAdmin from '../../../components/LoadingPageAdmin';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import './ProductsList.css';

function ProductsList(props) {
  const { match } = props;
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [valueSearch, setValueSearch] = useState();
  const [actualPage, setActualPage] = useState(1);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const resp = await ProductAdminApiService.getAll().then((r) => r.data);
      if (resp.success) {
        setProducts(resp.data);
      } else {
        throw new Error(`${resp.error.error_message}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const productsFilter = useMemo(() => {
    const filter = valueSearch || undefined;
    if (filter) {
      return products.filter(
        (product) => product.name.toLowerCase().indexOf(filter) !== -1
      );
    }
    return -1;
  }, [valueSearch]);

  const totalPages = useMemo(() => {
    if (productsFilter !== -1) {
      return Math.ceil(productsFilter.length / 8);
    }
    return Math.ceil(products.length / 8);
  }, [products, productsFilter]);

  const productsPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 8;
    const indexMax = indexMin + 8;
    if (productsFilter !== -1) {
      return productsFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
    }
    return products.filter((x, index) => index >= indexMin && index < indexMax);
  }, [actualPage, productsFilter, products]);

  useEffect(() => {
    const page = Number(match.params.number);
    if (page) {
      setActualPage(page);
    } else {
      history.push('/admin/produtos/page/1');
    }
    getProducts();
  }, []);

  return (
    <AdminContainer link="produtos">
      <ButtonsListAdmin
        link="/admin/produtos/novo"
        funcFilter={setValueSearch}
      />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <Row className="product-list admin">
          {productsPerPage.map((product) => (
            <CardProductAdmin {...product} key={product.id} />
          ))}
        </Row>
      )}
      <PaginationAdmin
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={setActualPage}
        baseUrl="/admin/produtos"
      />
    </AdminContainer>
  );
}

export default ProductsList;
