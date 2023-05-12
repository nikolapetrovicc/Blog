import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Outlet } from "react-router-dom";

// import NaviLogoMobile from "../../assets/svg/NaviLogoMobile";
// import NaviPartnerLogo from "../../assets/svg/NaviPartnerLogo";

export const Navbar = () => (
  <Box>
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: "#FCFCFC" }}>
        <Toolbar>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="h6">Logo</Typography>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Typography variant="h6">Logo</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    <Box className="main-content">
      <Outlet />
    </Box>
  </Box>
);

export default Navbar;
