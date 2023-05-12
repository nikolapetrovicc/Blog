import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeSnackbar } from "../../redux/snackbarSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const InfoBar = () => {
  const dispatch = useDispatch();

  const { openSnackbar, success, message } = useSelector(
    (state: any) => state?.snackbar,
  );

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {success === "success" && (
        <Snackbar
          autoHideDuration={6000}
          onClose={handleClose}
          open={openSnackbar}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ backgroundColor: "#237804" }}
          >
            <Typography variant="body2">{message}</Typography>
          </Alert>
        </Snackbar>
      )}
      {success === "error" && (
        <Snackbar
          autoHideDuration={6000}
          onClose={handleClose}
          open={openSnackbar}
        >
          <Alert severity="error" sx={{ backgroundColor: "#a8071a" }}>
            <Typography variant="body2">{message}</Typography>
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
export default InfoBar;
