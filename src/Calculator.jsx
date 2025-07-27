import React, { useState } from "react";
import axios from "axios";

function Calculator() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState([]);

  const handleCalculate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/calculate", { formula });
      setResult(response.data.top_players); // <- make sure this is top_players
    } catch (error) {
      console.error("Error calculating metric:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Custom Baseball Metric Calculator</h1>
      <input
        type="text"
        placeholder="Enter formula (e.g., HR * 1.5 - SO)"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        style={{ marginRight: "10px", width: "300px" }}
      />
      <button onClick={handleCalculate}>Calculate</button>

      {result.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Results</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                {Object.keys(result[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Calculator;
