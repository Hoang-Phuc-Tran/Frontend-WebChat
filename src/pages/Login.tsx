import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  const { login } = useAuthServiceContext();
  const navigate = useNavigate();
  const handleDemoLogin = async () => {
    // Directly call login function without using Formik's submitForm
    const status = await login("DemoUser", "Thisisdemo");
    if (status !== 401) {
      navigate("/");
    } else {
      // Handle the error here. For example, set an error message state and display it.
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "", // Added confirmPassword field
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const status = await login(username, password);
      if (status === 401) {
        console.log("Unauthorised");
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      } else {
        navigate("/");
      }
    },
  });
  const navigateHome = () => {
    navigate("/"); // Navigates to the home page
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component="h1"
          sx={{
            fontWeight: 500,
            pb: 2,
          }}
        >
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            id="username"
            name="username"
            label="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          ></TextField>
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            type="password"
            label="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          ></TextField>
          <TextField
            margin="normal"
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          ></TextField>
          <Button variant="contained" disableElevation type="submit" sx={{ mt: 1, mb: 2 }}>
            Next
          </Button>
          <Link to="/register" style={{ textDecoration: "none", marginLeft: "10px" }}>
            <Button variant="contained" sx={{ mt: 1, mb: 2 }}>
              Register
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={navigateHome}
            sx={{ mt: 1, mb: 2 }}
            style={{ textDecoration: "none", marginLeft: "145px" }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            onClick={handleDemoLogin}
            sx={{ mt: 1, mb: 2 }}
            style={{ textDecoration: "none", marginLeft: "10px", marginTop: "40px" }}
          >
            Sign in as a Demo Account! Please click here!
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
