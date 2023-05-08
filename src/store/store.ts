import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import stocksSlice from "./slices/stocksSlice";
import companiesSlice from "./slices/companiesSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksSlice,
    companies: companiesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispacth = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispacth>()