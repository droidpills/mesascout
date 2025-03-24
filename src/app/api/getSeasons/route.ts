import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    console.log("🔍 Buscando dados na coleção 'seasons'...");
    const seasonsCollection = collection(db, "seasons"); 
    const snapshot = await getDocs(seasonsCollection);

    const seasons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(seasons);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}