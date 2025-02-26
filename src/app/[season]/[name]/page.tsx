import Head from "next/head";
import { notFound } from 'next/navigation';
import { Player } from "../../types/Player";
import { normalizeName } from "../../utils/normalizeName";
import { normalizeFileName } from "../../utils/normalizeFileName";
import PlayerCard from "@/app/components/card";
import AsNavFor from "@/app/components/AsNavFor";

const SEASONS_DATA = {
  season24: "https://storage.googleapis.com/mesascout/jsons/season24.json",
  copinha: "https://storage.googleapis.com/mesascout/jsons/copinha.json",
};

// Função assíncrona para verificar se a imagem existe
async function checkImageExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" }); // Fazemos uma requisição HEAD para verificar a existência
    return res.ok; // Retorna true se o status for 200, false se for erro (404)
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return false; // Se houver erro ao fazer a requisição, consideramos que a imagem não existe
  }
}

export async function generateStaticParams() {
  const paths = [];

  for (const [season, url] of Object.entries(SEASONS_DATA)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro ao buscar dados de ${url}`);
    const players: Player[] = await response.json();

    paths.push(
      ...players.map((player) => ({
        season,
        name: normalizeName(player.name),
      }))
    );
  }
  return paths.map((path) => ({
    season: path.season,
    name: path.name,
  }));
}

interface PlayerDetailsProps {
  params: Promise<{
    season: string;
    name: string;
  }>;
}

export default async function PlayerDetails({ params }: PlayerDetailsProps) {
  const { season, name } = await params;

  const jsonFileUrl = SEASONS_DATA[season as keyof typeof SEASONS_DATA];
  if (!jsonFileUrl) return notFound();

  try {
    const response = await fetch(jsonFileUrl);
    if (!response.ok) throw new Error("Erro ao buscar jogadores");
    const players: Player[] = await response.json();

    const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);

    if (currentIndex === -1) return notFound();

    const player = players[currentIndex];
    const prevPlayer = players[currentIndex - 1] || null;
    const nextPlayer = players[currentIndex + 1] || null;

    if (!player) return notFound();

    const currentSeason = jsonFileUrl.includes("season24")
      ? "season24_images_no_bg"
      : "copinha_images_no_bg";

    const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
      player.name,
      player.previous_club ?? player.club,
      "player_image"
    )}.png`;

    const prevPlayerImageURL = prevPlayer
      ? `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
        prevPlayer.name,
        prevPlayer.previous_club ?? player.club,
        "player_image"
      )}.png`
      : 'notFound';

    const nextPlayerImageURL = nextPlayer
      ? `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
        nextPlayer.name,
        nextPlayer.previous_club ?? player.club,
        "player_image"
      )}.png`
      : 'notFound';

    const pageURL = `https://mesascout.vercel.app/${season}/${normalizeName(player.name)}`;

    // Verificando se a imagem existe
    const imageExists = await checkImageExists(playerImageURL); 

    return (
      <div>
        <Head>
          <title>{`${player.name} - Detalhes do Jogador`}</title>
          <meta name="description" content={`Detalhes do jogador ${player.name}, destaque da temporada ${player.league}.`} />
          <meta property="og:title" content={`${player.name} - Detalhes do Jogador`} />
          <meta property="og:description" content={`Confira as estatísticas de ${player.name}, incluindo posição, clube e mais.`} />
          <meta property="og:image" content={imageExists ? playerImageURL : ''} />
          <meta property="og:url" content={pageURL} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main className="flex flex-wrap justify-center mx-auto lg:gap-x-10">
          <div className="flex flex-nowrap">
            <div className="absolute left-0 opacity-40">
              <PlayerCard player={prevPlayer} imageExists={imageExists} playerImageURL={prevPlayerImageURL} season={season} />
            </div>
            <div className="relative z-20 flex justify-center mx-auto">
              <PlayerCard player={player} imageExists={imageExists} playerImageURL={playerImageURL} season={season} />
            </div>
            <div className="absolute left-[50%] opacity-40">
              <PlayerCard player={nextPlayer} imageExists={imageExists} playerImageURL={nextPlayerImageURL} season={season} />
            </div>
          </div>

          {/* <div className="py-4 flex-1">
             <div className="flex-1 justify-start">
              <iframe width="460" height="260" src="https://www.youtube.com/embed/C8HUbFKkeRc?si=wwnQstx1nxZ7ghhZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="mx-auto max-w-fit lg:max-w-full" allowFullScreen></iframe>
            </div>
          </div> */}

        </main>
  
        <AsNavFor players={players} imageExists={imageExists} season={season} name={name} currentSeason={currentSeason} pageURL={pageURL}/>
 
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return notFound();
  }
}
