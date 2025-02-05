import { Player } from "../types/Player";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

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

      <div className="inline-block  items-center m-auto align-middle ml-2">
        <SlArrowUp
          className={`h-2 w-2 ${isAsc ? "opacity-100" : "opacity-50"}`}
        />
        <SlArrowDown
          className={`h-2 w-2 ${isDesc ? "opacity-100" : "opacity-50"}`}
        />
      </div>
    );
  };

  return (
    <thead >
      <tr className="bg-[#e1e7ed] text-[#6f8caa] text-xs uppercase tracking-tighter">

        <th className="p-3 font-normal tracking-tight text-left whitespace-nowrap"> Jogador </th>

        <th
          className="p-3 font-normal tracking-tight whitespace-nowrap cursor-pointer text-left flex items-center"
          onClick={() => onSort("value")}
        >
          Valor de <br /> mercado {renderSortIcon("value")}
        </th>

        <th className="p-3 font-normal tracking-tight text-left">Posição</th>

        <th
          className="p-3 px-2 font-normal tracking-tight whitespace-nowrap cursor-pointer text-left hidden md:block"
          onClick={() => onSort("age")}
        >
          Idade {renderSortIcon("age")}
        </th>

        <th
          className="p-3 px-2 font-normal tracking-tight whitespace-nowrap cursor-pointer text-left"
          onClick={() => onSort("score")}
        >
          Score {renderSortIcon("score")}
        </th>

        <th className="p-3 font-normal tracking-tight text-left whitespace-nowrap hidden md:block">Liga</th>

        <th className="p-3 font-normal tracking-tight text-left whitespace-nowrap ">Clube</th>

      </tr>
    </thead>
  );
};

export default THead;