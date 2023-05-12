import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  blogs: null,
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    fetchBlogsSuccess: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { fetchBlogsSuccess } = blogsSlice.actions;

export default blogsSlice.reducer;
