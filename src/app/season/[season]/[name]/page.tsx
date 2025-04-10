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
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return false;
  }
}

async function fetchSeasonsData(): Promise<Season[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }

  const res = await fetch(`${apiUrl}/api/getSeasons`);

  if (!res.ok) {
    console.error(`Failed to fetch seasons: ${res.status}`);
    return [];
  }

  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    console.error("Invalid response type for getSeasons");
    return [];
  }

  const seasons: Season[] = await res.json();
  return seasons;
}

export async function generateStaticParams() {
  const SEASONS_DATA = await fetchSeasonsData();
  const paths: { season: string; name: string }[] = [];

  for (const season of SEASONS_DATA) {
    try {
      const res = await fetch(season.jsonUrl);

      if (!res.ok) {
        console.error(`Failed to fetch season data for ${season.urlName}`);
        continue;
      }

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error(`Invalid JSON for ${season.jsonUrl}`);
        continue;
      }

      const players: Player[] = await res.json();

      paths.push(
        ...players.map((player) => ({
          season: season.urlName,
          name: normalizeName(player.name),
        }))
      );
    } catch (err) {
      console.error(`Error fetching ${season.jsonUrl}:`, err);
      continue;
    }
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

  const currentSeason = jsonFileUrl.includes("season24")
    ? "season24_images_no_bg"
    : "copinha_images_no_bg";

  const imageExistenceMap: Record<string, boolean> = {};

  for (const p of players) {
    const imgUrl = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
      p.name,
      p.previous_club ?? p.club,
      "player_image"
    )}.png`;

    imageExistenceMap[p.name] = await checkImageExists(imgUrl);
  }

  const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
    player.name,
    player.previous_club ?? player.club,
    "player_image"
  )}.png`;

  const pageURL = `${process.env.NEXT_PUBLIC_API_URL}/${season}/${normalizeName(player.name)}`;

  return (
    <div>
      <Head>
        <title>{`${player.name} - Detalhes do Jogador`}</title>
        <meta name="description" content={`Detalhes do jogador ${player.name}, destaque da temporada ${player.league}.`} />
        <meta property="og:title" content={`${player.name} - Detalhes do Jogador`} />
        <meta property="og:description" content={`Confira as estatísticas de ${player.name}, incluindo posição, clube e mais.`} />
        <meta property="og:image" content={imageExistenceMap[player.name] ? playerImageURL : ""} />
        <meta property="og:url" content={pageURL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <SlideCarousel
        players={players}
        imageExistenceMap={imageExistenceMap}
        currentSeason={currentSeason}
        name={name}
        season={season}
      />
    </div>
  );
}
