import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BlogPost, getMembers, getUsers, User } from "../../data/data";
import headCells from "../../data/head-cells.json";
import { fetchBlogsSuccess } from "../../redux/blogsSlice";
import { fetchUsersSuccess } from "../../redux/usersSlice";
import InfoBar from "../Snackbar/InfoBar";
import UsersRowTable from "../UsersRowTable/UsersRowTable";

export const UsersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const allUsers: User[] = useSelector((state: any) => state?.users?.users);
  const allBlogs: BlogPost[] = useSelector((state: any) => state?.blogs?.blogs);

  const fetchUsers = async () => {
    try {
      const data: User[] = await getUsers();
      dispatch(fetchUsersSuccess(data));
    } catch (error) {}
  };

  const fetchBlogPosts = async () => {
    try {
      const dataBlogs: BlogPost[] = await getMembers();
      dispatch(fetchBlogsSuccess(dataBlogs));
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
    fetchBlogPosts();
  }, []);

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = allUsers?.filter(
    (item: User) =>
      `${item.first_name} ${item.last_name}`.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query),
  );

  return (
    <Box sx={{ width: "100%" }}>
      {!allUsers || !allBlogs ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "#6F9ED4" }} />
        </Box>
      ) : (
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            backgroundColor: "#FCFCFC",
            borderRadius: 5,
            boxShadow: "0px 6px 12px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar sx={{ pt: 3, pb: 2 }}>
            <Typography
              sx={{ display: { xs: "none", md: "block" }, flex: 1 }}
              variant="h6"
            >
              Table
            </Typography>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="medium" />
                  </InputAdornment>
                ),
              }}
              id="input-with-icon-textfield"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search"
              size="small"
            />
          </Toolbar>
          <TableContainer>
            <Table size="medium" sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  {headCells.map((headCell, index) => (
                    <TableCell
                      align={headCell.chip ? "center" : "left"}
                      key={index}
                      sx={{ width: headCell.width }}
                    >
                      <Typography sx={{ fontWeight: "600" }} variant="body2">
                        {headCell.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UsersRowTable
                      blogs={allBlogs}
                      fetchBlogPosts={fetchBlogPosts}
                      fetchUsers={fetchUsers}
                      key={row.id}
                      row={row}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      )}
      <InfoBar />
    </Box>
  );
};

export default UsersTable;
