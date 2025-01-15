const FilterHired: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ("all" | "contratado" | "nao_contratado")[];
}> = ({ value, onChange, options }) => (

  <select
    value={value}
    onChange={onChange}
    className="border border-gray-300 rounded px-2 py-1"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option === "all" ? "Já Contratados" : option === "contratado" ? "contratado" : "não contratado"}
      </option>
    ))}

  </select>
);

export default FilterHired;