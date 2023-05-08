import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";

interface ICompany {
  photo: string;
  stocks: number;
  discountPercentage: number;
}

export const getCompanies = createAsyncThunk("companies", async () => {
  const { data } = await $api("companies");
  return data as ICompany[];
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
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(getCompanies.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default companiesSlice.reducer;
