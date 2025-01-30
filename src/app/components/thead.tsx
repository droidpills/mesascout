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
    <thead className="">
      <tr className="bg-[#e1e7ed] text-[#6f8caa] text-xs uppercase tracking-tighter">

        <th className="p-3 font-normal tracking-tight text-left w-[14%]"> Jogador </th>

        <th className="p-3 font-normal tracking-tight text-left w-[12%]">Posição</th>

        <th
          className="p-3 px-2 font-normal tracking-tight cursor-pointer text-left  w-[10%]"
          onClick={() => onSort("age")}
        >
          Idade {renderSortIcon("age")}
        </th>

        <th
          className="p-3 px-2 font-normal tracking-tight cursor-pointer  text-left  w-[10%]"
          onClick={() => onSort("score")}
        >
          Score {renderSortIcon("score")}
        </th>

        <th className="p-3 font-normal tracking-tight text-left w-[12%]">Liga</th>

        <th className="p-3 font-normal tracking-tight text-left w-[20%]">Clube</th>

        <th
          className="p-3 font-normal tracking-tight cursor-pointer text-left flex items-center w-[14%]"
          onClick={() => onSort("value")}
        >
          Valor de mercado {renderSortIcon("value")}
        </th>

        <th className="p-3 font-normal tracking-tight text-left w-[8%]"> </th>
      </tr>
    </thead>
  );
};

export default THead;