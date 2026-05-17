import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/axios";

/*
|--------------------------------------------------------------------------
| FETCH ARTICLES
|--------------------------------------------------------------------------
*/
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",

  async (page = 1, thunkAPI) => {
    try {
      const response = await api.get(`/articles?page=${page}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching articles",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| CREATE ARTICLE
|--------------------------------------------------------------------------
*/
export const createArticle = createAsyncThunk(
  "articles/createArticle",

  async (articleData, thunkAPI) => {
    try {
      const response = await api.post("/articles", articleData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error creating article",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE ARTICLE
|--------------------------------------------------------------------------
*/
export const updateArticle = createAsyncThunk(
  "articles/updateArticle",

  async ({ id, articleData }, thunkAPI) => {
    try {
      const response = await api.put(`/articles/${id}`, articleData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating article",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| DELETE ARTICLE
|--------------------------------------------------------------------------
*/
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",

  async (id, thunkAPI) => {
    try {
      await api.delete(`/articles/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting article",
      );
    }
  },
);

const articleSlice = createSlice({
  name: "articles",

  initialState: {
    articles: [],
    loading: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | FETCH ARTICLES
      |--------------------------------------------------------------------------
      */

      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        //state.articles = action.payload;
        state.articles = action.payload.data;

        state.currentPage = action.payload.meta.current_page;

        state.lastPage = action.payload.meta.last_page;
      })

      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | CREATE ARTICLE
      |--------------------------------------------------------------------------
      */

      .addCase(createArticle.pending, (state) => {
        state.loading = true;
      })

      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;

        state.articles.unshift(action.payload);
      })

      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | UPDATE ARTICLE
      |--------------------------------------------------------------------------
      */

      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;

        state.articles = state.articles.map((article) =>
          article.id === action.payload.id ? action.payload : article,
        );
      })

      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | DELETE ARTICLE
      |--------------------------------------------------------------------------
      */

      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;

        state.articles = state.articles.filter(
          (article) => article.id !== action.payload,
        );
      })

      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
