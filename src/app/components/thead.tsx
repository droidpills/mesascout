import { Player } from "../types/Player";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface THeadProps {
  players: Player[];
  sortField: keyof Player;
  sortOrder: string;
  onSort: (field: keyof Player) => void;
  scoreText: string;
  seasonColumns: string[]; 
}

const THead: React.FC<THeadProps> = ({ sortField, sortOrder, onSort, scoreText, players, seasonColumns }) => {
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

  const columnMapping: { [key: string]: keyof Player } = {
    "Jogador": "name",
    "Valor de mercado": "value",
    "Posição": "position",
    "Idade": "age",
    "Score": "score",
    "Liga": "league",
    "Clube": "club",
    "Próximo Adversário": "prox_adversario", 
  };
  
  const shouldShowColumn = (field: keyof Player) => {
    return seasonColumns.some((col: string) => columnMapping[col] === field) && players.some(
      (player) => player[field] !== null && player[field] !== undefined
    );
  };

  return (
    <thead>
      <tr className="bg-[#e1e7ed] text-[#6f8caa] text-xs uppercase tracking-tighter">
        <th className="p-3 font-normal tracking-tight text-left whitespace-nowrap">Jogador</th>

        {/* Valor de Mercado */}
        {shouldShowColumn("value") && (
          <th
            className="p-3 font-normal tracking-tight whitespace-nowrap cursor-pointer text-left flex items-center"
            onClick={() => onSort("value")}
          >
            Valor de <br className="lg:hidden" /> mercado {renderSortIcon("value")}
          </th>
        )}

        {/* Posição */}
        {shouldShowColumn("position") && (
          <th className="p-3 font-normal tracking-tight text-left">Posição</th>
        )}

        {/* Idade */}
        {shouldShowColumn("age") && (
          <th
            className="p-3 px-2 font-normal tracking-tight whitespace-nowrap cursor-pointer text-left hidden md:block"
            onClick={() => onSort("age")}
          >
            Idade {renderSortIcon("age")}
          </th>
        )}

        {/* Score */}
        {shouldShowColumn("score") && (
          <th
            className="p-3 font-normal tracking-tight whitespace-nowrap cursor-pointer text-left"
            onClick={() => onSort("score")}
          >
            <div className="inline-flex">
              Score
              <div className="px-1 relative group z-10">
                <IoIosInformationCircleOutline size={16} />
                <span className="bg-[#e1e7ed] text-[#6f8caa] text-[14px] invisible transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible absolute py-3 px-5 -right-6 top-7 normal-case">
                  {scoreText}
                </span>
              </div>
              {renderSortIcon("score")}
            </div>
          </th>
        )}

        {/* Liga */}
        {shouldShowColumn("league") && (
          <th className="p-3 font-normal tracking-tight text-left whitespace-nowrap hidden md:block">Liga</th>
        )}

        {/* Clube */}
        {shouldShowColumn("club") && (
          <th className="p-3 font-normal tracking-tight text-left whitespace-nowrap">Clube</th>
        )}

        {/* Proximo Adversário */}
        {shouldShowColumn("prox_adversario") && (
          <th className="p-3 font-normal tracking-tight text-left whitespace-nowrap">Próximo Adversário</th>
        )}
      </tr>
    </thead>
  );
};

export default THead;