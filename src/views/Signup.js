import React from 'react'
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {emailRegex, passwordRegex} from "../constants/validation"
import { emailMessages, passwordMessages, name } from "../constants/messages";
import { useAuth } from '../AuthContext';

import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = async (data) => {
    
    auth.signup(data.firstName, data.lastName, data.email, data.mobile, data.password, data.cpassword, navigate);
  }
  



  return (
    <div>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", { required: true, maxLength: 10 })}
                />
              {errors.firstName && <p className="block text-xs text-red-700 text-left">{name.firstname}</p>} 
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", { required: true, maxLength: 10 })}
                />
              {errors.lastName && <p className="block text-xs text-red-700 text-left">{name.lastname}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", { required: true, pattern: emailRegex } )}
                />
              {errors.email && <p className="block text-xs text-red-700 text-left">{emailMessages.invalid}</p>}
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile number"
                  name="mobile"
                  autoComplete="mobile"
                  {...register("mobile", { required: true, minLength:10, maxLength: 10 } )}
                />
              {errors.email && <p className="block text-xs text-red-700 text-left">{emailMessages.invalid}</p>}
              </Grid>


              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true, pattern: passwordRegex })}
                />
                 {errors.password && <p className="block text-xs text-red-700 text-left">{passwordMessages.weak}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="confirm-password"
                  {...register("cpassword", { required: true, pattern: passwordRegex })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      
    </div>
  )
}
