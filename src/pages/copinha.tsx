import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Header from "../components/header";
import Main from "../components/main";
import { parseMarketValue } from "@/utils/parseMarketValue";
import Footer from "@/components/footer";
import { Player } from "../types/Player";

const Copinha: React.FC = () => {
  const [data, setData] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [hiredFilter, setHiredFilter] = useState<"all" | "contratado" | "nao_contratado">("all"); //
  const [sortField, setSortField] = useState<keyof Player>("score");
  const [sortOrder, setSortOrder] = useState("desc");
  const season = "copinha";

  useEffect(() => {
    fetch("/api/playerscopinha")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const filteredData = useMemo(() => {
    const result = data.filter((player) => {
      return (
        (search === "" || player.name.toLowerCase().includes(search.toLowerCase())) &&
        (selectedPosition === "all" || player.position === selectedPosition) &&
        (selectedLeague === "all" || player.league === selectedLeague) &&
        (hiredFilter === "all" ||
          (hiredFilter === "contratado" && player.hired) ||
          (hiredFilter === "nao_contratado" && !player.hired))
      );
    });

    return result.sort((a, b) => {
      const getValue = (player: Player, field: keyof Player) => {
        if (field === "value") return parseMarketValue(player.value);
        const value = player[field];
        return typeof value === "number" ? value : 0;
      };

      const aValue = getValue(a, sortField);
      const bValue = getValue(b, sortField);

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [data, search, selectedPosition, selectedLeague, sortField, sortOrder, hiredFilter]);

  const handleSortToggle = (field: keyof Player) => {
    if (field === sortField) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <Head>
        <title>Copinha - Destaques e Análise</title>
        <meta
          name="description"
          content="Descubra os jogadores em destaque na Copinha. Filtre por posição, liga e status de contratação."
        />
        <meta name="keywords" content="Copinha, jogadores, futebol, análise, destaques, mercado de transferências" />
        <meta name="author" content="Mesa Scout" />
        <meta property="og:title" content="Copinha - Destaques e Análise" />
        <meta
          property="og:description"
          content="Veja os principais jogadores da Copinha e analise suas estatísticas de desempenho."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mesascout.vercel.app/copinha" />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Copinha - Destaques e Análise" />
        <meta
          name="twitter:description"
          content="Veja os principais jogadores da Copinha e analise suas estatísticas de desempenho."
        />
        <meta name="twitter:image" content="https://mesascout.vercel.app/copinha" />
      </Head>
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
      <div className="mt-8 flex space-x-4 p-5">
        <a
          href={`https://twitter.com/intent/tweet?url=mesascout.vercel.app/copinha `}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Compartilhar no Twitter</button>
        </a>
        <a
          href={`https://wa.me/?text=mesascout.vercel.app/copinha`}
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

export default Copinha;