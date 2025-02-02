"use client";

import React from "react";
import Main from "../components/layouts/main";
import { Player } from "../types/Player";
import useFilteredPlayers from "../hooks/useFilteredPlayers";

interface CopinhaProps {
  players: { data: Player[]; total: number; page: number; pageSize: number };
}

const CopinhaClient: React.FC<CopinhaProps> = ({ players }) => {
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
  } = useFilteredPlayers(players.data); // Passando players.data

  const season = "copinha";
  const pageURL = `https://mesascout.vercel.app/copinha`;

  return (
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
      />
      <div className="m-8 flex space-x-4">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageURL)}&text=${encodeURIComponent(
            `Veja os principais jogadores de destaque na Copinha 2025 e analise suas estatísticas de desempenho. Veja mais em ${pageURL}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Compartilhar no Twitter</button>
        </a>
        <a
          href={`https://wa.me/?&text=${encodeURIComponent(
            `Veja os principais jogadores de destaque Copinha 2025  e analise suas estatísticas de desempenho. Veja mais em ${pageURL}` 
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded">Compartilhar no WhatsApp</button>
        </a>
      </div>
    </div>
  );
};

export default CopinhaClient;
