import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {

     const found = state.products.find(product => product.id == action.payload.id);
     
      if (found !== undefined){
        const index = state.products.indexOf(found);
        found.quantity += action.payload.quantity;
        state.products.splice(index, 1, found);
        state.total += action.payload.price * action.payload.quantity;
      }
      else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      } 
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
