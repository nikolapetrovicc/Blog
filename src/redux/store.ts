import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./blogSlice";
import blogsReducer from "./blogsSlice";
import snackbarReducer from "./snackbarSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    blogs: blogsReducer,
    blog: blogReducer,
    snackbar: snackbarReducer,
  },
});
