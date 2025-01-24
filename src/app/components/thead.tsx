import { Player } from "../types/Player";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
//import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

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
      <div className="inline-block  items-center m-auto align-middle">
        <SlArrowUp
          className={`h-3 w-3 ${isAsc ? "opacity-100" : "opacity-50"}`}
        />
        <SlArrowDown
          className={`h-3 w-3 ${isDesc ? "opacity-100" : "opacity-50"}`}
        />
      </div>
    );
  };

  return (
    <thead>
      <tr>
        <th className="border border-gray-300 px-4 py-2">Jogador</th>
        <th className="border border-gray-300 px-4 py-2">Posição</th>
        {/* <th className="border border-gray-300 px-4 py-2">Games</th> */}
        <th 
          className="border border-gray-300 px-4 py-2 cursor-pointer flex"
          onClick={() => onSort("age")}
          >
            Idade  {renderSortIcon("age")}
        </th>
        <th
          className="border border-gray-300 px-4 py-2 cursor-pointer "
          onClick={() => onSort("score")}
        >
          Score  {renderSortIcon("score")}
        </th>
        <th className="border border-gray-300 px-4 py-2">Liga</th>
        <th className="border border-gray-300 px-4 py-2">Clube</th>
        <th
          className="border border-gray-300 px-4 py-2 cursor-pointer"
          onClick={() => onSort("value")}
        >
          Valor de mercado  {renderSortIcon("value")}
        </th>
        {/* <th className="border border-gray-300 px-4 py-2">Contrato</th> */}
        <th className="border border-gray-300 px-4 py-2">Ver +</th>
      </tr>
    </thead>
  );
};

export default THead;