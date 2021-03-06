import { createStore } from 'redux';
import reducers from './reducers';
import { loadCartState, storeCartState } from '../services/local-storage/cart';

const savedState = loadCartState();
const store = createStore(reducers, savedState);

store.subscribe(() => {
  storeCartState({
    cart: store.getState().cart,
  });
});

export default store;
