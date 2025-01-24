interface FilterPositionsProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options?: string[];
  }
  
  const FilterPositions: React.FC<FilterPositionsProps> = ({ value, onChange, options = [] }) => (
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-2 py-1"
    >
      <option value="all">Posições</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
  
  export default FilterPositions;