import { notFound } from 'next/navigation';
import { Players } from "@/app/types/Player";
import CopinhaClient from "@/app/components/CopinhaClient";


export async function generateStaticParams() {
    const seasons = await fetch('http://localhost:3000/api/getSeasons').then((res) => res.json())
    return seasons.map(({ urlName }: { urlName: string }) => ({
        slug: urlName,
    }))
}

async function fetchPlayers(): Promise<Players> {
    const res = await fetch(``, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch players");
    }

    return res.json();
}

export default async function CopinhaServer() {
    const players = await fetchPlayers();

    return (
        <div>
            <CopinhaClient players={players} />
        </div>
    );
}