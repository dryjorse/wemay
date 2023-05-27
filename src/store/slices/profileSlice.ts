import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";

interface MyKnownError {
  errorMessage: string;
}

interface Profile {
  name: string;
  email: string;
  profile_picture: string | null;
  number: number;
}

interface IRegisterBody {
  name: string;
  tel: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const register = createAsyncThunk<
  Profile,
  IRegisterBody,
  { rejectValue: MyKnownError }
>(
  "register",
  async (
    { name, tel, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await $api.post("/users/register/", {
        name,
        number: tel,
        email,
        password,
        confirm_password: confirmPassword,
      });
  
      if (data.message === "Что-то пошло не так!")
        return rejectWithValue({ errorMessage: data.message });
  
      const tokens = await $api.post("/users/login_token/", {
        email,
        password,
      });
      localStorage.setItem("token", tokens.data.access);
  
      const user = await $api(`users/profile/${email}/`);
      return user.data;
    } catch (e) {
      console.log(e)
    }
  }
);

export const login = createAsyncThunk<
  Profile,
  { email: string; password: string },
  { rejectValue: MyKnownError }
>("login", async ({ email, password }, { rejectWithValue }) => {
  const { data } = await $api.post("users/login_token/", { email, password });

  if (!data.access) return rejectWithValue({ errorMessage: data.detail });
  
  localStorage.setItem('token', data.access)

  const user = await $api(`users/profile/${email}/`);
  return user.data;
});

interface profileSliceState {
  isAuth: boolean;
  profile: Profile;
  status: "" | "loading" | "success" | "error";
  authErrorMessage: string | undefined;
}

const initialState: profileSliceState = {
  isAuth: false,
  profile: {
    name: "",
    email: "",
    profile_picture: "",
    number: 0,
  },
  status: "",
  authErrorMessage: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuth = true;
      state.profile = action.payload;
      state.status = "success";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "error";
      state.authErrorMessage = action.payload?.errorMessage;
    });
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      state.profile = action.payload;
      state.status = "success";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
      state.authErrorMessage = action.payload?.errorMessage;
    });
  },
});

export default profileSlice.reducer;
