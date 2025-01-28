import React from "react";
import CopinhaClient from "../components/CopinhaClient";
import { Player } from "../types/Player";

// Função para buscar jogadores paginados
async function fetchPlayers(): Promise<{
  data: Player[];
  total: number;
  page: number;
  pageSize: number;
}> {
  // Total de páginas que você mencionou
  const totalPages = 1;
  
  // Inicializa o array para armazenar os jogadores
  const allPlayers: Player[] = [];

  // Processa as páginas
  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/playersCopinha?page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch players");
    }

    const data = await res.json();

    // Verifique se 'data.data' existe e é um array
    console.log("API Response:", data);

    if (data && Array.isArray(data.data)) {
      allPlayers.push(...data.data); // Adiciona os jogadores ao array allPlayers
    } else {
      console.error("Expected 'data.data' to be an array, but got:", data);
    }
  }

  return {
    data: allPlayers, // Agora 'allPlayers' contém todos os jogadores
    total: allPlayers.length, // Usando o tamanho do array como total
    page: 1, // Página inicial
    pageSize: allPlayers.length, // O tamanho da página pode ser igual ao número de jogadores retornados
  };
}

export default async function CopinhaServer() {
  const players = await fetchPlayers(); // Agora players terá a estrutura { data, total, page, pageSize }

  return (
    <div>
      <CopinhaClient players={players} /> {/* Passando o objeto corretamente */}
    </div>
  );
}
