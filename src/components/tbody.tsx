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
        <td className="border border-gray-300 px-4 py-2">{player.games}</td>
        <td className="border border-gray-300 px-4 py-2">{player.age}</td>
        <td className="border border-gray-300 px-4 py-2">{player.score}</td>
        <td className="border border-gray-300 px-4 py-2">{player.league}</td>
        <td className="border border-gray-300 px-4 py-2">{player.club}</td>
        <td className="border border-gray-300 px-4 py-2">{player.value}</td>
        <td className="border border-gray-300 px-4 py-2">{player.contrato}</td>
        <td className="border border-gray-300 px-4 py-2">
          <Link
            href={`/player/${player.name
              .toLowerCase()
              .normalize("NFD") // Remove acentos
              .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
              .replace(/\s+/g, "-") // Substitui espaços por hifens
              .replace(/[^a-z0-9\-]/g, "")}`} // Remove caracteres especiais
          >
            View Details
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
);

export default TBody;