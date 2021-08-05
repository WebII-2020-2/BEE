import {
  ADD_PRODUCT,
  CLEAR_CART,
  REMOVE_PRODUCT,
  UPDATE_QUANTITY,
} from './actionTypes';

export const addProduct = (id, quantity) => ({
  type: ADD_PRODUCT,
  id,
  quantity,
});

export const updateQuantity = (id, quantity) => ({
  type: UPDATE_QUANTITY,
  id,
  quantity,
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  id,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
