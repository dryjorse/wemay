import { RootState } from "../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../http";
import axios from "axios";

export interface Stock {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  get_likes: number;
}

interface StocksData {
  count: number;
  limit: number;
  results: Stock[];
}

export const getStocks = createAsyncThunk<
  StocksData,
  void,
  { state: RootState }
>("stocks", async (_, { getState }) => {
  const { stocks } = getState();
  const { data } = await axios.get("http://13.49.228.144/api/v1/posts/promotion/", {
    params: { offset: stocks.offset, limit: stocks.offset + stocks.limit },
  });
  return data;
});

export const setStockLike = createAsyncThunk('like', async (id: number) => {
  await $api(`/posts/promotion/${id}/like/`)
})  

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
  limit: 6,
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
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      console.log(state.limit)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStocks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getStocks.fulfilled, (state, action) => {
      state.data = action.payload.results;
      state.count = action.payload.count;
      state.status = "success";
    });
    builder.addCase(getStocks.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default stocksSlice.reducer;
export const { setOffset, setLimit } = stocksSlice.actions;
