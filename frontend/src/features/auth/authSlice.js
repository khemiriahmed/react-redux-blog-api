import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/axios";

/*
|--------------------------------------------------------------------------
| GET CURRENT USER (/me)
|--------------------------------------------------------------------------
*/
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/me");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to get user",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/
export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/register", userData);

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Register failed",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/login", userData);

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",

  async (_, thunkAPI) => {
    try {
      await api.post("/logout");

      localStorage.removeItem("token");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Logout failed");
    }
  },
);

/*
|--------------------------------------------------------------------------
| INIT STATE
|--------------------------------------------------------------------------
*/
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,

    token: localStorage.getItem("token"),

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | FETCH USER (/me)
      |--------------------------------------------------------------------------
      */
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | REGISTER
      |--------------------------------------------------------------------------
      */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | LOGIN
      |--------------------------------------------------------------------------
      */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | LOGOUT
      |--------------------------------------------------------------------------
      */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.token = null;
      });
  },
});

export default authSlice.reducer;
