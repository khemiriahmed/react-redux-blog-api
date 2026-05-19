import { configureStore } from "@reduxjs/toolkit";

import articleReducer from "../features/articles/articleSlice";
// import categoryReducer from "../features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    // categories: categoryReducer,
  },
});
