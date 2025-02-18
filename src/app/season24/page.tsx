import React from "react";
import Season24Client from "../components/Season24Client";
import { Players } from "../types/Player";
import Image from "next/image";
import bannertop from "../../../public/images/banners/banner-top.png";
import bannerleft from "../../../public/images/banners/banner-left.png";
import bannermobile from "../../../public/images/banners/banner-mobile.gif";

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
    <div>
      
      <div className="mt-7 mx-auto flex justify-center lg:container">
        <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="hidden lg:block">
          <Image src={bannertop} width={1536} height={250} alt="Banner Youtube" />
        </a>
        <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="lg:hidden">
          <Image src={bannermobile} width={300} height={250} alt="Banner Youtube" />
        </a>
      </div>
      <div className="flex container mx-auto lg:gap-x-8">
        <div className="w-full lg:w-9/12">
          <Season24Client players={players} />
        </div>
        <div className="my-7 sticky top-0 hidden lg:flex lg:flex-row lg:w-3/12">
          <a href="https://x.com/mesascout" target="_blank">
            <Image src={bannerleft} width={380} height={850} alt="Banner Youtube" />
          </ a>
        </div>
      </div>
    </div>
  );
}