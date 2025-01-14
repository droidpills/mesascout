import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/header";
import Main from "../components/main";
import { parseMarketValue } from "@/utils/parseMarketValue";
import Footer from "@/components/footer";
import { Player } from "../types/Player";

const Home: React.FC = () => {
  const [data, setData] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [sortField, setSortField] = useState<keyof Player>("score");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const filteredData = useMemo(() => {
    const result = data.filter((player) => {
      return (
        (search === "" || player.name.toLowerCase().includes(search.toLowerCase())) &&
        (selectedPosition === "all" || player.position === selectedPosition) &&
        (selectedLeague === "all" || player.league === selectedLeague)
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
  }, [data, search, selectedPosition, selectedLeague, sortField, sortOrder]);

  const handleSortToggle = (field: keyof Player) => {
    if (field === sortField) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
  };


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
        filteredData={filteredData}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSortToggle={handleSortToggle}
      />
      <Footer />
    </div>
  );
};

export default Home;
