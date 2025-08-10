import React, { useState } from "react";
import Navbar from "./Navbar";
import Calculator from "./Calculator";
import Correlation from "./Correlation";  // <-- new

function App() {
  const [activeTab, setActiveTab] = useState("metric"); // or "home"

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "auto" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "metric" && <Calculator />}
      {activeTab === "leaderboard" && <Leaderboard />}
      {activeTab === "correlation" && <Correlation />}  {/* <-- new */}
    </div>
  );
}

export default App;
