import React from "react";
import Link from "next/link";
import { Player } from "@/types/Player";
import { normalizeName } from "@/utils/normalizeName";

interface TBodyProps {
  players: Player[];
  season: string;
}

const TBody: React.FC<TBodyProps> = ({ players, season = "defaultSeason" }) => (
  <tbody>
    {players.map((player, index) => (
      <tr key={index}>
        <td className="border border-gray-300 px-4 py-2">{player.name}</td>
        <td className="border border-gray-300 px-4 py-2">{player.position}</td>
        <td className="border border-gray-300 px-4 py-2">{player.games}</td>
        <td className="border border-gray-300 px-4 py-2">{player.age}</td>
        <td className="border border-gray-300 px-4 py-2">{player.score}</td>
        <td className="border border-gray-300 px-4 py-2">{player.league}</td>
        <td className="border border-gray-300 px-4 py-2">{player.club}</td>
        <td className="border border-gray-300 px-4 py-2">{player.value}</td>
        <td className="border border-gray-300 px-4 py-2">{player.contrato}</td>
        <td className="border border-gray-300 px-4 py-2">
        <Link href={`/${season}/player/${normalizeName(player.name)}`}>
           View Details
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
);

export default TBody;