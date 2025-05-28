import { useState } from "react";
import { Player, Players } from "../types/Player";
import { parseMarketValue } from "../utils/parseMarketValue";

export const useFilteredPlayers = (players: Players) => {
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedClub, setSelectedClub] = useState("all");
  const [hiredFilter, setHiredFilter] = useState<"all" | "contratado" | "nao_contratado">("all");
  const [sortField, setSortField] = useState<keyof Player>("score");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredData = players.data
    .filter((player) => {
      const isSearchMatch =
        search === "" ||
        player.name.toLowerCase().includes(search.toLowerCase());

      const isPositionMatch = selectedPosition === "all" || player.position === selectedPosition;
      const isLeagueMatch = selectedLeague === "all" || player.league === selectedLeague;
      const isClubMatch = selectedClub === "all" || player.club === selectedClub;
      const isHiredMatch =
        hiredFilter === "all" ||
        (hiredFilter === "contratado" && player.hired) ||
        (hiredFilter === "nao_contratado" && !player.hired);

      return isSearchMatch && isPositionMatch && isLeagueMatch && isHiredMatch && isClubMatch;
    })
    .sort((a, b) => {
      const getValue = (player: Player, field: keyof Player) => {
        if (field === "value") return parseMarketValue(player.value);
        return player[field];
      };

      const aValue = getValue(a, sortField);
      const bValue = getValue(b, sortField);

      const isInvalid = (val: unknown) =>
        val === null || val === undefined || (typeof val === "number" && isNaN(val));

      const aInvalid = isInvalid(aValue);
      const bInvalid = isInvalid(bValue);

      if (aInvalid && !bInvalid) return 1;
      if (!aInvalid && bInvalid) return -1;
      if (aInvalid && bInvalid) return 0;

      if (aValue !== undefined && bValue !== undefined) {
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
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
    selectedClub,
    setSelectedClub,
    hiredFilter,
    setHiredFilter,
    sortField,
    sortOrder,
    handleSortToggle,
  };
};
