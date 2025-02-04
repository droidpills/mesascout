import React from "react";
import CopinhaClient from "../components/CopinhaClient";
import { Players } from "../types/Player";

async function fetchPlayers(): Promise<Players> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ||'http://localhost:3000/'}/api/playersCopinha`, {
    cache: "no-store", // Desabilita cache para garantir dados sempre atualizados
  });

  if (!res.ok) {
    throw new Error("Failed to fetch players");
  }

  return res.json();
}

export default async function CopinhaServer() {
  const players = await fetchPlayers();

  return (
    <div>
      <CopinhaClient players={players} />
    </div>
  );
}