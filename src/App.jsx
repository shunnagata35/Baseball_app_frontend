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
    // Increment visit counter on load
    axios
      .post("https://baseball-app-backend.onrender.com/api/visit")
      .then((res) => {
        setVisitCount(res.data.total);
      })
      .catch((err) => console.error("Error logging visit:", err));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "auto" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Page Tabs */}
      {activeTab === "metric" && <Calculator />}
      {activeTab === "correlation" && (
        <>
          <Correlation />
          <VisitCounter /> {/* Only on correlation page */}
        </>
      )}

      {/* Visit counter bubble */}
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
