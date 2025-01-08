import React from "react";
import SearchPlayers from "./searchPlayers";
import FilterPositions from "./filterPositions";
import FilterLeagues from "./filterLeagues";
import Table from "./table";
import { Player } from "../types/Player";

interface MainProps {
  search: string;
  setSearch: (value: string) => void;
  selectedPosition: string;
  setSelectedPosition: (value: string) => void;
  selectedLeague: string;
  setSelectedLeague: (value: string) => void;
  filteredData: Player[];
  sortField: keyof Player;
  sortOrder: string;
  handleSortToggle: (field: keyof Player) => void;
}

const Main: React.FC<MainProps> = ({
  search,
  setSearch,
  selectedPosition,
  setSelectedPosition,
  selectedLeague,
  setSelectedLeague,
  filteredData,
  sortField,
  sortOrder,
  handleSortToggle,
}) => (
  <main className="p-4">
    <div className="flex items-center space-x-4 mb-4">
      <SearchPlayers value={search} onChange={(e) => setSearch(e.target.value)} />
      <FilterPositions
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        options={[...new Set(filteredData.map((p) => p.position))]}
      />
      <FilterLeagues
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
        options={[...new Set(filteredData.map((p) => p.league))]}
      />
    </div>
    <Table
      players={filteredData}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSortToggle}
    />
  </main>
);

export default Main;