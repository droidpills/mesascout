import Head from "next/head";
import { notFound } from "next/navigation";
import { Player } from "../../../types/Player";
import { normalizeName } from "../../../utils/normalizeName";
import { normalizeFileName } from "../../../utils/normalizeFileName";
import SlideCarousel from "@/app/components/slideCarousel";

interface Season {
  urlName: string;
  jsonUrl: string;
}

async function checkImageExists(url: string): Promise<boolean> {
  const res = await fetch(url, { method: "HEAD" });
  return res.ok;
}
async function fetchSeasonsData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/getSeasons`)
  const seasons: Season[] = await response.json();
  return seasons;
}

export async function generateStaticParams() {
  const SEASONS_DATA = await fetchSeasonsData();
  const paths: { season: string; name: string }[] = [];

  for (const season of SEASONS_DATA) {
    const response = await fetch(season.jsonUrl);
    const players: Player[] = await response.json();

    paths.push(
      ...players.map((player) => ({
        season: season.urlName,
        name: normalizeName(player.name),
      }))
    );
  }

  return paths;
}

interface PlayerDetailsProps {
  params: Promise<{ season: string; name: string }>;
}

export default async function PlayerDetails({ params }: PlayerDetailsProps) {
  const { season, name } = await params;
  const SEASONS_DATA = await fetchSeasonsData();

  const seasonData = SEASONS_DATA.find((s: Season) => s.urlName === season);
  if (!seasonData) return notFound();

  const jsonFileUrl = seasonData.jsonUrl;
  const response = await fetch(jsonFileUrl);
  const players: Player[] = await response.json();

  const currentIndex = players.findIndex((p) => normalizeName(p.name) === name);
  if (currentIndex === -1) return notFound();

  const player = players[currentIndex];

  const currentSeason = season+'_images_no_bg';

  const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
    player.name,
    player.previous_club ?? player.club,
    "player_image"
  )}.png`;

  const pageURL = `https://mesascout.vercel.app/${season}/${normalizeName(player.name)}`;
  const imageExists = await checkImageExists(playerImageURL);

  return (
    <div>
      <Head>
        <title>{`${player.name} - Detalhes do Jogador`}</title>
        <meta name="description" content={`Detalhes do jogador ${player.name}, destaque da temporada ${player.league}.`} />
        <meta property="og:title" content={`${player.name} - Detalhes do Jogador`} />
        <meta property="og:description" content={`Confira as estatísticas de ${player.name}, incluindo posição, clube e mais.`} />
        <meta property="og:image" content={imageExists ? playerImageURL : "https://storage.googleapis.com/mesascout/images/no-player-image.svg"} />
        <meta property="og:url" content={pageURL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <SlideCarousel players={players} imageExists={imageExists} currentSeason={currentSeason} name={name} season={season} />
    </div>
  );
}
