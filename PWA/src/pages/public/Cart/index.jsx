import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StoreContainer from '../../../components/Shared/StoreContainer';
import CartProduct from '../../../components/Shared/CartProduct';
import ProductApiService from '../../../services/api/ProductAdminApiService';
import CartInfo from '../../../components/Shared/CartInfo';
import LoadingPage from '../../../components/Shared/LoadingPage';
import './Cart.css';

function Search() {
  const { products: productsStore } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const productsCart = useMemo(() => {
    if (productsStore && products.length) {
      return productsStore.map((pStore) => {
        const pStoreData = products.find((p) => p.id === Number(pStore.id));
        return {
          ...pStoreData,
          quantity: pStore.quantity,
        };
      });
    }
    return [];
  }, [productsStore, products]);

  const totalValue = useMemo(() => {
    if (productsCart.length) {
      return productsCart.reduce((accumulator, product) => {
        const {
          quantity,
          unitary_value: unValue,
          value_promotion: promoValue,
        } = product;
        if (promoValue) return promoValue * quantity + accumulator;
        return unValue * quantity + accumulator;
      }, 0);
    }
    return 0;
  }, [productsCart]);

  const discount = useMemo(() => {
    if (productsCart.length) {
      return productsCart.reduce((accumulator, initial) => {
        if (initial.value_promotion)
          return (
            (initial.unitary_value - initial.value_promotion) *
              initial.quantity +
            accumulator
          );
        return accumulator;
      }, 0);
    }
    return 0;
  }, [productsCart]);

  const getAllProducts = async () => {
    try {
      const resp = await ProductApiService.getAll()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setProducts(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <StoreContainer title="Carrinho de compras">
      <h2 className="cart title">Meu Carrinho de compras</h2>
      <main className="cart-container">
        <Container className="cart products">
          {productsCart.length ? (
            productsCart.map((p) => <CartProduct key={p.id} {...p} />)
          ) : (
            <LoadingPage />
          )}
        </Container>
        <Container className="cart info">
          <CartInfo values={{ discount, totalValue }} />
          <Button
            type="button"
            className="submit-cart"
            variant="warning"
            onClick={() => {
              history.push('/user/comprar');
            }}
          >
            Comprar
          </Button>
        </Container>
      </main>
    </StoreContainer>
  );
}

export default Search;
