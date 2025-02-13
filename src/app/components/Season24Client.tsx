"use client";

import React from "react";
import Main from "../components/layouts/main";
import { Players } from "../types/Player";
import { useFilteredPlayers } from "../hooks/useFilteredPlayers";
import argentina from "../../../public/images/argentina.png";
import brasil from "../../../public/images/brasil.png";
import colombia from "../../../public/images/colombia.png";
import ecuador from "../../../public/images/ecuador.png";
import egypt from "../../../public/images/egypt.png";
import mexico from "../../../public/images/mexico.png";
import uruguay from "../../../public/images/uruguay.png";
import usa from "../../../public/images/usa.png";


interface Season24ClientProps {
  players: Players;
}

const Season24Client: React.FC<Season24ClientProps> = ({ players }) => {
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

  const season = "season24";


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
          title="Temporada 2024"
          flagSrc={[brasil, argentina, colombia, ecuador, egypt, mexico, uruguay, usa]}
          description="Top 2024: até 15M € e alto potencial de valorização."
          scoreText="Performance x Idade"
        />
      </div>
    </div>
  );
};

export default Season24Client;
