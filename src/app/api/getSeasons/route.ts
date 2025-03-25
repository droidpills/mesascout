import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonParam = searchParams.get("season");
    const page = Number(searchParams.get("page") || 1);

    // Step 1: Get all seasons from Firestore
    const seasonsCollection = collection(db, "seasons");
    const snapshot = await getDocs(seasonsCollection);
    const seasons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as { urlName?: string; name?: string; description?: string; jsonUrl?: string; flags?: string[]; scoreDescription?: string; columns?: string[] }),
    }));
    
    if (!seasonParam) {
      return NextResponse.json(seasons);
    }
    
    // Step 2: Find the requested season by urlName
    const selectedSeason = seasons.find(
      (s) => s.urlName?.toLowerCase() === seasonParam?.toLowerCase()
    );

    if (!selectedSeason || !selectedSeason.jsonUrl) {
      return NextResponse.json(
        { error: "Season not found or missing jsonUrl" },
        { status: 404 }
      );
    }

    // Step 3: Fetch player data from the season's JSON URL
    const response = await fetch(selectedSeason.jsonUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch JSON from ${selectedSeason.jsonUrl}`);
    }

    const allPlayers = await response.json();
    const pageSize = allPlayers.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedPlayers = allPlayers.slice(startIndex, startIndex + pageSize);

    return NextResponse.json(
      {
        data: paginatedPlayers,
        total: allPlayers.length,
        page,
        pageSize,
        seasonMeta: {
          name: selectedSeason.name,
          description: selectedSeason.description,
          flags: selectedSeason.flags || [],
          scoreDescription: selectedSeason.scoreDescription,
          columns: selectedSeason.columns || [],
        },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Failed to load player data" },
      { status: 500 }
    );
  }
}
