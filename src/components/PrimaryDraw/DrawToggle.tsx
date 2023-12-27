// Import necessary components and icons from Material-UI and React.
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

// Define the props type for the DrawerToggle component.
type Props = {
  open: boolean; // Indicates whether the drawer is open or closed.
  handleDrawerClose: () => void; // Function to close the drawer.
  handleDrawerOpen: () => void; // Function to open the drawer.
};

// Define the DrawerToggle component as a functional component.
const DrawerToggle: React.FC<Props> = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Render an IconButton that toggles between ChevronLeft and ChevronRight icons based on 'open' prop. */}
      <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

// Export the DrawerToggle component as the default export.
export default DrawerToggle;
