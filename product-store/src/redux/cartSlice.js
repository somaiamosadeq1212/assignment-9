import { createSlice } from "@reduxjs/toolkit";

//  Load from LocalStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromStorage(),
};

// Save helper function
const saveToStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      //  SAVE AFTER CHANGE
      saveToStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      saveToStorage(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.id === action.payload
      );

      if (item) item.quantity += 1;

      saveToStorage(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveToStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];

      //  clear storage 
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;