import { Player } from "@/types/Player";

interface THeadProps {
  sortField: keyof Player;
  sortOrder: string;
  onSort: (field: keyof Player) => void;
}

const THead: React.FC<THeadProps> = ({ sortField, sortOrder, onSort }) => (
  <thead>
    <tr>
      <th className="border border-gray-300 px-4 py-2">Name</th>
      <th className="border border-gray-300 px-4 py-2">Position</th>
      <th className="border border-gray-300 px-4 py-2">Jogos</th>
      <th className="border border-gray-300 px-4 py-2">Idade</th>
      <th
        className="border border-gray-300 px-4 py-2 cursor-pointer"
        onClick={() => onSort("score")}
      >
        Score {sortField === "score" && (sortOrder === "asc" ? "🔼" : "🔽")}
      </th>
      <th className="border border-gray-300 px-4 py-2">League</th>
      <th className="border border-gray-300 px-4 py-2">Club</th>
      <th
        className="border border-gray-300 px-4 py-2 cursor-pointer"
        onClick={() => onSort("marketValue")}
      >
        Market Value {sortField === "marketValue" && (sortOrder === "asc" ? "🔼" : "🔽")}
      </th>
      <th className="border border-gray-300 px-4 py-2">Nationalities</th>
      <th className="border border-gray-300 px-4 py-2">Actions</th>
    </tr>
  </thead>
);

export default THead;