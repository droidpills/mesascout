"use client";

import React, { useState } from "react";
import Header from "../components/layouts/header";
import Main from "../components/layouts/main";
import Footer from "../components/layouts/footer";
import { parseMarketValue } from "../utils/parseMarketValue";
import { Player } from "../types/Player";

interface Season24ClientProps {
  players: Player[];
}

const Season24Client: React.FC<Season24ClientProps> = ({ players }) => {
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [hiredFilter, setHiredFilter] = useState<"all" | "contratado" | "nao_contratado">("all");
  const [sortField, setSortField] = useState<keyof Player>("score");
  const [sortOrder, setSortOrder] = useState("desc");
  const season = "season24";

  const filteredData = players
    .filter((player) => {
      return (
        (search === "" || player.name.toLowerCase().includes(search.toLowerCase())) &&
        (selectedPosition === "all" || player.position === selectedPosition) &&
        (selectedLeague === "all" || player.league === selectedLeague) &&
        (hiredFilter === "all" ||
          (hiredFilter === "contratado" && player.hired) ||
          (hiredFilter === "nao_contratado" && !player.hired))
      );
    })
    .sort((a, b) => {
      const getValue = (player: Player, field: keyof Player) => {
        if (field === "value") return parseMarketValue(player.value);
        const value = player[field];
        return typeof value === "number" ? value : 0;
      };

      const aValue = getValue(a, sortField);
      const bValue = getValue(b, sortField);

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

  const handleSortToggle = (field: keyof Player) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const pageURL = `https://mesascout.vercel.app/season24`;

  return (
    <div>
      <Header />
      <Main
        search={search}
        setSearch={setSearch}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        hiredFilter={hiredFilter}
        setHiredFilter={setHiredFilter}
        filteredData={filteredData}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSortToggle={handleSortToggle}
        season={season}
      />
      <div className="m-8 flex space-x-4">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageURL)}&text=${encodeURIComponent(
            `Veja os principais jogadores de destaque na Copinha 2025 e analise suas estatísticas de desempenho. Veja mais em ${pageURL}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Compartilhar no Twitter</button>
        </a>
        <a
          href={`https://wa.me/?&text=${encodeURIComponent(
            `Veja os principais jogadores de destaque Copinha 2025  e analise suas estatísticas de desempenho. Veja mais em ${pageURL}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded">Compartilhar no WhatsApp</button>
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Season24Client;
