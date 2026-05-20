import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import articleReducer from "../features/articles/articleSlice";
// import categoryReducer from "../features/categories/categorySlice";
import commentReducer from "../features/comments/commentSlice";


export const store = configureStore({
  reducer: {
    articles: articleReducer,
    // categories: categoryReducer,
    comments: commentReducer,
    auth: authReducer,
  },
});
