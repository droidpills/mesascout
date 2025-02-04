import React from "react";
import CopinhaClient from "../components/CopinhaClient";
import { Players } from "../types/Player";
import type { Metadata } from "next";

async function fetchPlayers(): Promise<Players> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ||'http://localhost:3000/'}/api/playersCopinha`, {
    cache: "no-store", // Desabilita cache para garantir dados sempre atualizados
  });

  if (!res.ok) {
    throw new Error("Failed to fetch players");
  }

  return res.json();
}

export const metadata: Metadata = {
  title: "Copinha - Analise jogadores",
  description: "Acompanhe os jogadores da Copinha 2024",
  openGraph: {
    title: "Copinha - Analise jogadores",
    description: "Acompanhe os jogadores da Copinha 2024",
    url: "https://mesascout.vercel.app/copinha", 
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
      <CopinhaClient players={players} />
    </div>
  );
}