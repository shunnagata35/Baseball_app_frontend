import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Calculator from "./Calculator";
import Correlation from "./Correlation";   // <-- make sure this file exists
import axios from "axios";
import VisitCounter from "./VisitCounter";


function App() {
  const [activeTab, setActiveTab] = useState("metric"); // default tab
  const [visitCount, setVisitCount] = useState(null);

  // Count visits every time the app mounts
  useEffect(() => {
    axios
      .post("https://<your-render-backend>.onrender.com/api/visit")
      .then((res) => {
        setVisitCount(res.data.total);
      })
      .catch((err) => console.error("Error logging visit:", err));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "auto" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render pages based on active tab */}
      {activeTab === "metric" && <Calculator />}
      {activeTab === "leaderboard" && <Leaderboard />}
      {activeTab === "correlation" && <Correlation />}
      {activeTab === "correlation" && < VisitCounter/>}

      {/* Visit counter (optional UI) */}
      <div
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          opacity: 0.7,
          background: "#eee",
          padding: "6px 10px",
          borderRadius: "8px",
          fontSize: "0.9rem",
        }}
      >
        Visits: {visitCount ?? "…"}
      </div>
    </div>
  );
}

export default App;
