import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";


const socket = io.connect("http://localhost:3001");

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setStats(data);
    });
    document.title = "COVID-19 Statistics";
    return () => {
      socket.off("FromAPI");
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 Dashboard
        </h1>
        {stats ? (
            <div>
              <h2>Global Stats</h2>
            <p>Total Cases: {stats.confirmed}</p>
            <p>Total Deaths: {stats.deaths}</p>
            <p>Total Recovered: {stats.recovered}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
