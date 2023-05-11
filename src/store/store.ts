import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import stocksSlice from "./slices/stocksSlice";
import companiesSlice from "./slices/companiesSlice";
import porfileSlice from "./slices/porfileSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksSlice,
    companies: companiesSlice,
    profile: porfileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispacth = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispacth>();
