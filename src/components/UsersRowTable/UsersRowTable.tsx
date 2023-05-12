import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  addBlogPost,
  BlogPost,
  deleteBlogPost,
  deleteUser,
  editBlogPost,
  User,
} from "../../data/data";
import { seeMore } from "../../redux/blogSlice";
import {
  messageStatus,
  openSnackbar,
  successStatus,
} from "../../redux/snackbarSlice";
import ChipGender from "../ChipGender/ChipGender";

export const UsersRowTable = ({
  row,
  blogs,
  fetchUsers,
  fetchBlogPosts,
}: {
  row: User;
  blogs: BlogPost[];
  fetchUsers: any;
  fetchBlogPosts: any;
}) => {
  const [openRow, setOpenRow] = useState(false);
  // modals
  const [openDialogDeleteUser, setOpenDialogDeleteUser] = useState(false);
  const [openDialogAddBlog, setOpenDialogAddBlog] = useState(false);
  const [openDialogDeleteBlog, setOpenDialogDeleteBlog] = useState(false);
  const [openDialogEditBlog, setOpenDialogEditBlog] = useState(false);

  const [blogPost, setBlogPost] = useState<any>({});
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    body: "",
  });
  const [focused, setFocused] = useState({
    title: false,
    body: false,
  });

  const [blogId, setBlogId] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteUser = async (user: User) => {
    setLoading(true);
    try {
      const deleted: boolean = await deleteUser(user.id);

      setOpenDialogDeleteUser(false);
      fetchUsers();
      setLoading(false);

      dispatch(openSnackbar());
      dispatch(successStatus("success"));
      dispatch(
        messageStatus(
          `User ${user.first_name} ${user.last_name} has been deleted!`,
        ),
      );
    } catch (error) {
      dispatch(openSnackbar());
      dispatch(successStatus("error"));
      dispatch(messageStatus("Error!"));
    }
  };

  const handleAddBlogPost = async (user: User) => {
    setLoading(true);
    try {
      const uuid = crypto.randomUUID();
      const blogPost = {
        id: uuid,
        userId: user.id,
        datePosted: new Date().toISOString(),
        title: formData.title,
        body: formData.body,
      };
      const promiseBP = await addBlogPost(blogPost);
      setLoading(false);
      setOpenDialogAddBlog(false);
      fetchBlogPosts();
      setFormData({ ...formData, title: "", body: "" });
      dispatch(openSnackbar());
      dispatch(successStatus("success"));
      dispatch(
        messageStatus(
          `Blog post for user ${user.first_name} ${user.last_name} has been added!`,
        ),
      );
    } catch (error) {
      dispatch(openSnackbar());
      dispatch(successStatus("error"));
      dispatch(messageStatus("Error!"));
    }
  };

  const handleDeleteBlogPost = async (blogId: string) => {
    setLoading(true);
    try {
      const deletedBlog: boolean = await deleteBlogPost(blogId);
      if (deletedBlog) {
        setOpenDialogDeleteBlog(false);
        fetchBlogPosts();
        setLoading(false);
        dispatch(openSnackbar());
        dispatch(successStatus("success"));
        dispatch(messageStatus(`Blog post has been deleted!`));
      }
    } catch (error) {
      dispatch(openSnackbar());
      dispatch(successStatus("error"));
      dispatch(messageStatus("Error!"));
    }
  };

  // edit blog post
  const handleEditBlogPost = async (post: any) => {
    const postId = post.id;
    const data = post;
    setLoading(true);
    try {
      const editedBlog: any = await editBlogPost(postId, data);
      if (editedBlog) {
        setOpenDialogEditBlog(false);
        fetchBlogPosts();
        setLoading(false);
        dispatch(openSnackbar());
        dispatch(successStatus("success"));
        dispatch(messageStatus(`Blog post has been changed!`));
      }
    } catch (error) {
      dispatch(openSnackbar());
      dispatch(successStatus("error"));
      dispatch(messageStatus("Error!"));
    }
  };

  const handleBlogTitleView = (title: string) => {
    if (title.length > 70) {
      return `${title.slice(0, 70)}...`;
    }
    return title;
  };

  const handleBlogBodyView = (body: string) => {
    if (body.length > 150) {
      return `${body.slice(0, 150)}...`;
    }
    return body;
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    setFocused({ ...focused, [name]: true });

    validate(name, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validate(name, value);
  };

  const validate = (name: string, value: string) => {
    const capitalizedName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    if (!value) {
      setErrors({ ...errors, [name]: `${capitalizedName} is required!` });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <>
      <TableRow hover key={row.id} role="checkbox" tabIndex={-1}>
        <TableCell sx={{ width: "5%" }}>
          <IconButton
            aria-label="expand row"
            onClick={() => setOpenRow(!openRow)}
            size="small"
          >
            {openRow ? (
              <ArrowUpwardRoundedIcon />
            ) : (
              <ArrowDownwardRoundedIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="left" sx={{ width: "10%" }}>
          {row.first_name}
        </TableCell>
        <TableCell align="left" sx={{ width: "10%" }}>
          {row.last_name}
        </TableCell>
        <TableCell align="left" sx={{ width: "10%" }}>
          {row.email}
        </TableCell>
        <TableCell align="center" sx={{ width: "10%" }}>
          <ChipGender gender={row.gender} />
        </TableCell>
        <TableCell sx={{ width: "10%" }}>
          <IconButton
            onClick={() => setOpenDialogDeleteUser(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <PersonRemoveRoundedIcon sx={{ color: "#76A2D3" }} />
          </IconButton>
          <Button
            color="primary"
            fullWidth
            onClick={() => setOpenDialogDeleteUser(true)}
            sx={{ display: { xs: "none", md: "block" } }}
            variant="contained"
          >
            Delete user
          </Button>
        </TableCell>
        <TableCell sx={{ width: "10%" }}>
          <IconButton
            onClick={() => setOpenDialogAddBlog(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <PostAddRoundedIcon sx={{ color: "#76A2D3" }} />
          </IconButton>
          <Button
            color="primary"
            fullWidth
            onClick={() => setOpenDialogAddBlog(true)}
            sx={{ display: { xs: "none", md: "block" } }}
            variant="contained"
          >
            Add blog
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography m={2} variant="h6">
                  Blogs
                </Typography>
              </Grid>
              {blogs
                ?.filter((blog: BlogPost) => blog?.userId === row?.id)
                .map((blog: BlogPost) => {
                  const dateObj = new Date(blog?.datePosted);
                  const formattedDate = dateObj.toLocaleDateString();
                  const formattedTime = dateObj.toLocaleTimeString();
                  return (
                    <Grid item key={blog?.id} md={4} p={2} xs={6}>
                      <Box
                        p={2}
                        sx={{
                          background: "#FCFCFC",
                          border: "2px solid #475BE8",
                          borderRadius: "20px",
                          boxShadow: "0px 12px 16px 0px rgba(0,0,0,0.1)",
                          transition: "transform 0.3s",
                          "&:hover": {
                            boxShadow: "0px 12px 10px 0px rgba(0,0,0,0.1)",
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant="body2">
                              {formattedDate}
                            </Typography>
                            <Typography variant="body2">
                              {formattedTime}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              mb={1}
                              sx={{ textAlign: "justify" }}
                              variant="h6"
                            >
                              {handleBlogTitleView(blog?.title)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              mb={1}
                              sx={{ textAlign: "justify" }}
                              variant="subtitle2"
                            >
                              {handleBlogBodyView(blog?.body)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              color="error"
                              fullWidth
                              onClick={() => {
                                setOpenDialogDeleteBlog(true);
                                setBlogId(blog.id);
                              }}
                              variant="outlined"
                            >
                              Delete
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              color="primary"
                              fullWidth
                              onClick={() => {
                                setOpenDialogEditBlog(true);
                                setBlogPost(blog);
                              }}
                              variant="outlined"
                            >
                              Edit Blog Post
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              color="primary"
                              fullWidth
                              onClick={() => dispatch(seeMore(blog))}
                              variant="contained"
                            >
                              <Link to={`blog/${blog.id}`}>See more</Link>
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* modal - edit blog post */}
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={() => setOpenDialogEditBlog(false)}
        open={openDialogEditBlog}
      >
        <DialogTitle>Edit blog post</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Title *</Typography>
          <TextField
            fullWidth
            name="title"
            onChange={(e) =>
              setBlogPost({ ...blogPost, title: e.target.value })
            }
            required
            sx={{ mb: 2 }}
            type="text"
            value={blogPost.title}
          />
          <Typography variant="subtitle1">Body *</Typography>
          <TextField
            fullWidth
            multiline
            name="body"
            onChange={(e) => setBlogPost({ ...blogPost, body: e.target.value })}
            required
            rows={3}
            sx={{ mb: 4 }}
            type="text"
            value={blogPost.body}
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button fullWidth onClick={() => setOpenDialogEditBlog(false)}>
                Close
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                autoFocus
                color="primary"
                disabled={
                  blogPost.body === "" || blogPost.title === "" || loading
                }
                fullWidth
                onClick={() => handleEditBlogPost(blogPost)}
                variant="contained"
              >
                Edit blog post
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* modal - add blog post */}
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={() => {
          setFormData({ ...formData, title: "", body: "" });
          setOpenDialogAddBlog(false);
        }}
        open={openDialogAddBlog}
      >
        <DialogTitle>Add blog post</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Title *</Typography>
          <TextField
            error={Boolean(focused.title && errors.title)}
            fullWidth
            helperText={Boolean(focused.title && errors.title) && errors.title}
            name="title"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
            type="text"
            value={formData.title}
          />
          <Typography variant="subtitle1">Body *</Typography>
          <TextField
            error={Boolean(focused.body && errors.body)}
            fullWidth
            helperText={Boolean(focused.body && errors.body) && errors.body}
            multiline
            name="body"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            rows={3}
            sx={{ mb: 4 }}
            type="text"
            value={formData.body}
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button fullWidth onClick={() => setOpenDialogAddBlog(false)}>
                Close
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                autoFocus
                color="primary"
                disabled={
                  formData.body === "" || formData.title === "" || loading
                }
                fullWidth
                onClick={() => handleAddBlogPost(row)}
                variant="contained"
              >
                Add blog post
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* modal - delete user */}
      <Dialog
        onClose={() => setOpenDialogDeleteUser(false)}
        open={openDialogDeleteUser}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 4 }} variant="subtitle1">
            Are you sure you want to delete this user?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button fullWidth onClick={() => setOpenDialogDeleteUser(false)}>
                Close
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                autoFocus
                color="primary"
                disabled={loading}
                fullWidth
                onClick={() => handleDeleteUser(row)}
                variant="contained"
              >
                Delete User
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* modal - delete blog post */}
      <Dialog
        onClose={() => setOpenDialogDeleteBlog(false)}
        open={openDialogDeleteBlog}
        sx={{ borderRadius: "16px" }}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 4 }} variant="subtitle1">
            Are you sure you want to delete this blog post?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button fullWidth onClick={() => setOpenDialogDeleteBlog(false)}>
                Close
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                autoFocus
                color="primary"
                disabled={loading}
                fullWidth
                onClick={() => handleDeleteBlogPost(blogId)}
                variant="contained"
              >
                Delete blog post
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersRowTable;
