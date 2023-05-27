import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";

interface ICompaniesData {
  count: number;
  results: ICompany[]
}

export interface ICompany {
  id: number;
  name: string;
  description: string;
  stock_count: number;
  discount: number;
  image: string;
}

export const getCompanies = createAsyncThunk("companies", async () => {
  const { data } = await $api("posts/company/");
  return data as ICompaniesData;
});

interface CompaniesSliceState {
  status: "" | "loading" | "success" | "error";
  data: ICompany[];
}

const initialState: CompaniesSliceState = {
  status: "",
  data: [],
};

const companiesSlice = createSlice({
  name: "companies",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.data = action.payload.results;
      state.status = "success";
    });
    builder.addCase(getCompanies.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default companiesSlice.reducer;
