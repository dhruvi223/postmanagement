// react imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//redux import
import { fetchcomments } from "../../redux/action/postAction";

// mui imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

//component imports
import Practice from "../Practice";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function PostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const postid = location.state.postid;

  const [isComChecked, setIsComChecked] = useState({});

  const [comments, setComments] = useState({});
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [commentUser, setCommentUser] = useState([]);

  // for liking posts
  const [isChecked, setIsChecked] = useState(() => {
    const l = JSON.parse(localStorage.getItem("likedposts"));
    const l2 = l.filter((l) => l.id == postid);
    return l2.length == 0 ? false : true;
  });

  // for liking comment fetched from api
  const [isCommentChecked, setIsCommentChecked] = useState(
    Array(5).fill(false)
  );

  // for liking comment added by admin
  const [isCommentChecked2, setIsCommentChecked2] = useState(() => {
    const c = JSON.parse(localStorage.getItem("comments")).filter(
      (c) => c.postId == postid
    );
    const c2 = c.map((c) => c.liked);
    return c2;
  });

  // for deleting post
  const handleDeleteComment = (id) => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedComments = comments.filter((comment) => comment.id !== id);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    const comments2 = JSON.parse(localStorage.getItem("comments")) || [];
    const comments3 = comments2.filter((c) => c.postId == postid);
    setCommentUser(comments3);
  };

  // fetching comments from localstorage based on posts
  useEffect(() => {
    const comments2 = JSON.parse(localStorage.getItem("comments")) || [];
    const comments3 = comments2.filter((c) => c.postId == postid);
    setCommentUser(comments3);
  }, []);

  // fetches comments based on post by postid(id) from api
  const toggleDrawer = (newOpen) => {
    setOpen2(newOpen);
  };
  const handleUpdate = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const array = [
      postid * 5 - 4,
      postid * 5 - 3,
      postid * 5 - 2,
      postid * 5 - 1,
      postid * 5,
    ];
    const c = JSON.parse(localStorage.getItem("likedcomments"));
    const c1 = c.filter((c) => c.postId == postid);

    const idSet = new Set(c1.map((item) => item.id));

    const result = array.map((id) => idSet.has(id));
    setIsCommentChecked(result);
  }, []);

  //delete post from localstorage
  const handleDelete = (id) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/posts");
  };

  // retriving one post based on id from localstorage
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post2 = posts.find((post) => post.id === postid);

  // adding and removing liked posts from localstorage on like and dislike post.
  const handleChange = (event) => {
    setIsChecked(event.target.checked);

    if (event.target.checked) {
      const likedposts = JSON.parse(localStorage.getItem("likedposts"));
      likedposts.push(post2);
      localStorage.setItem("likedposts", JSON.stringify(likedposts));
    } else {
      const likedposts = JSON.parse(localStorage.getItem("likedposts"));
      const likedposts2 = likedposts.filter((post) => post.id != postid);
      localStorage.setItem("likedposts", JSON.stringify(likedposts2));
    }
  };

  const handleCheckboxChange = (comment, event) => {
    if (event.target.checked == true) {
      const likedcomments = JSON.parse(localStorage.getItem("likedcomments"));
      likedcomments.push(comment);
      localStorage.setItem("likedcomments", JSON.stringify(likedcomments));
    } else if (event.target.checked == false) {
      const likedcomments = JSON.parse(localStorage.getItem("likedcomments"));
      const likedcomments2 = likedcomments.filter(
        (com) => com.id != comment.id
      );
      localStorage.setItem("likedcomments", JSON.stringify(likedcomments2));
    }

    const array = [
      postid * 5 - 4,
      postid * 5 - 3,
      postid * 5 - 2,
      postid * 5 - 1,
      postid * 5,
    ];
    const c = JSON.parse(localStorage.getItem("likedcomments"));
    const c1 = c.filter((c) => c.postId == postid);

    const idSet = new Set(c1.map((item) => item.id));

    const result = array.map((id) => idSet.has(id));
    setIsCommentChecked(result);
  };

  const handleLikeComment = (commentId) => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          liked: !comment.liked,
        };
      }
      return comment;
    });
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    const c = updatedComments.filter((c) => c.postId == postid);
    const c2 = c.map((c) => c.liked);
    setIsCommentChecked2(c2);
  };

  const handleAddComment = () => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({
      id: comments.length + 1,
      postId: postid,
      body: input,
      email: JSON.parse(localStorage.getItem("loggedIn")).email,
      liked: false,
    });
    localStorage.setItem("comments", JSON.stringify(comments));
    setInput("");

    const comments2 = JSON.parse(localStorage.getItem("comments")) || [];
    const comments3 = comments2.filter((c) => c.postId == postid);
    setCommentUser(comments3);
  };

  useEffect(() => {
    dispatch(fetchcomments(setComments, post2.id));
  }, []);

  const handleComment = (id) => {
    setIsComChecked((prevState) => {
      const updatedState = { ...prevState };
      updatedState[id] = !updatedState[id];
      return updatedState;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* rendering post */}
      <Card
        sx={{
          width: 450,
          height: "auto",
          margin: 10,
          padding: 4,
          boxShadow: 4,
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "left" }}
            >
              {post2.title.charAt(0).toUpperCase() + post2.title.slice(1)}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "left", paddingTop: 2 }}
            >
              {post2.body.charAt(0).toUpperCase() + post2.body.slice(1)}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            icon={
              <FavoriteBorderIcon sx={{ fontSize: 32, color: "#9c27b0" }} />
            }
            checkedIcon={<FavoriteIcon sx={{ color: "red", fontSize: 32 }} />}
          />

          <Button
            size="large"
            color="secondary"
            onClick={() => {
              toggleDrawer(true);
            }}
          >
            <ModeCommentOutlinedIcon sx={{ fontSize: 32 }} />
          </Button>

          <Button
            size="large"
            color="secondary"
            onClick={() => {
              handleUpdate(post2.id);
            }}
          >
            <EditIcon sx={{ fontSize: 32 }} />
          </Button>

          <Button
            size="large"
            color="secondary"
            onClick={() => {
              handleDelete(post2.id);
            }}
          >
            <DeleteIcon sx={{ fontSize: 32 }} />
          </Button>
        </CardActions>
      </Card>

      {/* dialogue for editing post */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const posts = JSON.parse(localStorage.getItem("posts")) || [];

            const editedPosts = posts.map((post) => {
              if (post.id === postid) {
                return {
                  ...post,
                  title: formJson.title,
                  body: formJson.body,
                };
              }
              return post;
            });
            localStorage.setItem("posts", JSON.stringify(editedPosts));

            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="body"
            name="body"
            label="Description"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* comments */}

      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            marginLeft: "calc(42% - 250px)",
            marginRight: "calc(42% - 250px)",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open2}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary", fontSize: 20 }}>
            {comments.length + commentUser.length} comments
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {Object.keys(comments).map((key) => (
            <div key={comments[key].id}>
              <Grid item xs={12}>
                <Box sx={{ margin: 4 }}>
                  <Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ fontSize: 20 }}>
                        {comments[key].email}
                      </Typography>
                      <Checkbox
                        checked={isCommentChecked[key]}
                        onChange={(event) =>
                          handleCheckboxChange(comments[key], event)
                        }
                        icon={
                          <FavoriteBorderIcon
                            sx={{ fontSize: 20, marginLeft: 1 }}
                          />
                        }
                        checkedIcon={
                          <FavoriteIcon
                            sx={{ color: "red", fontSize: 20, marginLeft: 1 }}
                          />
                        }
                      />
                    </Box>

                    <Typography
                      sx={{
                        display: "inline",
                        color: "gray",
                        display: "flex",
                        paddingTop: 1,
                        fontSize: 18,
                      }}
                    >
                      {comments[key].body}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </div>
          ))}

          {Object.keys(commentUser).map((key) => {
            const isDisplay = isComChecked[commentUser[key].id];
            return (
              <div key={commentUser[key].id}>
                <Grid item xs={12}>
                  <Box sx={{ margin: 4 }}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 20 }}
                          onClick={() => handleComment(commentUser[key].id)}
                        >
                          {commentUser[key].email}
                        </Typography>
                        <Box>
                          {isDisplay && (
                            <IconButton
                              onClick={() =>
                                handleDeleteComment(commentUser[key].id)
                              }
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          )}
                          <Checkbox
                            onChange={(event) =>
                              handleLikeComment(commentUser[key].id, event)
                            }
                            checked={isCommentChecked2[key]}
                            icon={
                              <FavoriteBorderIcon
                                sx={{ fontSize: 20, marginLeft: 1 }}
                              />
                            }
                            checkedIcon={
                              <FavoriteIcon
                                sx={{
                                  color: "red",
                                  fontSize: 20,
                                  marginLeft: 1,
                                }}
                              />
                            }
                          />
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          display: "inline",
                          color: "gray",
                          display: "flex",
                          paddingTop: 1,
                          fontSize: 18,
                        }}
                      >
                        {commentUser[key].body}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </div>
            );
          })}

          {/* <Practice postid={postid}/> */}

          <Box
            sx={{
              display: "inline",
              color: "gray",
              display: "flex",
              paddingTop: 1,
              paddingX: 3.5,
              fontSize: 14,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              placeholder="Add comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "none",
                color: "inherit",
                fontSize: 17,
              }}
            />
            <IconButton onClick={() => handleAddComment()}>
              {input.length !== 0 ? (
                <SendIcon sx={{ color: "green" }} />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Box>
  );
}

export default PostDetail;
