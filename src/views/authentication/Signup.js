import image from '../../assets/bgimage.jpeg'
import bgimage from '../../assets/socialmedia.webp'

// react imports
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// mui imports
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// constant imports
import {
  emailRegex,
  passwordRegex,
  mobileRegex,
  firstnameRegex,
  lastnameRegex,
} from "../../constants/validation";
import {
  emailMessages,
  passwordMessages,
  name,
  mobileMessages,
} from "../../constants/messages";

// context import for sign up
import { useAuth } from "../../context/AuthContext";
import { Image } from "@mui/icons-material";

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // signup
  const onSubmit = async (data) => {
    auth.signup(
      data.firstName,
      data.lastName,
      data.email,
      data.mobile,
      data.password,
      data.cpassword,
      navigate
    );
  };

  return (
    <Box sx = {{ display:'flex', flexDirection:'row', height: '93vh'}}>
      <Box sx={{height:'94.8vh',width: {xl: '75%',lg: "60%" ,md: '50%', sm: '0%', xs: '0%'},backgroundImage:`url(${bgimage})`, backgroundRepeat:'no-repeat', backgroundSize: 'cover'}}>
       {/* <Box component="img" src = {bgimage}  sx = {{width: 1800, height:1171, opacity: { xl: 1, md: 0.2, sm: 0.2, xs: 0.2 }}}></Box> */}
      </Box>
    <Box sx={{width:{xl:'25%', lg: "40%" ,md: '50%', sm: '100%', xs: '100%'}, height: '500px'}}>
      <Container component="main" sx = {{width: 450, marginTop: 0, paddingTop:20}}>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
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
                  {...register("firstName", {
                    required: true,
                    pattern: firstnameRegex,
                  })}
                />
                {errors.firstName && (
                  <Box
                    component="p"
                    sx={{ color: "red", textAlign: "left", fontSize: 14 }}
                  >
                    {name.firstname}
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", {
                    required: true,
                    pattern: lastnameRegex,
                  })}
                />
                {errors.lastName && (
                  <Box
                    component="p"
                    sx={{ color: "red", textAlign: "left", fontSize: 15 }}
                  >
                    {name.lastname}
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern: emailRegex,
                  })}
                />
                {errors.email && (
                  <Box
                    component="p"
                    sx={{ color: "red", textAlign: "left", fontSize: 15 }}
                  >
                    {emailMessages.invalid}
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile number"
                  name="mobile"
                  autoComplete="mobile"
                  {...register("mobile", {
                    required: true,
                    pattern: mobileRegex,
                    minLength: 10,
                    maxLength: 10,
                  })}
                />
                {errors.mobile && (
                  <Box
                    component="p"
                    sx={{ color: "red", textAlign: "left", fontSize: 15 }}
                  >
                    {mobileMessages.invalid}
                  </Box>
                )}
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
                  {...register("cpassword", {
                    required: true,
                    pattern: passwordRegex,
                  })}
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
    </Box>
    </Box>
  );
}
