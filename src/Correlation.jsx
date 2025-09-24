import React, { useState } from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

// Use env var if you have one; fallback to your Render URL
const API =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://baseball-app-backend.onrender.com";

export default function Correlation() {
  const [mode, setMode] = useState("players"); // "players" or "teams"
  const [xFormula, setXFormula] = useState("HR - SO");
  const [yFormula, setYFormula] = useState("R");
  const [points, setPoints] = useState([]);
  const [r, setR] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setError("");
    setPoints([]);
    setR(null);
    setLoading(true);

    try {
      const url =
        mode === "teams"
          ? `${API}/correlation/teams`
          : `${API}/correlation/players`;

      const res = await axios.post(
        url,
        {
          x_formula: xFormula,
          y_formula: yFormula,
          season: 2025,
        },
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true, // enable only if you use cookies
        }
      );

      if (res.data?.error) {
        setError(res.data.error);
      } else {
        setPoints(res.data.points || []);
        setR(res.data.r ?? null);
      }
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to compute correlation.");
    } finally {
      setLoading(false);
    }
  };

  const data = {
    datasets: [
      {
        label: mode === "teams" ? "Teams" : "Players",
        data: points.map((p) => ({ x: p.x, y: p.y })),
        pointRadius: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: xFormula } },
      y: { title: { display: true, text: yFormula } },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const p = points[ctx.dataIndex];
            return `${p.label}: (${ctx.parsed.x.toFixed(2)}, ${ctx.parsed.y.toFixed(2)})`;
          },
        },
      },
      legend: { display: false },
    },
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Correlation</h1>

      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <button
          onClick={() => setMode("teams")}
          style={{
            padding: "8px 12px",
            border: "1px solid #000",
            background: mode === "teams" ? "#e9a8a8" : "#fff",
            cursor: "pointer",
          }}
        >
          Team Correlation
        </button>
        <button
          onClick={() => setMode("players")}
          style={{
            padding: "8px 12px",
            border: "1px solid #000",
            background: mode === "players" ? "#e9a8a8" : "#fff",
            cursor: "pointer",
          }}
        >
          Player Correlation
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <input
          value={xFormula}
          onChange={(e) => setXFormula(e.target.value)}
          style={{ padding: 8, width: 300 }}
          placeholder="X-axis formula (e.g., HR - SO)"
        />
        <input
          value={yFormula}
          onChange={(e) => setYFormula(e.target.value)}
          style={{ padding: 8, width: 300 }}
          placeholder="Y-axis formula (e.g., R)"
        />
        <button onClick={handleRun} style={{ padding: "8px 16px" }} disabled={loading}>
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      {!!error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {r !== null && (
        <div style={{ marginBottom: 8 }}>
          <strong>Correlation (r):</strong>{" "}
          {Number.isFinite(r) ? r.toFixed(3) : "N/A"}
        </div>
      )}

      <div style={{ height: 520, border: "1px solid #ddd", padding: 8 }}>
        {points.length ? (
          <Scatter data={data} options={options} />
        ) : (
          <div>Enter formulas and click Run.</div>
        )}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: "#555" }}>
        <div>
          Available fields: HR, SO, BB, RBI, R, H, Doubles, Triples, SB, CS, GDP,
          SF, SH, PA, OPS, AVG.
        </div>
        <div>
          Examples: X = <code>HR - SO</code>, Y = <code>R</code> • X ={" "}
          <code>OPS</code>, Y = <code>RBI</code>
        </div>
      </div>
    </div>
  );
}
