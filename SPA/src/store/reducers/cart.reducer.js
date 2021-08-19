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
      const productExists = state.products.find((p) => p.id === id);
      if (productExists) {
        return {
          products: state.products.map((p) => {
            if (p.id === id) {
              return {
                id: p.id,
                quantity: p.quantity + quantity,
              };
            }
            return p;
          }),
          count: state.count + quantity,
        };
      }
      return {
        products: [...state.products, { id, quantity }],
        count: state.count + quantity,
      };
    }

    case UPDATE_QUANTITY: {
      const { id, operation } = action;
      return {
        products: state.products.map((product) => {
          if (Number(product.id) === id)
            return {
              id,
              quantity:
                operation === 'PLUS'
                  ? product.quantity + 1
                  : product.quantity - 1,
            };
          return product;
        }),
        count: operation === 'PLUS' ? state.count + 1 : state.count - 1,
      };
    }

    case REMOVE_PRODUCT: {
      const { id } = action;
      const removedProduct = state.products.find(
        (product) => Number(product.id) === id
      );
      return {
        products: state.products.filter((product) => Number(product.id) !== id),
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
