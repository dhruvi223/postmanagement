// React imports
import React from "react";
import { useState } from "react";

// mui imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

//context import for authentication
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const [anchorEl, setAnchorEl] = useState(null);
  const [open2, setOpen2] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  //loggedin status from local storage
  const isloggedIn = JSON.parse(localStorage.getItem("isloggedIn"));

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

// logout
  const logout = () => {
    auth.logout(navigate);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <FormGroup></FormGroup>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Post Management
            </Typography>
            {isloggedIn && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link href="/posts" underline="none">
                    <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                      Posts
                    </MenuItem>
                  </Link>
                  <Link href="/users" underline="none">
                    <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                      Users
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={handleClose}>
                    <Button
                      sx={{ color: "black", pl: 0 }}
                      onClick={handleClickOpen}
                    >
                      Create post
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <Button
                      sx={{ color: "black", paddingLeft: 0 }}
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            )}

            {!isloggedIn && (
              <Link href="/signin">
                <Button sx={{ color: "white" }}>Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog
        open={open2}
        onClose={handleClose2}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const randompostId = Math.floor(Math.random() * 900000) + 100;
            const randomuserId = Math.floor(Math.random() * 900000) + 10;
            const posts = JSON.parse(localStorage.getItem("posts")) || [];
            const newPost = {
              body: formJson.body,
              id: randompostId,
              title: formJson.title,
              userId: randomuserId,
            };
            const updatedPosts = [...posts, newPost];
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            handleClose2();
          },
        }}
      >
        <DialogTitle>Create List</DialogTitle>
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
          <Button onClick={handleClose2}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
