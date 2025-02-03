import React from "react";
import Link from "next/link";
import { Player } from "../types/Player";
import { normalizeName } from "../utils/normalizeName";
import { FaLink } from "react-icons/fa6";

interface TBodyProps {
  players: Player[];
  season: string;
}

const TBody: React.FC<TBodyProps> = ({ players, season = "defaultSeason" }) => (
  <tbody>
    {players.map((player, index) => (
      <tr key={index} className="text-[#21242b] text-sm hover:bg-slate-300" >
        <td className=" p-2  text-left ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 block" >
            {player.name}
          </Link>
        </td>
        <td className=" p-2  text-left ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 block" >
            {player.position}
          </Link>
        </td>
        <td className=" p-2  text-left ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 block" >
            {player.age}
          </Link>
        </td>
        <td className=" p-2  text-left ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 block" >
            {player.score}
          </Link>
        </td>
        <td className=" p-2  text-left ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 block" >
            {player.league}
          </Link>
        </td>
        <td className=" p-2  text-left ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 block" >
            {player.club}
          </Link>
        </td>
        <td className=" p-2  text-left font-bold text-[#008000] ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 block" >
            {player.value}
          </Link>
        </td>
        <td className=" p-2  text-left ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2 flex justify-center">
            <FaLink className="size-4 " />
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
);

export default TBody;