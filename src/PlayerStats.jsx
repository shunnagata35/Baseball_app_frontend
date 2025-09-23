import { useEffect, useState } from 'react';
import axios from 'axios';

function PlayerStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://68be5e9fd275090008d2e194--splendorous-malasada-70b433.netlify.app/player-stats')
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching player stats:", err));
  }, []);

  if (!data.length) return <p>Loading player stats...</p>;

  return (
    <div>
      <h2>All Qualified Hitters (2025)</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerStats;
