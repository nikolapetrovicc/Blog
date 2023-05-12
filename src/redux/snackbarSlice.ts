import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSnackbar: false,
  success: "",
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state) => {
      state.openSnackbar = true;
    },
    closeSnackbar: (state) => {
      state.openSnackbar = false;
    },
    successStatus: (state, action) => {
      state.success = action.payload;
    },
    messageStatus: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { openSnackbar, successStatus, messageStatus, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
