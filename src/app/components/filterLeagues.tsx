interface FilterLeaguesProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options?: string[];
  }
  
  const FilterLeagues: React.FC<FilterLeaguesProps> = ({ value, onChange, options = [] }) => (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl text-[#6f8caa] bg-[#f0f3f6] text-sm px-2 py-1"
    >
      <option value="all">Ligas</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
  
  export default FilterLeagues;