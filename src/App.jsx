import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Calculator from "./Calculator";
import Correlation from "./Correlation";
import VisitCounter from "./VisitCounter";
import axios from "axios";

function App() {
  const [activeTab, setActiveTab] = useState("metric"); // default tab
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    // 1. Increment visit counter on load
    axios
      .post("https://baseball-app-backend.onrender.com/api/visit")
      .then((res) => {
        setVisitCount(res.data.total);
      })
      .catch((err) => console.error("Error logging visit:", err));

    // 2. Prompt user for email every time they load the site
    const email = prompt("Please enter your email address:");
    if (email) {
      console.log("User email:", email);

      // Optional: send email to backend
      // axios.post("https://baseball-app-backend.onrender.com/api/email", { email })
      //   .then(res => console.log("Email saved:", res.data))
      //   .catch(err => console.error("Error saving email:", err));
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "auto" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render pages based on active tab */}
      {activeTab === "metric" && <Calculator />}
      {activeTab === "leaderboard" && <Leaderboard />}
      {activeTab === "correlation" && <Correlation />}
      {activeTab === "correlation" && <VisitCounter />}

      {/* Visit counter overlay */}
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
