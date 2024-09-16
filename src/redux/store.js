import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "../redux/invoiceSlice";

const store = configureStore({
  reducer: {
    invoices: invoiceSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState().invoices;
  localStorage.setItem("invoices", JSON.stringify(state));
});

export default store;
