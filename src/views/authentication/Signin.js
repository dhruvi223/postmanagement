import bgimg from '../../assets/socialmedia.webp'

//react imports
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//mui imports
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//constant imports
import { emailRegex, passwordRegex } from "../../constants/validation";
import {
  emailMessages,
  passwordMessages,
  name,
} from "../../constants/messages";

// context import for signin
import { useAuth } from "../../context/AuthContext";
import { Repeat } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  const navigate = useNavigate();

  // login 
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password
    auth.login(email, password, navigate);
  };

  return (
    <Box sx = {{}}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7, 
          zIndex: -1, 
        }}
      />
      <Container component="main" maxWidth="xs" sx = {{backgroundColor: 'white', border:0, borderRadius:2, paddingTop:1 ,paddingBottom: 4, marginTop:20}} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: true, pattern: emailRegex })}
            />
            {errors.email && (
              <Box
                component="p"
                sx={{ color: "red", textAlign: "left", fontSize: 15 }}
              >
                {emailMessages.invalid}
              </Box>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
                pattern: passwordRegex,
              })}
            />
            {errors.password && (
              <Box
                component="p"
                sx={{ color: "red", textAlign: "left", fontSize: 15 }}
              >
                {passwordMessages.weak}
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
