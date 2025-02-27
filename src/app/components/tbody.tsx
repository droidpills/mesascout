import React from "react";
import Link from "next/link";
import { Player } from "../types/Player";
import { normalizeName } from "../utils/normalizeName";
import { FaLink } from "react-icons/fa6";

interface TBodyProps {
  players: Player[];
  season: string;
}


const TBody: React.FC<TBodyProps> = ({ players, season = "defaultSeason" }) => {
  
  const shouldShowColumn = (field: keyof Player) => {
    return Array.isArray(players) && players.some(
      player => player?.[field] !== null && player?.[field] !== undefined
    );
  };  

  return(
    <tbody>
    {players.map((player, index) => (
      <tr key={index} className="text-[#21242b] text-sm hover:bg-slate-300">
        {/* Nome */}
        <td className="py-4 text-left whitespace-nowrap">
          <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2">
            <div className="inline-flex gap-x-2">
              {player.name} <FaLink className="size-4" />
            </div>
          </Link>
        </td>
  
        {/* Valor de Mercado */}
        {shouldShowColumn("value") && (
          <td className="py-4 text-center font-bold whitespace-nowrap text-[#008000]">
            <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2">
              {player.value ?? "-"}
            </Link>
          </td>
        )}
  
        {/* Posição */}
        {shouldShowColumn("position") && (
          <td className="py-4 text-center whitespace-nowrap">
            <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2">
              {player.position ?? "-"}
            </Link>
          </td>
        )}
  
        {/* Idade */}
        {shouldShowColumn("age") && (
          <td className="py-4 text-center whitespace-nowrap hidden md:block">
            <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2">
              {player.age ?? "-"}
            </Link>
          </td>
        )}
  
        {/* Score */}
        {shouldShowColumn("score") && (
          <td className="py-4 text-center whitespace-nowrap">
            <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2">
              {player.score ?? "-"}
            </Link>
          </td>
        )}
  
        {/* Liga */}
        {shouldShowColumn("league") && (
          <td className="py-4 text-left whitespace-nowrap hidden md:block">
            <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2">
              {player.league ?? "-"}
            </Link>
          </td>
        )}
  
        {/* Clube */}
        {shouldShowColumn("club") && (
          <td className="py-4 text-left whitespace-nowrap">
            <Link href={`../../${season}/${normalizeName(player.name)}`} className="px-2 py-2">
              {player.club ?? "-"}
            </Link>
          </td>
        )}
      </tr>
    ))}
  </tbody>
  
  );
};

export default TBody;