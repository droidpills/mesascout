import { Players } from "@/app/types/Player";
import SeasonsClient from "@/app/components/SeasonsClient";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const seasons = await fetch('http://localhost:3000/api/getSeasons').then((res) => res.json())
    return seasons.map(({ urlName }: { urlName: string }) => ({
        slug: urlName,
    }))
}

async function fetchPlayers(season: string): Promise<Players> {
    const res = await fetch(`http://localhost:3000/api/getSeasons?season=${season}`);

    if (!res.ok) {
        notFound();
    }
    return res.json();
}

async function fetchSeasonData(slug: string) {
    const response = await fetch("http://localhost:3000/api/getSeasons");

    if (!response.ok) {
        throw new Error(`Failed to fetch seasons data: ${response.statusText}`);
    }

    interface Season {
        urlName: string;
      }
    const seasons = await response.json();
    const seasonData = seasons.find((season: Season) => season.urlName === slug);

    if (!seasonData) {
        throw new Error(`Season "${slug}" not found in API.`);
    }

    if (!seasonData.jsonUrl) {
        throw new Error(`Missing jsonUrl for season "${slug}".`);
    }
    return seasonData;
}

export default async function SeasonsServer({ params }: { params: Promise<{ slug: string }> })  {
    const  {slug}  = await params;
    const players = await fetchPlayers(slug);
    const seasonMeta = await fetchSeasonData(slug);

    return (
        <div>
            <SeasonsClient players={players} seasonMeta={seasonMeta} />
        </div>
    );
}