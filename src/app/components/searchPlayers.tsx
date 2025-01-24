interface SearchPlayersProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const SearchPlayers: React.FC<SearchPlayersProps> = ({ value, onChange }) => (
    <input
      type="text"
      placeholder="Buscar jogadores"
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-2 py-1"
    />
  );
  
  export default SearchPlayers;