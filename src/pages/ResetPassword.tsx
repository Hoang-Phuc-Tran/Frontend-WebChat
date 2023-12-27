import { useFormik } from "formik";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuthServiceContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.oldPassword) {
        errors.oldPassword = "Required";
      }
      if (!values.newPassword) {
        errors.newPassword = "Required";
      }
      if (!values.confirmNewPassword) {
        errors.confirmNewPassword = "Required";
      } else if (values.newPassword !== values.confirmNewPassword) {
        errors.confirmNewPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      const { username, oldPassword, newPassword } = values;

      try {
        const response = await resetPassword(username, oldPassword, newPassword);

        if (response.status === 200) {
          console.log("Password reset successful");
          navigate("/login");
        } else if (response.status === 400) {
          // Handle incorrect old password
          setFieldError("oldPassword", "Incorrect old password. Please try again.");
        } else {
          // Handle other cases
          setFieldError("oldPassword", "An error occurred. Please try again later.");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Handle 'non_field_errors'
          if (error.response.data.non_field_errors) {
            const nonFieldErrorMessage = error.response.data.non_field_errors.join(" ");
            setFieldError("oldPassword", nonFieldErrorMessage);
          } else {
            // Handle other errors
            setFieldError("oldPassword", "Error resetting password");
          }
        } else {
          setFieldError("oldPassword", "An unexpected error occurred.");
        }
      }

      setSubmitting(false); // Ensure Formik knows submission has ended
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500, pb: 2 }}>
          Change Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            id="oldPassword"
            name="oldPassword"
            type="password"
            label="Old Password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={!!formik.touched.oldPassword && !!formik.errors.oldPassword}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <TextField
            margin="normal"
            fullWidth
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={!!formik.touched.newPassword && !!formik.errors.newPassword}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            margin="normal"
            fullWidth
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            label="Confirm New Password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={!!formik.touched.confirmNewPassword && !!formik.errors.confirmNewPassword}
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
          />
          <Button
            variant="contained"
            disableElevation
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            style={{ textDecoration: "none", marginTop: "10px" }}
          >
            Update Password
          </Button>
          <Button
            variant="contained"
            onClick={navigateHome}
            sx={{ mt: 1, mb: 2 }}
            style={{ textDecoration: "none", marginLeft: "160px" }}
          >
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
