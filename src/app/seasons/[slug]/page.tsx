import { Players } from "@/app/types/Player";
import SeasonsClient from "@/app/components/SeasonsClient";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
    const seasons = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSeasons`).then((res) => res.json())
    return seasons.map(({ urlName }: { urlName: string }) => ({
        slug: urlName,
    }))
}

async function fetchPlayers(season: string): Promise<Players> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSeasons?season=${season}`, {
        cache: "no-store",
    });


    if (!res.ok) {
        throw new Error("Failed to fetch players");
    }

    return res.json();
}

async function fetchSeasonData(slug: string) {
    const seasonsCollection = collection(db, "seasons");
    const q = query(seasonsCollection, where("urlName", "==", slug));
  
    const snapshot = await getDocs(q);
  
    if (snapshot.empty) {
      throw new Error(`Season "${slug}" not found in Firestore.`);
    }
  
    const seasonData = snapshot.docs[0].data();
  
    if (!seasonData.jsonUrl) {
      throw new Error(`Missing jsonUrl for season "${slug}".`);
    }
  
    return seasonData;
  }

export default async function SeasonsServer({ params }: { params: Params })  {
    const { slug } = await params;
    const players = await fetchPlayers(slug);
    const seasonMeta = await fetchSeasonData(slug);


    return (
        <div>
            <SeasonsClient players={players} seasonMeta={seasonMeta} />
        </div>
    );
}