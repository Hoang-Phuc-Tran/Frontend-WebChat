// Import necessary components and libraries from Material-UI and React.
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useRef } from "react";

// Define the props for the Scroll component.
interface ScrollProps {
  children: React.ReactNode;
}

// Create a styled ScrollContainer component using Material-UI's 'styled' function.
const ScrollContainer = styled(Box)(() => ({
  // Set the height of the scroll container to be 100% of the viewport height minus 190 pixels.
  height: `calc(100vh - 190px)`,
  // Enable vertical scrolling for overflow content.
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    // Customize the scrollbar width and height.
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    // Define the appearance of the scrollbar thumb.
    backgroundColor: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    // Change the thumb's background color on hover.
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    // Customize the scrollbar track (background).
    // backgroundColor: "#f0f0f0", // Uncomment this line to add a background color.
  },
  "&::-webkit-scrollbar-corner": {
    // Set the scrollbar corner to be transparent.
    backgroundColor: "transparent",
  },
}));

// Define the Scroll component.
const Scroll = ({ children }: ScrollProps) => {
  // Create a ref to the scrollable container element.
  const scrollRef = useRef<HTMLDivElement>(null);

  // Define a function to scroll to the bottom of the container.
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  // Automatically scroll to the bottom whenever the content changes.
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, children]);

  // Render the ScrollContainer with the provided children.
  return <ScrollContainer ref={scrollRef}>{children}</ScrollContainer>;
};

// Export the Scroll component as the default export.
export default Scroll;
