import React from "react";
import Season24Client from "../components/Season24Client";
import { Player } from "../types/Player";

// Função para buscar jogadores paginados
async function fetchPlayers(): Promise<{
  data: Player[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const allPlayers: Player[] = [];
  const totalPages = 29; // Total de páginas que você mencionou

  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/playersSeason24?page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch players");
    }

    const data = await res.json();

    // Adiciona os jogadores da página atual ao array allPlayers
    allPlayers.push(...data.data); // Supondo que `data.data` seja um array de jogadores
  }

  // Retorna o objeto com a estrutura esperada: data, total, page, pageSize
  return {
    data: allPlayers,
    total: allPlayers.length,
    page: 29, // Página atual pode ser ajustada conforme sua necessidade
    pageSize: allPlayers.length, // Define o número total de jogadores (você pode ajustar isso para paginar corretamente)
  };
}

export default async function Season24Server() {
  const players = await fetchPlayers(); // Agora players terá a estrutura { data, total, page, pageSize }

  return (
    <div>
      <Season24Client players={players} /> {/* Passando o objeto corretamente */}
    </div>
  );
}
