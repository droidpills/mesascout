import React from "react";
import Season24Client from "../components/Season24Client";
import { Players } from "../types/Player";

async function fetchPlayers(): Promise<Players> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ||'http://localhost:3000/'}/api/playersSeason24`, {
    cache: "no-store",
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
      <Season24Client players={players} />
    </div>
  );
}