import React, { useEffect, useState, useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StoreContainer from '../../../components/Shared/StoreContainer';
import CartProduct from '../../../components/Shared/CartProduct';
import ProductApiService from '../../../services/api/ProductAdminApiService';
import './Cart.css';

function Search() {
  const { products: productsStore } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);

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
      setProducts(resp.data);
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
          {productsCart.map((p) => (
            <CartProduct key={p.id} {...p} />
          ))}
        </Container>
        <Container className="cart info">
          <div className="info values">
            <h3>Resumo do pedido</h3>
            <hr />
            <p>
              Subtotal{' - '}
              {(totalValue + discount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
              <br />
              Desconto{' - '}
              {discount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <span className="total-value">
              Total:{' '}
              {totalValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <Button type="button" className="submit-cart" variant="warning">
            Finalizar Compra
          </Button>
        </Container>
      </main>
    </StoreContainer>
  );
}

export default Search;
