import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Register = () => {
  const { register } = useAuthServiceContext();
  const navigate = useNavigate();
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
      const status = await register(username, password);
      if (status === 409) {
        formik.setErrors({
          username: "Invalid username",
        });
      } else if (status === 401) {
        console.log("Unauthorised");
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      } else {
        navigate("/login");
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
          Register
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
          <Link to="/Login" style={{ textDecoration: "none", marginLeft: "10px" }}>
            <Button variant="contained" sx={{ mt: 1, mb: 2 }}>
              Have account ?
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={navigateHome}
            sx={{ mt: 1, mb: 2 }}
            style={{ textDecoration: "none", marginLeft: "100px" }}
          >
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
