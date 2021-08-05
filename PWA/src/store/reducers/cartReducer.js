import {
  ADD_PRODUCT,
  CLEAR_CART,
  REMOVE_PRODUCT,
  UPDATE_QUANTITY,
} from '../actions/actionTypes';

const INITIAL_DATA = {
  products: [],
  count: 0,
};

const cartReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { id, quantity } = action;
      return {
        products: [...state.products, { id, quantity }],
        count: state.count + quantity,
      };
    }

    case UPDATE_QUANTITY:
      return state.map((product) => {
        if (product.id === action.data.id) {
          return action.data;
        }
        return product;
      });

    case REMOVE_PRODUCT: {
      const { id } = action;
      const removedProduct = state.products.find(
        (product) => product.id === id
      );
      return {
        products: state.products.filter((product) => product.id !== id),
        count: state.count - removedProduct.quantity,
      };
    }

    case CLEAR_CART:
      return INITIAL_DATA;

    default:
      return state;
  }
};

export default cartReducer;
