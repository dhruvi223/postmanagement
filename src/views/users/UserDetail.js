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
        {/* Displaying username */}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "left" }}
        >
          {username}
        </Typography>

        <Box>
          {/* Displaying albums */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "left", marginTop: 8 }}
          >
            Albums
          </Typography>
          <List
            sx={{
              width: "full",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 2,
              marginTop: 2,
            }}
          >
            {Object.values(albums).map((album) => (
              <div key={album.id}>
                <ListItem disablePadding>
                  <Box
                    sx={{
                      width: 400,
                      height: 70,
                      borderRadius: 1,
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: 2,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                          {album.title}
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
              </div>
            ))}
          </List>

          {/* Displaying todos */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "left", marginTop: 8 }}
          >
            Todos
          </Typography>
          <List
            sx={{
              width: "full",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 2,
              marginTop: 2,
            }}
          >
            {Object.values(todos).map((todo) => (
              <div key={todo.id}>
                <ListItem disablePadding>
                  <Box
                    sx={{
                      width: 400,
                      height: 70,
                      borderRadius: 1,
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: 2,
                      backgroundColor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon>
                      <TaskAltIcon
                        color={todo.completed ? "success" : "warning"}
                      />
                    </ListItemIcon>

                    <ListItemText primary={todo.title} />
                  </Box>
                </ListItem>
                {/* <Divider /> */}
              </div>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}
