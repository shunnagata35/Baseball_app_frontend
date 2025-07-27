import { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/leaderboard')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data.length) return <p>Loading leaderboard...</p>;

  return (
    <div>
      <h2>Top 50 Players by HR</h2>
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

export default Leaderboard;
