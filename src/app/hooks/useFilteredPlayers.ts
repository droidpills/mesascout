import { useState } from "react";
import { Player } from "../types/Player";
import { parseMarketValue } from "../utils/parseMarketValue";

export const useFilteredPlayers = (players: Player[]) => {
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [hiredFilter, setHiredFilter] = useState<"all" | "contratado" | "nao_contratado">("all");
  const [sortField, setSortField] = useState<keyof Player>("score");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredData = players
    .filter((player) => {
      const isSearchMatch =
        search === "" ||
        player.name.toLowerCase().includes(search.toLowerCase()) ||
        player.position.toLowerCase().includes(search.toLowerCase()) ||
        player.league.toLowerCase().includes(search.toLowerCase()) ||
        player.club.toLowerCase().includes(search.toLowerCase());

      const isPositionMatch = selectedPosition === "all" || player.position === selectedPosition;
      const isLeagueMatch = selectedLeague === "all" || player.league === selectedLeague;
      const isHiredMatch =
        hiredFilter === "all" ||
        (hiredFilter === "contratado" && player.hired) ||
        (hiredFilter === "nao_contratado" && !player.hired);

      return isSearchMatch && isPositionMatch && isLeagueMatch && isHiredMatch;
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

  return {
    filteredData,
    search,
    setSearch,
    selectedPosition,
    setSelectedPosition,
    selectedLeague,
    setSelectedLeague,
    hiredFilter,
    setHiredFilter,
    sortField,
    sortOrder,
    handleSortToggle,
  };
};
