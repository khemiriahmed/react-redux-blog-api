import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/axios";

//  FETCH ARTICLES
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/articles");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching articles"
      );
    }
  }
);

const articleSlice = createSlice({
  name: "articles",

  initialState: {
    articles: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // FULFILLED
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })

      // REJECTED
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;