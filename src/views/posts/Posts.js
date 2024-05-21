// react imports
import React from 'react'
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
  const posts2 = JSON.parse(localStorage.getItem('posts'));
  
  // navigating to detailed page of particular post
  const handleClick = (id) => {
    navigate("/postdetail", { state: { postid: id } });
  };

  return (
    <div>
      <Grid container spacing={5} sx={{ p: 4 }}>
          {Object.keys(posts2).map((key) => (
            <div key={posts2[key].id}>
              <Grid>
                <Card sx={{ width: 250, height: 400}}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx = {{textAlign: 'left'}}>
                        {posts2[key].title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx = {{textAlign: 'left'}}>
                        {posts2[key].body}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
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
  )
}

export default Posts
