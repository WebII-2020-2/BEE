import { combineReducers } from 'redux';
import cartReducer from './cart.reducer';

const reducer = combineReducers({
  cart: cartReducer,
});

export default reducer;
