import React, { useEffect, useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StoreContainer from '../../../components/Shared/StoreContainer';
import CartProduct from '../../../components/Shared/CartProduct';
import ProductApiService from '../../../services/api/ProductAdminApiService';

function Search() {
  const productsStore = useSelector((state) => state.cart.products);
  const [products, setProducts] = useState([]);

  const productsCart = useMemo(() => {
    if (productsStore.length && products.length) {
      return productsStore.map((pStore) => {
        const pStoreData = products.find((p) => p.id === Number(pStore.id));
        console.warn(pStoreData);
        return {
          ...pStoreData,
          quantity: pStore.quantity,
        };
      });
    }
    return [];
  }, [productsStore, products]);

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
      <Container className="cart products">
        {productsCart.map((p) => (
          <CartProduct key={p.id} {...p} />
        ))}
      </Container>
    </StoreContainer>
  );
}

export default Search;
