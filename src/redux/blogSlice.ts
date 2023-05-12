import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedBlog: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    seeMore: (state, action) => {
      state.clickedBlog = action.payload;
    },
  },
});

export const { seeMore } = blogSlice.actions;

export default blogSlice.reducer;
