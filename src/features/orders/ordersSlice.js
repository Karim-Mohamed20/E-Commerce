import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [],
};

const saveToStorage = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.orders.push(action.payload);
      saveToStorage(state.orders);
    },

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);

      if (order) {
        order.status = status;
        saveToStorage(state.orders);
      }
    },
  },
});

export const { createOrder, updateOrderStatus } =
  ordersSlice.actions;

export default ordersSlice.reducer;
