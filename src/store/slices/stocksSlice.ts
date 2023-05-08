import { RootState, useAppDispatch } from "../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../http";

interface Stock {
  id: number;
  title: string;
  image: string;
  price: number;
  discountPercent: number;
  likes: number;
}

interface StocksData {
  count: number;
  limit: number;
  result: Stock[];
}

export const getStocks = createAsyncThunk<
  StocksData,
  void,
  { state: RootState }
>("stocks", async (_, { getState }) => {
  const { stocks } = getState();
  const { data } = await $api("stocks", {
    params: { offset: stocks.offset, limit: stocks.offset + 6 },
  });
  return data;
});

interface StocksSliceState {
  data: Stock[];
  count: number;
  limit: number;
  offset: number;
  status: "" | "loading" | "success" | "error";
}

const initialState: StocksSliceState = {
  data: [],
  count: 0,
  limit: 0,
  offset: 0,
  status: "",
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = (action.payload - 1) * 6;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStocks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getStocks.fulfilled, (state, action) => {
      state.data = action.payload.result;
      state.count = action.payload.count;
      state.limit = action.payload.limit;
      state.status = "success";
    });
    builder.addCase(getStocks.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default stocksSlice.reducer;
export const { setOffset } = stocksSlice.actions;
