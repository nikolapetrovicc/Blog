import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BlogPost, deleteBlogPost } from "../../data/data";
import {
  messageStatus,
  openSnackbar,
  successStatus,
} from "../../redux/snackbarSlice";

const BlogPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDialogDeleteBlog, setOpenDialogDeleteBlog] = useState(false);
  const [blog, setBlog] = useState<any>();
  const blogs: BlogPost[] = useSelector((state: any) => state?.blogs?.blogs);

  useEffect(() => {
    const blogPost = blogs?.find((post: any) => post.id === params.id);
    setBlog(blogPost);
  }, [params.id]);

  const handleDeleteBlogPost = async (blogId: any) => {
    try {
      const deletedBlog: boolean = await deleteBlogPost(blogId);
      if (deletedBlog) {
        setOpenDialogDeleteBlog(false);
        navigate("/");
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

  const handleFormatDateTime = (dateTime: string) => {
    const dateObj = new Date(blog?.datePosted);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();
    if (dateTime === "date") {
      return formattedDate;
    } else if (dateTime === "time") {
      return formattedTime;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 } }}>
      <Grid container>
        <Grid item mb={2} sx={{ mx: { xs: 2, md: 4 } }} xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="primary">
              <Link color="inherit" to="/">
                Home page
              </Link>
            </Typography>
            <Typography color="primary">Blog</Typography>
          </Breadcrumbs>
        </Grid>
        {/* card */}
        <Grid item xs={12}>
          <Box
            sx={{
              p: 4,
              mx: { xs: 2, md: 4 },
              backgroundColor: "#FCFCFC",
              borderRadius: 5,
            }}
          >
            <Grid container spacing={1}>
              <Grid item mb={2} xs={8}>
                <Typography mb={1} variant="body2">
                  {handleFormatDateTime("date")}
                </Typography>
                <Typography variant="body2">
                  {handleFormatDateTime("time")}
                </Typography>
              </Grid>
              <Grid item mb={2} xs={4}>
                <Button
                  fullWidth
                  onClick={() => setOpenDialogDeleteBlog(true)}
                  variant="outlined"
                >
                  Delete
                </Button>
              </Grid>
              <Grid item mb={2} xs={12}>
                <Typography mb={1} sx={{ textAlign: "justify" }} variant="h6">
                  {blog?.title}
                </Typography>
              </Grid>
              <Grid item mb={2} xs={12}>
                <Typography
                  mb={1}
                  sx={{ textAlign: "justify" }}
                  variant="subtitle2"
                >
                  {blog?.body}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
                fullWidth
                onClick={() => handleDeleteBlogPost(blog?.id)}
                variant="contained"
              >
                Delete blog post
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default BlogPage;
