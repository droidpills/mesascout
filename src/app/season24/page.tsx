import React from "react";
import Season24Client from "../components/Season24Client";
import { Players } from "../types/Player";
import { Metadata } from "next";

async function fetchPlayers(): Promise<Players> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ||'http://localhost:3000/'}/api/playersSeason24`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch players");
  }

  return res.json();
}

export const metadata: Metadata = {
  title: "Temporada 2024 - Analise jogadores",
  description: "Acompanhe os jogadores mais promissores da temporada",
  openGraph: {
    title: "Temporada 2024 - Analise jogadores",
    description: "Acompanhe os jogadores mais promissores da temporada",
    url: "https://mesascout.vercel.app", 
    siteName: "Mesa Scout",
    images: [
      {
        url: "/images/logo/mesa_logo_Br01.png", 
        width: 800,
        height: 600,
      },
    ],
  },
};

export default async function CopinhaServer() {
  const players = await fetchPlayers();

  return (
    <div>
      <Season24Client players={players} />
    </div>
  );
}