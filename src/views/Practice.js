import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Practice(props) {
  const { postid } = props;
  console.log(postid);

  const [commentUser, setCommentUser] = useState([]);
  const [isChecked, setIsChecked] = useState([]);



  const handleDeleteComment = (id) => {
  
  };



  useEffect(() => {
    const comments2 = JSON.parse(localStorage.getItem("comments")) || [];
    const comments3 = comments2.filter((c) => c.postId == postid);
    setCommentUser(comments3);
  }, []);

  console.log(commentUser);

  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  console.log(open, "open");

  return (
    <div>
      {Object.keys(commentUser).map((key) => (
        <div key={commentUser[key].id}>
          <Grid item xs={12}>
            <Checkbox
              aria-describedby={id}
              onClick={handleClick}
              icon={
                <Box>
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

                  <IconButton
                    onClick={() => handleDeleteComment(commentUser[key].id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              }
              checkedIcon={
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
              }
            />
            <BasePopup id={id} open={open} anchor={anchor}>
              <IconButton
                sx={{
                  color: "#d32f2f",
                  backgroundColor: "#eeeeee",
                  borderRadius: 2,
                }}
              >
                <DeleteOutlineIcon />
                <Typography>Delete</Typography>
              </IconButton>
            </BasePopup>
          </Grid>
        </div>
      ))}
      hello
    </div>
  );
}

export default Practice;
