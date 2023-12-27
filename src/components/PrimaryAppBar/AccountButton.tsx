// Import necessary components and libraries from Material-UI and React.
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import { useState } from "react";

// Define the AccountButton component.
const AccountButton = () => {
  // Define state to manage the anchor element for the menu.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Determine whether the menu is open based on the presence of the anchor element.
  const isMenuOpen = Boolean(anchorEl);

  // Handle the opening of the profile menu.
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle the closing of the menu.
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Define the JSX for rendering the menu.
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMenuOpen}
      keepMounted
      onClose={handleMenuClose}
    >
      <MenuItem>
        {/* Render the DarkModeSwitch component within the menu. */}
        <DarkModeSwitch />
      </MenuItem>
    </Menu>
  );

  // Render the AccountButton component.
  return (
    <Box sx={{ display: { xs: "flex" } }}>
      {/* Render an IconButton with an AccountCircle icon that triggers the menu. */}
      <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </IconButton>
      {/* Render the menu when it is open. */}
      {renderMenu}
    </Box>
  );
};

// Export the AccountButton component as the default export.
export default AccountButton;
