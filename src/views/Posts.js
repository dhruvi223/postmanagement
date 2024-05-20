import React from 'react'
import { useEffect } from "react";
import { fetchposts } from '../redux/action/postAction';
import { useDispatch } from "react-redux";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
 

function Posts() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const posts2 = JSON.parse(localStorage.getItem('posts'));
  
  useEffect(() => {
    dispatch(fetchposts(setPosts));
  }, []);

  
  
  const handleClick = (id) => {
    navigate("/postdetail", { state: { postid: id } });
  };
  
  const p = JSON.parse(localStorage.getItem('posts'));

  useEffect(() => {
  if(posts?.length > 0){
   
    if (p == null){
      localStorage.setItem('posts', JSON.stringify(posts));

    }
  }
}, [posts]);

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
