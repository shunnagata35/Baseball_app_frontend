import React, { useState } from "react";
import axios from "axios";
import "./Calculator.css"; // <- add the styles below

function Calculator() {
  const [formula, setFormula] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const formatVal = (v) => {
    if (v === null || v === undefined) return "";
    if (typeof v === "number") {
      // fewer decimals for tidy display
      return Number.isInteger(v) ? v : v.toFixed(3);
    }
    return v;
  };

  const handleCalculate = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/calculate`
          : "http://localhost:5000/calculate",
        { formula }
      );
      setRows(res.data || []);
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to calculate.");
    } finally {
      setLoading(false);
    }
  };

  const hasData = rows && rows.length > 0;

  return (
    <div className="calc-wrap">
      <h1 className="calc-title">Custom Baseball Metric Calculator</h1>

      <div className="calc-controls">
        <input
          className="calc-input"
          type="text"
          placeholder="Enter formula (e.g., HR * 1.5 - SO)"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
        />
        <button className="calc-btn" onClick={handleCalculate} disabled={loading}>
          {loading ? "Calculating…" : "Calculate"}
        </button>
      </div>

      {err && <div className="calc-error">{err}</div>}

      <div className="table-card">
        {!hasData ? (
          <div className="empty-hint">Results will appear here after you calculate.</div>
        ) : (
          <div className="table-scroll">
            <table className="nice-table">
              <thead>
                <tr>
                  <th className="col-index">#</th>
                  {Object.keys(rows[0]).map((k) => (
                    <th key={k}>{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="col-index">{i + 1}</td>
                    {Object.keys(rows[0]).map((k) => (
                      <td key={k} className="numish">
                        {formatVal(row[k])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
