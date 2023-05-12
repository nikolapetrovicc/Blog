import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// import { PersistGate } from "redux-persist/integration/react";
import BlogPage from "../pages/BlogPage/BlogPage";
import HomePage from "../pages/HomePage/HomePage";
import { store } from "../redux/store";
import { theme } from "../theme/index";
import { GlobalStyles } from "./GlobalStyles/GlobalStyles";
import { Navbar } from "./Navbar/Navbar";

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Navbar />} path="/">
        <Route element={<HomePage />} index />
        <Route element={<BlogPage />} path="blog/:id" />
      </Route>,
    ),
  );

  return (
    <Box className="app">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </Box>
  );
};

export default App;
