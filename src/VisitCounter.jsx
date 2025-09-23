import React, { useState } from "react";
import axios from "axios";
import "./VisitCounter.css"; // <- import your css

function VisitCounter() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/visits");
      setCount(res.data.total);
    } catch (err) {
      console.error("Error fetching visit count:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={fetchCount} className="visit-button">
        Show User Count
      </button>
      {loading && <p>Loading...</p>}
      {count !== null && <p className="visit-text">Total Visitors: {count}</p>}
    </div>
  );
}

export default VisitCounter;
