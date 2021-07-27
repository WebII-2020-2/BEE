import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, FormControl } from 'react-bootstrap';
import StoreContainer from '../../../components/Shared/StoreContainer';
import LoadingPage from '../../../components/Shared/LoadingPage';
import CardProduct from '../../../components/Shared/CardProduct';
import ProductApiService from '../../../services/api/ProductAdminApiService';

function Search(props) {
  const { match } = props;
  const [productsSeach, setProductsSeach] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [orderOption, setOrderOption] = useState('1');

  const getProducts = async () => {
    setLoadingData(true);
    try {
      const resp = await ProductApiService.getByName({
        name: match.params.name,
      })
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });

      if (resp.success) {
        setProductsSeach(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingData(false);
    }
  };

  const products = useMemo(() => {
    if (productsSeach)
      switch (orderOption) {
        case '1':
          return productsSeach.sort((a, b) => (a.name <= b.name ? -1 : 1));
        case '2':
          return productsSeach.sort((a, b) => (a.name <= b.name ? 1 : -1));
        case '3':
          return productsSeach.sort((a, b) =>
            a.unitary_value <= b.unitary_value ? -1 : 1
          );
        case '4':
          return productsSeach.sort((a, b) =>
            a.unitary_value <= b.unitary_value ? 1 : -1
          );
        default:
          return productsSeach;
      }
    return [];
  }, [productsSeach, orderOption]);

  useEffect(() => {
    getProducts();
  }, [match]);

  return (
    <StoreContainer title={`Pesquisar produto: ${match.params.name}`}>
      <Container className="products-container">
        <div className="category-info">
          <h1>Nome pesquisado: {match.params.name}</h1>
          <hr />
        </div>
        <div className="category-actions">
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
        {loadingData ? (
          <LoadingPage />
        ) : (
          <Row className="product-list admin">
            {products.length !== 0 ? (
              products.map((product) => (
                <CardProduct {...product} key={product.id} />
              ))
            ) : (
              <p className="text-center w-100">
                Não foi possível achar produtos com esse nome
              </p>
            )}
          </Row>
        )}
      </Container>
    </StoreContainer>
  );
}

export default Search;
