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
      <div className="py-4 container mx-auto">
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
          description="Destaques da Copa São Paulo de futebol junior"
          scoreText="Performance x Jogos"
        />
      </div>
    </div>

  );
};

export default CopinhaClient;
