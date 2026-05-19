import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/axios";

/*
|--------------------------------------------------------------------------
| FETCH CATEGORIES
|--------------------------------------------------------------------------
*/
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",

  async (_, thunkAPI) => {
    try {
      const response = await api.get(
        "/categories"
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          "Error fetching categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | FETCH CATEGORIES
      |--------------------------------------------------------------------------
      */

      .addCase(
        fetchCategories.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchCategories.fulfilled,
        (state, action) => {
          state.loading = false;

          state.categories =
            action.payload;
        }
      )

      .addCase(
        fetchCategories.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export default categorySlice.reducer;