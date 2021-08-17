import { CART_STORAGE_KEY } from './keys';

export const loadCartState = () => {
  const INITIAL_DATA = {
    products: [],
    count: 0,
  };

  try {
    const cartState = localStorage.getItem(CART_STORAGE_KEY);
    if (cartState) {
      return JSON.parse(cartState);
    }
    return INITIAL_DATA;
  } catch (err) {
    console.error(err);
    return INITIAL_DATA;
  }
};

export const storeCartState = (cartState) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch (err) {
    console.error(err);
  }
};
