// In a new file, create a component called HashHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HashHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, check if there's a hash in the URL and navigate there
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      navigate(hash);
    }
  }, [navigate]);

  // This component doesn't render anything
  return null;
};

export default HashHandler;
