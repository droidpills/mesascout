import { Player } from "@/types/Player";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

interface THeadProps {
  sortField: keyof Player;
  sortOrder: string;
  onSort: (field: keyof Player) => void;
}

const THead: React.FC<THeadProps> = ({ sortField, sortOrder, onSort }) => {
  const renderSortIcon = (field: keyof Player) => {
    const isActive = sortField === field;
    const isAsc = isActive && sortOrder === "asc";
    const isDesc = isActive && sortOrder === "desc";

    return (
      <div className="flex flex-col items-center">
        <ChevronUpIcon
          className={`h-4 w-4 ${isAsc ? "opacity-100" : "opacity-50"}`}
        />
        <ChevronDownIcon
          className={`h-4 w-4 ${isDesc ? "opacity-100" : "opacity-50"}`}
        />
      </div>
    );
  };

  return (
    <thead>
      <tr>
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Position</th>
        <th className="border border-gray-300 px-4 py-2">Games</th>
        <th 
          className="border border-gray-300 px-4 py-2 cursor-pointer"
          onClick={() => onSort("age")}
          >
            Age {renderSortIcon("age")}
        </th>
        <th
          className="border border-gray-300 px-4 py-2 cursor-pointer"
          onClick={() => onSort("score")}
        >
          Score {renderSortIcon("score")}
        </th>
        <th className="border border-gray-300 px-4 py-2">League</th>
        <th className="border border-gray-300 px-4 py-2">Club</th>
        <th
          className="border border-gray-300 px-4 py-2 cursor-pointer"
          onClick={() => onSort("value")}
        >
          Market Value {renderSortIcon("value")}
        </th>
        <th className="border border-gray-300 px-4 py-2">Contrato</th>
        <th className="border border-gray-300 px-4 py-2">Actions</th>
      </tr>
    </thead>
  );
};

export default THead;