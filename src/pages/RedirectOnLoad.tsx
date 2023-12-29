// RedirectOnLoad.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectOnLoad = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the path from the window location
    const path = window.location.pathname;
    // Perform the redirect
    navigate(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount

  return null; // This component does not render anything
};

export default RedirectOnLoad;
