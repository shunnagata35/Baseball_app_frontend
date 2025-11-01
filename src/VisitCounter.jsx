import { useEffect } from "react";
import axios from "axios";

function VisitCounter() {
  // Increment visit when the site is accessed
  useEffect(() => {
    axios.post("https://baseball-app-backend.onrender.com/api/visit")
      .catch(err => console.error("Error registering visit:", err));
  }, []);

  return <></>; // No UI shown
}

export default VisitCounter;
