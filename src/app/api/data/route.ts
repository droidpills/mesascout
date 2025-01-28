import { NextResponse } from "next/server";
import { Player } from "@/app/types/Player";

// Mock de dados (conformando ao tipo Player)
const players: Player[] = Array.from({ length: 100 }, (_, i) => ({
  name: `player ${i + 1}`,
  position: i % 2 === 0 ? "Forward" : "Midfielder",
  score: Math.floor(Math.random() * 100), // Pontuação aleatória
  link: `https://example.com/player/${i + 1}`, // Link fictício
  club: `Club ${i % 10 + 1}`, // Clubes fictícios
  league: `League ${(i % 5) + 1}`, // Ligas fictícias
  hired: i % 2 === 0, // Contratação alternada (sim/não)
  contrato: `202${Math.floor(i / 20) + 3}-12-31`, // Datas de contrato fictícias
  games: Math.floor(Math.random() * 50), // Jogos fictícios
  age: Math.floor(Math.random() * 20) + 18, // Idade entre 18 e 37
  value: `${Math.floor(Math.random() * 50) + 1}M`, // Valor fictício em milhões
  video: `https://example.com/player/${i + 1}/video`, // Vídeo fictício
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 12);

  // Paginação
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedPlayers = players.slice(start, end);

  return NextResponse.json({
    data: paginatedPlayers,
    total: players.length,
    page,
    pageSize,
  });
}
