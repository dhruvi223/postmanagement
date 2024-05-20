import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {emailRegex, passwordRegex} from "../constants/validation"
import { emailMessages, passwordMessages, name } from "../constants/messages";
import { useForm } from "react-hook-form"
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom'


const defaultTheme = createTheme();

export default function Signin() {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    auth.login(data.email, data.password, navigate);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: true, pattern: emailRegex } )}
            />
            {errors.email && <p className="block text-xs text-red-700 text-left">{emailMessages.invalid}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true, pattern: passwordRegex })}
            />
             {errors.password && <p className="block text-xs text-red-700 text-left ">{passwordMessages.weak}</p>}
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
    </ThemeProvider>
  );
}
