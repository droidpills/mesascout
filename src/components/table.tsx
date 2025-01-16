import React, { useState } from "react";
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

const Table: React.FC<TableProps> = ({ players, sortField, sortOrder, onSort, season = "defaultSeason" }) => {
  const [visiblePlayersCount, setVisiblePlayersCount] = useState(12); // Estado para controlar os jogadores visíveis
  const [isAllVisible, setIsAllVisible] = useState(false); // Estado para verificar se todos os jogadores estão visíveis

  // Função para carregar mais jogadores
  const loadMorePlayers = () => {
    setVisiblePlayersCount(players.length); // Exibe todos os jogadores
    setIsAllVisible(true); // Marca como todos os jogadores visíveis
  };

  // Função para carregar menos jogadores (mostrar apenas 12)
  const loadLessPlayers = () => {
    setVisiblePlayersCount(12); // Exibe apenas os 12 primeiros jogadores
    setIsAllVisible(false); // Marca como apenas 12 jogadores visíveis
  };

  return (
    <div>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <THead sortField={sortField} sortOrder={sortOrder} onSort={onSort} />
        <TBody players={players.slice(0, visiblePlayersCount)} season={season} />
      </table>

      {/* Botões para "Load More" ou "Ver Menos" */}
      <div className="mt-4">
        {isAllVisible ? (
          <button 
            onClick={loadLessPlayers} 
            className="px-4 py-2 bg-gray-500 text-white rounded flex m-auto"
          >
            Ver Menos
          </button>
        ) : (
          <button 
            onClick={loadMorePlayers} 
            className="px-4 py-2 bg-green-900 text-white rounded flex m-auto"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;