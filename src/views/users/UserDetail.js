// react imports
import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//redux imports
import { fetchalbums } from "../../redux/action/postAction";
import { fetchtodos } from "../../redux/action/postAction";

// mui imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ListItemIcon } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function UserDetail() {
  const dispatch = useDispatch();

  const location = useLocation();
  const user = location.state.user;
  const userid = user.id;
  const username = user.name;

  const [albums, setAlbums] = useState({});
  const [todos, setTodos] = useState({});


  // fetching albums and todos for particular user(based on userId)
  useEffect(() => {
    dispatch(fetchalbums(setAlbums, userid));
    dispatch(fetchtodos(setTodos, userid));
  }, []);

  return (
    <div>
      <Box sx={{ margin: 10 }}>

        {/* displaying username */}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "left" }}
        >
          {username}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", margin: 4 }}>

        {/* displaying albums */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "left" }}
          >
            Albums
          </Typography>
          <ListItem alignItems="flex-start" sx={{ width: 500, marginTop: 5 }}>
            <Grid container spacing={3} sx={{ p: 4, marginLeft: 5 }}>
              {Object.keys(albums).map((key) => (
                <div key={albums[key].id}>
                  <Grid item xs={12}>
                    <List>
                      <ListItemText primary={albums[key].title} />
                      <Divider />
                    </List>
                  </Grid>
                </div>
              ))}
            </Grid>
          </ListItem>


        {/* displaying todos */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "left" }}
          >
            Todos
          </Typography>

          <ListItem alignItems="flex-start" sx={{ width: 500, marginTop: 5 }}>
            <Grid container spacing={3} sx={{ p: 4, marginLeft: 5 }}>
              {Object.keys(todos).map((key) => (
                <div key={todos[key].id}>
                  <Grid item xs={12}>
                    <List>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <ListItemText primary={todos[key].title} />
                        {todos[key].completed == true && (
                          <ListItemIcon sx={{ marginLeft: 2 }}>
                            <TaskAltIcon />
                          </ListItemIcon>
                        )}
                      </div>
                      <Divider />
                    </List>
                  </Grid>
                </div>
              ))}
            </Grid>
          </ListItem>

        </Box>
      </Box>
    </div>
  );
}
