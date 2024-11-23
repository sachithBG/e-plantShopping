import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.name === newItem.name);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += parseFloat(newItem.cost.replace('$', '')) ;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: parseFloat(newItem.cost.replace('$', '')),
        });
      }
      state.totalQuantity++;
      state.totalAmount += parseFloat(newItem.cost.replace('$', ''));
    },
    removeItem(state, action) {
      const name = action.payload;
      const itemIndex = state.items.findIndex((item) => item.name === name);
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.totalAmount -= state.items[itemIndex].totalPrice;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity(state, action) {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      
      if (existingItem) {
        // Update totalAmount and totalQuantity based on the new quantity
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = parseFloat(existingItem.cost.replace('$', '')) * quantity;
        
        state.totalQuantity += quantityDifference;
        state.totalAmount += parseFloat(existingItem.cost.replace('$', ''))  * quantityDifference;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
