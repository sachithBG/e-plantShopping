import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../slices/cartSlice';
import productSlice from '../slices/productSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
  },
});

export default store;