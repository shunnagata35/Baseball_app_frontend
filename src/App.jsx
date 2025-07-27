import React, { useState } from "react";
import Navbar from "./Navbar";
import Calculator from "./Calculator";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "home" && <h2>Welcome to Statool!</h2>}
        {activeTab === "metric" && <Calculator />}
      </div>
    </div>
  );
}

export default App;
