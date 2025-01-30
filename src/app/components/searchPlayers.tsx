import { CiSearch } from "react-icons/ci";

interface SearchPlayersProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchPlayers: React.FC<SearchPlayersProps> = ({ value, onChange }) => (
  <div className="relative flex items-center border-gray-300 text-[#6f8caa] bg-[#f0f3f6] rounded-xl w-full">
    <input
      type="text"
      placeholder="Buscar jogadores ..."
      value={value}
      onChange={onChange}
      className="border-gray-300 text-[#6f8caa] bg-[#f0f3f6] rounded-xl pl-4 pr-10 py-2 text-sm w-full" // Ajuste para o ícone não sobrepor
    />
    <CiSearch className="absolute right-3 text-gray-500" />
  </div>
);

export default SearchPlayers;
