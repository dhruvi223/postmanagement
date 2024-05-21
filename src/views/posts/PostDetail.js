// react imports
import React, { useState } from "react";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

function PostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const postid = location.state.postid;

  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = React.useState(false);

  // fetches comments based on post by postid(id) from api
  const handleComments = (id) => {
    setShowComments(!showComments);
    dispatch(fetchcomments(setComments, id));
  };

  const handleUpdate = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <div>

      {/* rendering post */}
      <Card sx={{ width: 400, height: "auto", margin: 10 }}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "left" }}
            >
              {post2.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left" }}
            >
              {post2.body}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            size="large"
            color="primary"
            onClick={() => {
              handleComments(post2.id);
            }}
          >
            <ModeCommentOutlinedIcon sx={{ fontSize: 32 }} />
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={() => {
              handleDelete(post2.id);
            }}
          >
            <DeleteIcon sx={{ fontSize: 32 }} />
          </Button>

          <Button
            size="large"
            color="primary"
            onClick={() => {
              handleUpdate(post2.id);
            }}
          >
            <EditIcon sx={{ fontSize: 32 }} />
          </Button>
        </CardActions>
      </Card>


{/* rendering comments for post */}
{ showComments &&
      <ListItem alignItems="flex-start" sx={{ width: 500 }}>
        <Grid container spacing={3} sx={{ p: 4, marginLeft: 5 }}>
          {Object.keys(comments).map((key) => (
            <div key={comments[key].id}>
              <Grid item xs={12}>
                <List>
                  <ListItemText
                    primary={comments[key].name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {comments[key].email}
                        </Typography>

                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="gray"
                        >
                          {comments[key].body}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" />
                </List>
              </Grid>
            </div>
          ))}
        </Grid>
      </ListItem>
}

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
            console.log(formJson);
            console.log(postid);

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

            console.log(editedPosts);
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
            label="Body"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PostDetail;
