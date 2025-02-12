import React from "react";
import Season24Client from "../components/Season24Client";
import { Players } from "../types/Player";
import GoogleAdsense from "../components/GoogleAdsense";

async function fetchPlayers(): Promise<Players> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/'}/api/playersSeason24`, {
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
    <div className="flex container mx-auto lg:gap-x-8">
      <div className="w-full lg:w-9/12">
        <Season24Client players={players} />
      </div>
      <div className="my-7 p-5 sticky top-0 bg-[#292C34] flex flex-row lg:w-3/12">
        <GoogleAdsense />
      </div>
    </div>
  );
}