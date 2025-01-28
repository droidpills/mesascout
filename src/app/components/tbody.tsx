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
      <tr key={index} 
          className={`
          ${player.hired ? "bg-green-100" : ""} 
           hover:bg-slate-300 cursor-pointer
           `} >
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-4 py-2 block" >
            {index + 1}. {player.name}
          </Link>
        </td>
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-4 py-2 block" >
            {player.position}
          </Link>
        </td>
        {/* <td className="border border-gray-300 p-2 margin-auto ">{player.games}</td> */}
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-4 py-2 block" >
            {player.age}
          </Link>
        </td>
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-4 py-2 block" >
            {player.score}
          </Link>
        </td>
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-4 py-2 block" >
            {player.league}
          </Link>
        </td>
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-4 py-2 block" >
            {player.club}
          </Link>
        </td>
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-4 py-2 block" >
            {player.value}
          </Link>
        </td>
        {/* <td className="border border-gray-300 p-2 margin-auto ">{player.contrato}</td> */}
        <td className="border border-gray-300 p-2 margin-auto ">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className= "px-4 py-2 flex justify-center">
             <FaLink  className="size-4 " />
          </Link> 
        </td>
      </tr>
    ))}
  </tbody>
);

export default TBody;