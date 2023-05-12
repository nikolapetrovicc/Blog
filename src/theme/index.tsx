import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Manrope",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: "#475BE8",
          color: "#e8e8e8",
          borderRadius: "16px",
          "&:hover": {
            backgroundColor: "#1029ea",
            color: "#e8e8e8",
            textTransform: "none",
          },
          "&.Mui-disabled": {
            color: "#e8e8e8",
            backgroundColor: "#979797",
          },
        },
        contained: {
          backgroundColor: "#e8e8e8",
          color: "#475BE8",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            color: "#475BE8",
            fontWeight: "600",
          },
          "&.Mui-disabled": {
            backgroundColor: "#979797",
          },
        },
        outlined: {
          boxShadow: "0px 8px 8px 0px rgba(0,0,0,0.1)",
          "&.MuiButton-outlinedError": {
            border: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: "#979797",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10.5px 14px 10.5px 12px",
        },
        notchedOutline: {
          borderColor: "#475BE8",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#475BE8",
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 2px ("#475BE8", 0.2)`,
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid #475BE8`,
            },
          },
          "&.Mui-error": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F45252",
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 2px ("#F45252", 0.2)`,
              "& .MuiOutlinedInput-notchedOutline": {
                border: `2px solid #F45252`,
              },
            },
          },
        },
        inputSizeSmall: {
          padding: "7.5px 8px 7.5px 12px",
        },
        inputMultiline: {
          padding: 0,
        },
      },
    },
     MuiTableCell: {
      styleOverrides: {
        root: {
         padding: "12px"
        }
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontWeight: "medium",
        },
      },
    },
  },
});
