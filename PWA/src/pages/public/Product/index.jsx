import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormLabel,
  FormControl,
  Image,
} from 'react-bootstrap';
import { Minus, Plus, ShoppingCart } from 'react-feather';
import LoadingPage from '../../../components/Shared/LoadingPage';
import StoreContainer from '../../../components/Shared/StoreContainer';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import formatFloat from '../../../services/utils/formatFloat';
import './Product.css';

function Product(props) {
  const { match } = props;
  const [productData, setProductData] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const getProductData = async () => {
    setLoadingData(true);
    try {
      const resp = await ProductAdminApiService.getById(match.params.id)
        .then((r) => r.data)
        .catch((r) => r.response.data);

      if (resp.success) {
        setProductData(resp.data);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(`Adicionado ao carrinho\nQuantidade: ${quantity}`);
  };

  return (
    <StoreContainer title={productData.name || ''}>
      {loadingData ? (
        <LoadingPage />
      ) : (
        <Container className="product-page">
          <Image
            src={productData.image}
            alt="produto"
            className="product-image"
          />
          <div className="product-info">
            <h1>{productData.name}</h1>
            <h3>R$ {formatFloat(productData.unitary_value)}</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam laboriosam velit nobis inventore, omnis natus cum
              quisquam atque sunt voluptate iusto nihil unde porro labore illo
              ab rerum quis error.
            </p>
            <Form className="form-product" onSubmit={handleSubmit}>
              <FormLabel className="quantity-label">Quantidade: </FormLabel>
              <Button
                onClick={() => setQuantity(quantity - 1)}
                variant="outline-dark"
                className="quantity-button"
                disabled={quantity === 1}
              >
                <Minus />
              </Button>
              <FormControl
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                min={1}
                className="quantity-input"
              />
              <Button
                className="quantity-button"
                onClick={() => setQuantity(quantity + 1)}
                variant="outline-dark"
              >
                <Plus />
              </Button>
              <Button variant="warning" type="submit" className="submit-button">
                Adicionar ao carrinho <ShoppingCart />
              </Button>
            </Form>
          </div>
        </Container>
      )}
    </StoreContainer>
  );
}

export default Product;
