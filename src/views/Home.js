// react imports
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// redux import
import { fetchposts } from "../redux/action/postAction";

// mui imports
import { Box, Typography } from "@mui/material";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

// fetching posts from api
  useEffect(() => {
    dispatch(fetchposts(setPosts));
  }, []);



/* retrives posts from localstorage and sets posts in localstorage if it is null(not already set in localstorage). */
  const p = JSON.parse(localStorage.getItem("posts"));
  useEffect(() => {
    if (posts?.length > 0) {
      console.log(posts);
      if (p == null) {
        console.log("yes");
        localStorage.setItem("posts", JSON.stringify(posts));
      }
    }
  }, [posts]);



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0", // Background color
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 50 }}>
        Welcome to Post Management
      </Typography>
    </Box>
  );
}
