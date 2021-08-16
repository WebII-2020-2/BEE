import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import StoreContainer from '../../../components/Shared/StoreContainer';
import ProductApiService from '../../../services/api/ProductApiService';
import OrderApiService from '../../../services/api/OrderApiService';
import CartInfo from '../../../components/Shared/CartInfo';
import './Purchase.css';
import UserInfo from './steps/UserInfo';
import PaymentMethod from './steps/PaymentMethod';
import Address from './steps/Address';

const STEPS = {
  0: 'Carrinho',
  1: 'Dados de usuário',
  2: 'Endereço de entrega',
  3: 'Forma de pagamento',
  4: 'Revisão da compra',
  5: 'Finalizar',
};

const shipping = {
  send_value: 9.9,
  send_estimated_date: new Date().setDate(new Date().getDate() + 10),
};

function Purchase() {
  const history = useHistory();
  const { products: productsStore } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [actualStep, setActualStep] = useState(1);
  const [values, setValues] = useState({
    products: productsStore || [],
    ...shipping,
  });
  const [isLoading, setIsLoading] = useState(false);

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
      }, values.send_value);
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    if (actualStep === 4) {
      setIsLoading(true);
      try {
        const resp = await OrderApiService.createNew(values)
          .then((r) => r.data)
          .catch((r) => {
            throw r.response.data.error;
          });
        if (resp.success) {
          history.push('/user/dashboard/pedidos');
        } else {
          throw resp.error;
        }
      } catch (err) {
        console.warn(`ERRO ${err.code}: ${err.error_message}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      setActualStep(actualStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (actualStep === 1) {
      history.push('/carrinho');
    }
    setActualStep(actualStep - 1);
  };

  const handleUpdateValues = (value) => {
    setValues({ ...values, ...value });
  };

  const disableNextStep = () => {
    if (isLoading) return true;
    if (actualStep === 2 && !values.address_id) return true;
    if (actualStep === 3 && !values.card_id) return true;
    return false;
  };

  const renderStep = () => {
    switch (actualStep) {
      case 1:
        return <UserInfo />;
      case 2:
        return (
          <Address
            handleUpdateValues={handleUpdateValues}
            addressId={values.address_id}
          />
        );
      case 3:
        return (
          <PaymentMethod
            handleUpdateValues={handleUpdateValues}
            cardId={values.card_id}
          />
        );
      case 4:
        return <h5>{STEPS[actualStep]}</h5>;
      default:
        return '';
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <StoreContainer title={`Comprar - ${STEPS[actualStep]}`}>
      <h2 className="purchase title">{STEPS[actualStep]}</h2>
      <main className="purchase-container">
        <Container
          className="purchase products"
          handleUpdate={handleUpdateValues}
        >
          {renderStep()}
        </Container>
        <Container className="purchase info">
          <CartInfo
            values={{
              totalValue,
              discount,
              products: productsCart,
              frete: values.send_value,
            }}
          />
          <div className="purchase actions">
            <Button
              type="button"
              variant="dark"
              disabled={isLoading}
              onClick={handlePreviousStep}
            >
              <ArrowLeft /> {STEPS[actualStep - 1]}
            </Button>
            <Button
              type="button"
              variant="warning"
              disabled={disableNextStep()}
              onClick={handleNextStep}
            >
              {STEPS[actualStep + 1]} <ArrowRight />
            </Button>
          </div>
        </Container>
      </main>
    </StoreContainer>
  );
}

export default Purchase;
