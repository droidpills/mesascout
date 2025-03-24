import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import THead from "./thead";
import TBody from "./tbody";
import { Player } from "../types/Player";
import TitleTable from "./titleTable";
import { StaticImageData } from "next/image";

interface TableProps {
  players: Player[];
  sortField: keyof Player;
  sortOrder: string;
  onSort: (field: keyof Player) => void;
  season: string;
  title: string;
  flagSrc: StaticImageData[];
  description:string;
  scoreText: string;
}

const Table: React.FC<TableProps> = ({ players, sortField, sortOrder, onSort, season, title, flagSrc=[], description, scoreText}) => {
  const searchParams = useSearchParams(); 
  const router = useRouter(); 

  const playersPerPage = 12; 
  const currentPage = parseInt(searchParams.get("page") || "1", 10); 
  const totalPages = Math.ceil(players.length / playersPerPage); 
  const startIndex = (currentPage - 1) * playersPerPage;
  const currentPlayers = players.slice(startIndex, startIndex + playersPerPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; 

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(currentPage + 2, totalPages); i++) {
      pages.push(i);
    }

    if (currentPage > 3 && totalPages > maxPagesToShow) {
      pages.unshift("..."); 
      if (pages[0] !== 1) pages.unshift(1);
    }

    if (currentPage < totalPages - 2 && totalPages > maxPagesToShow) {
      pages.push("..."); 
      if (pages[pages.length - 1] !== totalPages) pages.push(totalPages);
    }

    return pages;
  };
  

  return (
    <div className="w-full" >
      <TitleTable title={title} flagSrc={flagSrc} description={description}/>
      <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full table-auto border-collapse overflow-x-auto">
        <THead sortField={sortField} sortOrder={sortOrder} onSort={onSort} scoreText={scoreText} players={currentPlayers}/>
        <TBody players={currentPlayers} season={season} />
      </table>
      </ div>
      <div className="mt-4 mb-4 flex justify-center items-center gap-x-3 text-[13px] py-2 bg-[#f0f3f6]">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#e1e7ed] text-[#6f8caa] rounded-full disabled:opacity-60"
        >
          Anterior
        </button>

        <div className="flex space-x-2">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => {
                if (page !== "...") handlePageChange(page as number);
              }}
              className={`p-1 px-3 rounded-full ${
                page === currentPage
                  ? "bg-[#008000] text-white"
                  : "bg-[#e1e7ed] hover:bg-gray-300 text-[#6f8caa]"
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#e1e7ed] text-[#6f8caa] rounded-full disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
        <div className="flex justify-end items-center">
          <a href="https://www.droidpills.com/" target="_blank" className="underline text-sm text-[#6f8caa] pr-3 hover:text-green-900">Powered by Droidpills</a>
        </div>
    </div>
  );
};

export default Table;