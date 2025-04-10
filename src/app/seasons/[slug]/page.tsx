import { Players } from "@/app/types/Player";
import SeasonsClient from "@/app/components/SeasonsClient";
import { notFound } from 'next/navigation';

interface Season {
  urlName: string;
  jsonUrl?: string;
}

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

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
    return seasons.map(({ urlName }) => ({ slug: urlName }));
  } catch (err) {
    console.error("Error in generateStaticParams:", err);
    return [];
  }
}

async function fetchPlayers(season: string): Promise<Players> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

    const res = await fetch(`${apiUrl}/api/getSeasons?season=${season}`);

    if (!res.ok) {
      console.error(`Failed to fetch players for season ${season}: ${res.status}`);
      notFound();
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error(`Invalid JSON for players of season ${season}`);
      notFound();
    }

    return await res.json();
  } catch (err) {
    console.error(`Error fetching players for season ${season}:`, err);
    notFound();
  }
}

async function fetchSeasonData(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

    const res = await fetch(`${apiUrl}/api/getSeasons`);

    if (!res.ok) {
      throw new Error(`Failed to fetch seasons data: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid response format for getSeasons");
    }

    const seasons: Season[] = await res.json();
    const seasonData = seasons.find((season) => season.urlName === slug);

    if (!seasonData) {
      throw new Error(`Season "${slug}" not found in API.`);
    }

    if (!seasonData.jsonUrl) {
      throw new Error(`Missing jsonUrl for season "${slug}".`);
    }

    return seasonData;
  } catch (err) {
    console.error("Error fetching season data:", err);
    throw err;
  }
}

export default async function SeasonsServer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const players = await fetchPlayers(slug);
  const seasonMeta = await fetchSeasonData(slug);

  return (
    <div>
      <SeasonsClient players={players} seasonMeta={seasonMeta} />
    </div>
  );
}
