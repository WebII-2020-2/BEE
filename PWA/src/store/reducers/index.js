import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const reducer = combineReducers({
  cart: cartReducer,
});

export default reducer;
