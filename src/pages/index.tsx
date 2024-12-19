import Header from "../components/header";
import { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("data/players_scores_with_transfermarkt.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  return (
    <div>
      <Header />
      <main className="p-4">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
              <th className="border border-gray-300 px-4 py-2">League</th>
              <th className="border border-gray-300 px-4 py-2">Club</th>
              <th className="border border-gray-300 px-4 py-2">Market Value</th>
              <th className="border border-gray-300 px-4 py-2">Nationalities</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((player, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                <td className="border border-gray-300 px-4 py-2">{player.position}</td>
                <td className="border border-gray-300 px-4 py-2">{player.score}</td>
                <td className="border border-gray-300 px-4 py-2">{player.league}</td>
                <td className="border border-gray-300 px-4 py-2">{player.club}</td>
                <td className="border border-gray-300 px-4 py-2">{player.marketValue}</td>
                <td className="border border-gray-300 px-4 py-2">{player.nationalities.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;
