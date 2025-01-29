import React from "react";
import Season24Client from "../components/Season24Client";
import { Player } from "../types/Player";

async function fetchPlayers(): Promise<{
  data: Player[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const allPlayers: Player[] = [];
  const totalPages = 1; // Atualize conforme necessário

  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/playersSeason24?page=${page}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch players");
    }

    const data = await res.json();

    // ✅ Se `data` já for um array, não tente acessar `data.data`
    if (Array.isArray(data)) {
      allPlayers.push(...data);
    } else {
      console.error("Formato inesperado da API:", data);
    }
  }

  return {
    data: allPlayers,
    total: allPlayers.length,
    page: 1,
    pageSize: allPlayers.length,
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
