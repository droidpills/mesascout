'use client';

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import SearchPlayers from "../searchPlayers";
import FilterPositions from "../filterPositions";
import FilterLeagues from "../filterLeagues";
import FilterClub from "../filterClub";
import FilterHired from "../filterHired";
import { Player } from "@/app/types/Player";
import { StaticImageData } from "next/image";

const Table = dynamic(() => import("../table"));

interface MainProps {
  search: string;
  setSearch: (value: string) => void;
  selectedPosition: string;
  setSelectedPosition: (value: string) => void;
  selectedLeague: string;
  setSelectedLeague: (value: string) => void;
  selectedClub: string;
  setSelectedClub: (value: string) => void;
  hiredFilter: "all" | "contratado" | "nao_contratado";
  setHiredFilter: (value: "all" | "contratado" | "nao_contratado") => void;
  filteredData: Player[];
  sortField: keyof Player;
  sortOrder: string;
  handleSortToggle: (field: keyof Player) => void;
  season: string;
  title: string;
  flagSrc: StaticImageData[];
  description: string;
  scoreText: string;
  seasonColumns: string[];
  seasonMeta: {
    urlName?: string;
  }
}

const Main: React.FC<MainProps> = ({
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
  filteredData,
  sortField,
  sortOrder,
  handleSortToggle,
  season,
  title,
  flagSrc,
  description,
  scoreText,
  seasonColumns,
  seasonMeta
}) => (
  <main className="w-full max-w-[100vw] overflow-hidden">
    <div className="flex gap-x-8">
      <div className="w-full">
        <div className="justify-between gap-x-4 pt-2 px-4 pb-5 overflow-x-hidden lg:flex lg:px-0">
          <div className="flex justify-start gap-x-5 overflow-x-hidden lg:gap-x-4">
            <FilterPositions
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              options={[...new Set(filteredData.map((p) => p.position))]}
            />
            {seasonMeta.urlName === "season24" ? (
              <FilterLeagues
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                options={[...new Set(filteredData.map((p) => p.league))]}
              />
            ) : (
              <FilterClub
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                options={[...new Set(filteredData.map((p) => p.club))]}
              />
            )}

            {seasonMeta.urlName === "season24" && (
              <FilterHired
                value={hiredFilter}
                onChange={(e) =>
                  setHiredFilter(e.target.value as "all" | "contratado" | "nao_contratado")
                }
                options={["all", "contratado", "nao_contratado"]}
              />
            )}
          </div>
          <div className="mt-3 max-w-2xl lg:mt-0">
            <SearchPlayers value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <Suspense fallback={<div>Carregando tabela...</div>}>
          <Table
            players={filteredData}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSortToggle}
            season={season}
            title={title}
            flagSrc={flagSrc}
            description={description}
            scoreText={scoreText}
            seasonColumns={seasonColumns}
          />
        </Suspense>
      </div>
    </div>
  </main>
);

export default Main;
