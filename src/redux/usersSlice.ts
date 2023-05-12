import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  users: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { fetchUsersSuccess } = usersSlice.actions;

export default usersSlice.reducer;
