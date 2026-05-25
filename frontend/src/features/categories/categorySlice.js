import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

/*
|--------------------------------------------------------------------------
| GET ALL CATEGORIES
|--------------------------------------------------------------------------
*/
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/categories");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching categories"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| GET SINGLE CATEGORY
|--------------------------------------------------------------------------
*/
export const fetchSingleCategory = createAsyncThunk(
  "categories/fetchSingleCategory",
  async (slug, thunkAPI) => {
    try {
      const response = await api.get(`/categories/${slug}`);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching category"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| CREATE CATEGORY
|--------------------------------------------------------------------------
*/
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await api.post("/categories", categoryData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/*
|--------------------------------------------------------------------------
| UPDATE CATEGORY
|--------------------------------------------------------------------------
*/
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }, thunkAPI) => {
    try {
      const response = await api.put(
        `/categories/${id}`,
        categoryData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/*
|--------------------------------------------------------------------------
| DELETE CATEGORY
|--------------------------------------------------------------------------
*/
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/categories/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    singleCategory: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.singleCategory = action.payload;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload);
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category.id === action.payload.id
            ? action.payload
            : category
        );
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;