import React from "react";
import SearchPlayers from "../searchPlayers";
import FilterPositions from "../filterPositions";
import FilterLeagues from "../filterLeagues";
import FilterHired from "../filterHired";
import Table from "../table";
import { Player } from "@/app/types/Player";

interface MainProps {
  search: string;
  setSearch: (value: string) => void;
  selectedPosition: string;
  setSelectedPosition: (value: string) => void;
  selectedLeague: string;
  setSelectedLeague: (value: string) => void;
  hiredFilter: "all" | "contratado" | "nao_contratado";
  setHiredFilter: (value: "all" | "contratado" | "nao_contratado") => void;
  filteredData: Player[];
  sortField: keyof Player;
  sortOrder: string;
  handleSortToggle: (field: keyof Player) => void;
  season: string;
}

const Main: React.FC<MainProps> = ({
  search,
  setSearch,
  selectedPosition,
  setSelectedPosition,
  selectedLeague,
  setSelectedLeague,
  hiredFilter,
  setHiredFilter,
  filteredData,
  sortField,
  sortOrder,
  handleSortToggle,
  season,
}) => (
  <main >
        <div className="flex gap-x-8">
        <div className="w-full lg:w-9/12 ">
    <div className="flex justify-between gap-x-4 py-5 w-full">
      <div className="flex justify-start gap-x-4">
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
        <FilterHired
          value={hiredFilter}
          onChange={(e) => setHiredFilter(e.target.value as "all" | "contratado" | "nao_contratado")}
          options={["all", "contratado", "nao_contratado"]}
        />
      </div>
      <div className="justify-end max-w-2xl">
        <SearchPlayers value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
    </div>

        <Table
          players={filteredData}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortToggle}
          season={season}
        />
      </div>
      <div className=" mt-4 w-3/12 bg-[#292C34] hidden lg:block">
      </div>

    </div>
  </main>
);

export default Main;