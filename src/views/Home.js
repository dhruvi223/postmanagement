// react imports
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import bgimage from '../assets/home-image.png'
import bgimg from '../assets/homebg.png'
import '../App.css'

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
      if (p == null) {
        localStorage.setItem("posts", JSON.stringify(posts));
      }
    }
  }, [posts]);

  const l = [];

  const likedposts = JSON.parse(localStorage.getItem("likedposts"));
  if (likedposts == null) {
    localStorage.setItem("likedposts", JSON.stringify(l));
  }

  const likedcomments = JSON.parse(localStorage.getItem("likedcomments"));
  if (likedcomments == null) {
    localStorage.setItem("likedcomments", JSON.stringify(l));
  }

  const comments = JSON.parse(localStorage.getItem("comments"));
  if (comments == null) {
    localStorage.setItem("comments", JSON.stringify(l));
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "94vh",
      }}
      >
        <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgimg})`,
          // backgroundImage: `url('https://wpsocialninja.com/wp-content/uploads/2021/10/Tiny-PNG-The_Secret_Game_Changer_Social_Media_Customer_Engagement_.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6, 
          zIndex: -1, 
        }}
      />
      <div className="poetsen-one-regular" variant="h4" gutterBottom style={{ color: '#4a148c', marginBottom: 800, fontSize: 70 }}>
        Welcome to Post Management
      </ div>
    </Box>
  );
}
