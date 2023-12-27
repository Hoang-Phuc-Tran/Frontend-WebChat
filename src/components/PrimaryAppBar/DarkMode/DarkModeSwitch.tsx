import { useContext } from "react";
import { ColorModeContext } from "../../../context/DarkModeContext";
import { useTheme } from "@mui/material/styles";
import { IconButton, Typography, Button } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../../../context/AuthContext";

const DarkModeSwitch = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthServiceContext();

  const toggleLogin = async () => {
    if (isLoggedIn) {
      // Call the logout function provided by your auth service context
      await logout();
      navigate("/"); // Redirect to the main page after logging out
    } else {
      // Here you should implement what happens when the user clicks 'Login'
      // This could be navigating to a login page, opening a login modal, etc.
      navigate("/login"); // For example, navigate to a login page
    }
  };

  const handleChangePassword = () => {
    // Navigate to the change password page
    navigate("/resetPassword"); // Update the route as per your application's routing structure
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Brightness4Icon sx={{ marginRight: "6px", fontSize: "20px" }} />
        <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
          {theme.palette.mode} Mode
        </Typography>
        <IconButton sx={{ m: 0, p: 0, pl: 2 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? (
            <ToggleOffIcon sx={{ fontSize: "2.5rem", p: 0 }} />
          ) : (
            <ToggleOnIcon sx={{ fontSize: "2.5rem" }} />
          )}
        </IconButton>
      </div>
      {/* Change Password Button (only shown when logged in) */}
      {isLoggedIn && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "6px",
            marginTop: "9px",
          }}
        >
          <Button color="inherit" onClick={handleChangePassword}>
            Change Password
          </Button>
        </div>
      )}

      {/* Login/Logout Button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button color="inherit" onClick={toggleLogin}>
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default DarkModeSwitch;
