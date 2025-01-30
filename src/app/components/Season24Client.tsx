"use client";

import React from "react";
import Main from "../components/layouts/main";
import { Player } from "../types/Player";
import useFilteredPlayers from "../hooks/useFilteredPlayers";

// Modifique a interface para garantir que a estrutura do objeto esteja correta
interface Season24ClientProps {
  players: {
    data: Player[];
    total: number;
    page: number;
    pageSize: number;
  };
}

const Season24Client: React.FC<Season24ClientProps> = ({ players }) => {
  // Certifique-se de que 'useFilteredPlayers' seja chamado de maneira consistente
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
  } = useFilteredPlayers(players.data); // Não use condicional para chamar hooks!

  // Coloque verificações antes de renderizar, mas fora do uso de hooks
  if (!Array.isArray(players.data)) {
    console.error("Players is not an array", players);
    return <div>Erro: Dados inválidos.</div>;
  }

  const season = "season24";
  const pageURL = `https://mesascout.vercel.app/season24`;

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

export default Season24Client;
