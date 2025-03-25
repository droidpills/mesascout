"use client";

import React from "react";
import Main from "./layouts/main"; 
import { Players } from "../types/Player"; 
import { useFilteredPlayers } from "../hooks/useFilteredPlayers"; 

interface SeasonsClientProps {
  players: Players;
  seasonMeta: {
    urlName?: string;
    description?: string;
    flags?: string[];
    scoreDescription?: string;
    columns?: string[];
    name?:string;
    jsonUrl?:string;
  };
}

const SeasonsClient: React.FC<SeasonsClientProps> = ({ players, seasonMeta }) => {
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
          season={seasonMeta.urlName || "Temporada Desconhecida"} 
          title={seasonMeta.name || "Sem Nome"} 
          flagSrc={seasonMeta.flags?.map(flag => ({ src: flag, height: 20, width: 32 })) || [] }
          description={seasonMeta.description || "Descrição indisponível"} 
          scoreText={seasonMeta.scoreDescription || "Sem descrição de pontuação"} 
          seasonColumns={seasonMeta.columns || []}
        />

      </div>
    </div>
  );
};

export default SeasonsClient;
