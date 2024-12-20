import Header from "../components/header";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Player {
  name: string;
  position: string;
  score: number;
  league: string;
  link: string;
  club: string;
  nationalities: string[];
  marketValue: string;
}

const parseMarketValue = (value: string): number => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  if (value.includes("m")) {
    return numericValue * 1_000_000;
  } else if (value.includes("k")) {
    return numericValue * 1_000;
  } else if (value.includes("-")) {
    return 0;
  }
  else if (value.includes("Unknown")) {
    return numericValue * 0;
  }
  return numericValue;
};

const Home: React.FC = () => {
  const [data, setData] = useState<Player[]>([]);
  const [filteredData, setFilteredData] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [positions, setPositions] = useState<string[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>("all");
  const [leagues, setLeagues] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("score");

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/droidpills/7a84aadccdb73e59181e7435b28357b4/raw/ce472c19b7f6b96ade46f92c6ecffffbcfa1f2b7/players_scores_with_transfermarkt.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<Player[]>;
      })
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
        const uniquePositions = Array.from(new Set(jsonData.map((player) => player.position)));
        setPositions(uniquePositions);
        const uniqueLeagues = Array.from(new Set(jsonData.map((player) => player.league)));
        setLeagues(uniqueLeagues);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  useEffect(() => {
    let updatedData = data;

    // Search filter
    if (search) {
      updatedData = updatedData.filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Position filter
    if (selectedPosition !== "all") {
      updatedData = updatedData.filter((player) => player.position === selectedPosition);
    }

    // League filter
    if (selectedLeague !== "all") {
      updatedData = updatedData.filter((player) => player.league === selectedLeague);
    }

    // Sort by field
    updatedData = updatedData.sort((a, b) => {
      let aValue: number, bValue: number;

      if (sortField === "score") {
        aValue = a.score;
        bValue = b.score;
      } else if (sortField === "marketValue") {
        aValue = parseMarketValue(a.marketValue);
        bValue = parseMarketValue(b.marketValue);
      } else {
        return 0;
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    setFilteredData(updatedData);
  }, [search, sortOrder, selectedPosition, sortField, data]);

  const handleSortToggle = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };


  return (
    <div>
      <Header />
      <main className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All Positions</option>
            {positions.map((position, index) => (
              <option key={index} value={position}>{position}</option>
            ))}
          </select>

          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All Leagues</option>
            {leagues.map((league, index) => (
              <option key={index} value={league}>{league}</option>
            ))}
          </select>

        </div>

        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <td
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSortToggle("score")}
              >
                Score {sortField === "score" && (sortOrder === "asc" ? "🔼" : "🔽")}
              </td>
              <th className="border border-gray-300 px-4 py-2">League</th>
              <th className="border border-gray-300 px-4 py-2">Club</th>
              <td className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSortToggle("marketValue")}
              >
                Market Value {sortField === "marketValue" && (sortOrder === "asc" ? "🔼" : "🔽")}
              </td>
              <th className="border border-gray-300 px-4 py-2">Nationalities</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((player, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                <td className="border border-gray-300 px-4 py-2">{player.position}</td>
                <td className="border border-gray-300 px-4 py-2">{player.score}</td>
                <td className="border border-gray-300 px-4 py-2">{player.league}</td>
                <td className="border border-gray-300 px-4 py-2">{player.club}</td>
                <td className="border border-gray-300 px-4 py-2">{player.marketValue}</td>
                <td className="border border-gray-300 px-4 py-2">{player.nationalities.join(", ")}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    href={`/player/${player.name
                      .toLowerCase()
                      .normalize("NFD") // Decomposição de caracteres
                      .replace(/[\u0300-\u036f]/g, "") // Remover diacríticos
                      .replace(/ /g, "-")}`} // Substituir espaços por hífens
                    className="text-blue-500 underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;
