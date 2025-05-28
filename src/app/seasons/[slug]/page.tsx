import { Players } from "@/app/types/Player";
import SeasonsClient from "@/app/components/SeasonsClient";

interface Season {
  urlName: string;
  jsonUrl?: string;
}

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/getSeasons`);
    if (!res.ok) return [];

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) return [];

    const seasons: Season[] = await res.json();
    return seasons.map(({ urlName }) => ({ slug: urlName }));
  } catch (err) {
    console.error("Failed to generate static params:", err);
    return [];
  }
}

async function fetchPlayers(season: string): Promise<Players | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/getSeasons?season=${season}`);

    if (!res.ok) return null;
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) return null;

    return await res.json();
  } catch (err) {
    console.error("Error fetching players:", err);
    return null;
  }
}

async function fetchSeasonData(slug: string): Promise<Season | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/getSeasons`);
    if (!res.ok) return null;

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) return null;

    const seasons: Season[] = await res.json();
    const seasonData = seasons.find((season) => season.urlName === slug);

    if (!seasonData || !seasonData.jsonUrl) return null;
    return seasonData;
  } catch (err) {
    console.error("Error fetching season data:", err);
    return null;
  }
}

export default async function SeasonsServer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const players = await fetchPlayers(slug);
  const seasonMeta = await fetchSeasonData(slug);

  if (!players || !seasonMeta) {
    return <div>Dados da temporada não encontrados.</div>;
  }

  const filteredPlayers = {
    ...players,
    data: players.data.filter(player => !player.injured),
  };

  return (
    <div>
      <SeasonsClient players={filteredPlayers} seasonMeta={seasonMeta} />
    </div>
  );
}
