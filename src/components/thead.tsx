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
      <th className="border border-gray-300 px-4 py-2">Games</th>
      <th className="border border-gray-300 px-4 py-2">Age</th>
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
        onClick={() => onSort("value")}
      >
        Market Value {sortField === "value" && (sortOrder === "asc" ? "🔼" : "🔽")}
      </th>
      <th className="border border-gray-300 px-4 py-2">Contrato</th>
      <th className="border border-gray-300 px-4 py-2">Actions</th>
    </tr>
  </thead>
);

export default THead;