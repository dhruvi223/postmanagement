// react imports
import React from "react";
import { useNavigate } from "react-router-dom";

// mui imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Posts() {
  const navigate = useNavigate();

  // retriving all posts from localstorage to display
  const posts2 = JSON.parse(localStorage.getItem("posts"));

  // navigating to detailed page of particular post
  const handleClick = (id) => {
    navigate("/postdetail", { state: { postid: id } });
  };

  const colors = ["#00bcd4"];

  return (
    <div>
      <Grid container spacing={5} sx={{ p: 4, marginLeft: 2, overflow: 'hidden', width: '190vh'}}>
        {Object.keys(posts2).map((key) => (
          <div key={posts2[key].id}>
            <Grid>
              <Card
                sx={{
                  width: 300,
                  height: 180,
                  border: 1,
                  borderColor: colors[key % colors.length],
                  padding: 1,
                  display: 'flex',
                  flexDirection:'column',
                  justifyContent: 'space-around'
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      {(posts2[key].title.charAt(0).toUpperCase() +
                        posts2[key].title.slice(1)).slice(0,70)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleClick(posts2[key].id);
                    }}
                  >
                    View Post
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default Posts;
