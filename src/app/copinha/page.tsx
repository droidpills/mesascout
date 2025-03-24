import React from "react";
import CopinhaClient from "../components/CopinhaClient";
import { Players } from "../types/Player";
import { getSeasons } from "@/lib/firebaseConfig";

async function fetchPlayers(): Promise<Players> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ||'http://localhost:3000/'}/api/playersCopinha`, {
    cache: "no-store", 
  });

  
  if (!res.ok) {
    throw new Error("Failed to fetch players");
  }
  
  return res.json();
}

export default async function CopinhaServer() {
  const players = await fetchPlayers();
  const seasons = await getSeasons();

  return (
    <div>
      <CopinhaClient players={players} />
      <ul>
        {seasons.length > 0 ? (
          seasons.map((season) => (
            <li key={season.id}>
              {season.name} 
              
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}