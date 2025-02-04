"use client";

import React from "react";
import Main from "../components/layouts/main";
import { Players } from "../types/Player";
import { useFilteredPlayers } from "../hooks/useFilteredPlayers";
import brasil from "../../../public/images/brasil.png"

interface CopinhaClientProps {
  players: Players;
}

const CopinhaClient: React.FC<CopinhaClientProps> = ({ players }) => {
  const {
    filteredData,
    search,
    setSearch,
    selectedPosition,
    setSelectedPosition,
    selectedLeague,
    setSelectedLeague,
    hiredFilter,
    setHiredFilter,
    sortField,
    sortOrder,
    handleSortToggle,
  } = useFilteredPlayers(players);

  const season = "copinha";

  return (
    <div>
      <div className="p-4 container mx-auto px-8">
        <Main
          search={search}
          setSearch={setSearch}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
          selectedLeague={selectedLeague}
          setSelectedLeague={setSelectedLeague}
          hiredFilter={hiredFilter}
          setHiredFilter={setHiredFilter}
          filteredData={filteredData}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSortToggle={handleSortToggle}
          season={season}
          title="Copinha 2025"
          flagSrc={[brasil]}
          description=""
        />
      </div>
      <div className="mt-4 mb-6 bg-[#292C34] h-[200px] w-full">
      </div>
    </div>

  );
};

export default CopinhaClient;
