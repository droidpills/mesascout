interface FilterLeaguesProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: string[];
}

const FilterLeagues: React.FC<FilterLeaguesProps> = ({ value, onChange, options = [] }) => (
  <select
    value={value}
    onChange={onChange}
    className="border border-gray-300 rounded px-2 py-1"
  >
    <option value="all">All Leagues</option>
    {options.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
);

export default FilterLeagues;