import React from "react";
import Link from "next/link";
import { Player } from "@/types/Player";

interface TBodyProps {
  players: Player[];
}

const TBody: React.FC<TBodyProps> = ({ players }) => (
  <tbody>
    {players.map((player, index) => (
      <tr key={index}>
        <td className="border border-gray-300 px-4 py-2">{player.name}</td>
        <td className="border border-gray-300 px-4 py-2">{player.position}</td>
        <td className="border border-gray-300 px-4 py-2">{player.jogos}</td>
        <td className="border border-gray-300 px-4 py-2">{player.idade}</td>
        <td className="border border-gray-300 px-4 py-2">{player.score}</td>
        <td className="border border-gray-300 px-4 py-2">{player.league}</td>
        <td className="border border-gray-300 px-4 py-2">{player.club}</td>
        <td className="border border-gray-300 px-4 py-2">{player.marketValue}</td>
        <td className="border border-gray-300 px-4 py-2">{player.nationalities.join(", ")}</td>
        <td className="border border-gray-300 px-4 py-2">
          <Link href={`/player/${player.name.replace(/\s+/g, "-").toLowerCase()}`}>
            View Details
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
);

export default TBody;