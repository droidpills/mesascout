import React from "react";
import THead from "./thead";
import TBody from "./tbody";
import { Player } from "@/types/Player";


interface TableProps {
  players: Player[];
  sortField: keyof Player;
  sortOrder: string;
  onSort: (field: keyof Player) => void;
  season: string; 
}

const Table: React.FC<TableProps> = ({ players, sortField, sortOrder, onSort, season = "defaultSeason" }) => (
  <table className="table-auto border-collapse border border-gray-300 w-full">
    <THead sortField={sortField} sortOrder={sortOrder} onSort={onSort} />
    <TBody players={players} season={season}  />
  </table>
);

export default Table;