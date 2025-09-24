import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VisitCounter.css"; // <- import your css

function VisitCounter() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Increment visit when component mounts
  useEffect(() => {
    const registerVisit = async () => {
      try {
        const res = await axios.post(
          "https://baseball-app-backend.onrender.com/api/visit"
        );
        setCount(res.data.total);
      } catch (err) {
        console.error("Error registering visit:", err);
      } finally {
        setLoading(false);
      }
    };

    registerVisit();
  }, []);

  // Fetch current count without incrementing
  const fetchCount = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://baseball-app-backend.onrender.com/api/visits"
      );
      setCount(res.data.total);
    } catch (err) {
      console.error("Error fetching visit count:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={fetchCount} className="visit-button">
        Show User Count
      </button>
      {loading && <p>Loading...</p>}
      {count !== null && (
        <p className="visit-text">Total Visitors: {count}</p>
      )}
    </div>
  );
}

export default VisitCounter;
