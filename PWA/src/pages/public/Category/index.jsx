import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, FormControl } from 'react-bootstrap';
import StoreContainer from '../../../components/Shared/StoreContainer';
import CardProduct from '../../../components/Shared/CardProduct';
import LoadingPage from '../../../components/Shared/LoadingPage';
import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';
import './Category.css';

function CategoryPage(props) {
  const { match } = props;
  const [categoryData, setCategoryData] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [orderOption, setOrderOption] = useState('1');

  const getCategoryData = async () => {
    setLoadingData(true);
    try {
      const resp = await CategoryAdminApiService.getById(match.params.id)
        .then((r) => r.data)
        .catch((r) => r.response.data);

      if (resp.success) {
        setCategoryData(resp.data);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingData(false);
    }
  };

  const products = useMemo(() => {
    if (categoryData.products)
      switch (orderOption) {
        case '1':
          return categoryData.products.sort((a, b) =>
            a.name <= b.name ? -1 : 1
          );
        case '2':
          return categoryData.products.sort((a, b) =>
            a.name <= b.name ? 1 : -1
          );
        case '3':
          return categoryData.products.sort((a, b) =>
            a.unitary_value <= b.unitary_value ? -1 : 1
          );
        case '4':
          return categoryData.products.sort((a, b) =>
            a.unitary_value <= b.unitary_value ? 1 : -1
          );
        default:
          return categoryData.products;
      }
    return [];
  }, [categoryData, orderOption]);

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <StoreContainer title={categoryData.name || ''}>
      <Container className="products-container">
        <div className="category-info">
          <h1>{categoryData.name}</h1>
          <p>{categoryData.description}</p>
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
            {products.map((product) => (
              <CardProduct {...product} key={product.id} />
            ))}
          </Row>
        )}
      </Container>
    </StoreContainer>
  );
}

export default CategoryPage;
