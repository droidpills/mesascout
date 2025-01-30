const FilterHired: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: ("all" | "contratado" | "nao_contratado")[];
  }> = ({ value, onChange, options }) => (
  
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl text-[#6f8caa] bg-[#f0f3f6] text-sm px-2 py-1"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "all" ? "Todos" : option === "contratado" ? "somente já contratados" : "somente disponíveis"}
        </option>
      ))}
  
    </select>
  );
  
  export default FilterHired;