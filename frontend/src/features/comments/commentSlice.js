import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/axios";

/*
|--------------------------------------------------------------------------
| FETCH COMMENTS
|--------------------------------------------------------------------------
*/
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",

  async (articleId, thunkAPI) => {
    try {
      const response = await api.get(
        `/articles/${articleId}/comments`
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          "Error fetching comments"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| ADD COMMENT
|--------------------------------------------------------------------------
*/
export const addComment = createAsyncThunk(
  "comments/addComment",

  async (
    { articleId, commentData },
    thunkAPI
  ) => {
    try {
      const response = await api.post(
        `/articles/${articleId}/comments`,
        commentData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          "Error adding comment"
      );
    }
  }
);

const commentSlice = createSlice({
  name: "comments",

  initialState: {
    comments: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | FETCH COMMENTS
      |--------------------------------------------------------------------------
      */

      .addCase(
        fetchComments.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchComments.fulfilled,
        (state, action) => {
          state.loading = false;

          state.comments =
            action.payload;
        }
      )

      .addCase(
        fetchComments.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )

      /*
      |--------------------------------------------------------------------------
      | ADD COMMENT
      |--------------------------------------------------------------------------
      */

      .addCase(
        addComment.fulfilled,
        (state, action) => {
          state.comments.unshift(
            action.payload
          );
        }
      );
  },
});

export default commentSlice.reducer;