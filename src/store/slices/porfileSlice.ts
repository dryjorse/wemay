import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";

interface Profile {
  name: string;
  surname: string;
  ava: string;
  tel: string;
  favourites: number;
}

export const getProfile = createAsyncThunk<Profile>("profile", async () => {
  const { data } = await $api("profile");
  return data;
});

interface profileSliceState {
  profile: Profile;
  status: "" | "loading" | "success" | "error";
}

const initialState: profileSliceState = {
  profile: {
    name: "",
    surname: "",
    ava: "",
    tel: "",
    favourites: 0,
  },
  status: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = "success";
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default profileSlice.reducer;
