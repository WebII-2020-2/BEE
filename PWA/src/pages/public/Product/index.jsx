import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormLabel,
  Image,
} from 'react-bootstrap';
import { Minus, Plus, ShoppingCart } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addProduct } from '../../../store/actions/cart.actions';
import LoadingPage from '../../../components/Shared/LoadingPage';
import StoreContainer from '../../../components/Shared/StoreContainer';
import ProductAdminApiService from '../../../services/api/ProductAdminApiService';
import './Product.css';

function Product(props) {
  const { match } = props;
  const dispatch = useDispatch();
  const history = useHistory();
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
    dispatch(addProduct(match.params.id, quantity));
    history.push('/carrinho');
  };

  const oldPriceStyle = useMemo(() => {
    if (productData.value_promotion) {
      return {
        opacity: 0.5,
        textDecoration: 'line-through',
      };
    }
    return {};
  }, [productData]);

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
            <h1>
              {productData.name}&nbsp;{productData.unity}
            </h1>
            <h3>
              <span style={oldPriceStyle}>
                {productData.unitary_value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              &nbsp;
              {productData.value_promotion && (
                <span>
                  {productData.value_promotion.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              )}
            </h3>
            <p>{productData.description}</p>
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
                onChange={(e) => setQuantity(Number(e.target.value))}
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
