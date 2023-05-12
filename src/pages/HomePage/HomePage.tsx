import { Box } from "@mui/material";
import React from "react";

import UsersTable from "../../components/UsersTable/UsersTable";

export const HomePage = () => (
  <Box sx={{ p: { xs: 1, md: 6 }, mt: { xs: 4, md: 1 } }}>
    <UsersTable />
  </Box>
);

export default HomePage;
