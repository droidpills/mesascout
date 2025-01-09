import { Player } from "@/types/Player";

interface THeadProps {
  sortField: keyof Player;
  sortOrder: string;
  onSort: (field: keyof Player) => void;
}

const THead: React.FC<THeadProps> = ({ sortField, sortOrder, onSort }) => {
  const renderSortIcon = (field: keyof Player) => {
    const isAsc = sortField === field && sortOrder === "asc";
    const isDesc = sortField === field && sortOrder === "desc";

    return (
      <span className="inline-block ml-2">
        {isAsc && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
            />
          </svg>
        )}
        {isDesc && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
            />
          </svg>
        )}
        {!isAsc && !isDesc && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21V3m3.75 3.75L12 3m0 0L8.25 6.75"
            />
          </svg>
        )}
      </span>
    );
  };

  return (
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