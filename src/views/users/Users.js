// react imports
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// redux imports
import { fetchusers } from "../../redux/action/postAction";

//mui imports
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import IconButton from "@mui/material/IconButton";
import { name } from "../../constants/messages";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState({});

  // fetch users from api
  useEffect(() => {
    dispatch(fetchusers(setUsers));
  }, []);

  // navigate to page of particular user on clicking
  const handleClick = (user) => {
    navigate("/userdetail", { state: { user: user } });
  };

  return (
    <div>
      {/* displaying users */}
      <Grid container spacing={6} pl={3} pt={3}>
        {Object.keys(users).map((key) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
            <Card
              sx={{
                // width: 550,
                height: 235,
                border: 1,
                borderColor: "#eeeeee",
                xs: {
                  width: 100,
                },
                sm: {
                  width: 100,
                },
                md: {
                  width: 200,
                },
                lg: {
                  width: 300,
                },
                xl: {
                  width: 550,
                },
              }}
              key={users[key].id}
            >
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    align="left"
                    sx={{ fontWeight: 600 }}
                  >
                    {users[key].name}
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton color="gray">
                      <EmailOutlinedIcon />
                    </IconButton>
                    <Typography
                      gutterBottom
                      component="div"
                      align="left"
                      sx={{ color: "gray", marginTop: 1 }}
                    >
                      {users[key].email}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton color="gray">
                      <CallOutlinedIcon />
                    </IconButton>
                    <Typography
                      gutterBottom
                      component="div"
                      align="left"
                      sx={{ color: "gray", marginTop: 1 }}
                    >
                      {users[key].phone}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton color="gray">
                      <LanguageOutlinedIcon />
                    </IconButton>
                    <Typography
                      gutterBottom
                      component="div"
                      align="left"
                      sx={{ color: "gray", marginTop: 1 }}
                    >
                      http://{users[key].website}
                    </Typography>
                  </Box>
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
                    handleClick({ id: users[key].id, name: users[key].name });
                  }}
                >
                  View User
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
