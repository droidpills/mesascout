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
  const searchParams = useSearchParams(); // Hook para acessar parâmetros de busca
  const router = useRouter(); // Para navegação programática

  const playersPerPage = 12; // Número de jogadores por página
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // Obtém a página atual da URL
  const totalPages = Math.ceil(players.length / playersPerPage); // Total de páginas

  // Calcula os jogadores da página atual
  const startIndex = (currentPage - 1) * playersPerPage;
  const currentPlayers = players.slice(startIndex, startIndex + playersPerPage);

  // Função para alterar a página
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString()); // Atualiza o parâmetro 'page'
    router.push(`?${params.toString()}`); // Navega para a nova URL com a página atualizada
  };

  // Função para gerar os números das páginas a serem exibidos
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Limite de páginas a exibir

    // Exibe as páginas próximas da página atual
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(currentPage + 2, totalPages); i++) {
      pages.push(i);
    }

    // Se a página atual for maior que o limite e houver mais páginas
    if (currentPage > 3 && totalPages > maxPagesToShow) {
      pages.unshift("..."); // Adiciona "..." para mostrar que há mais páginas
      if (pages[0] !== 1) pages.unshift(1); // Garante que o primeiro número da página seja 1
    }

    // Se a última página não estiver na lista, adicione ela
    if (currentPage < totalPages - 2 && totalPages > maxPagesToShow) {
      pages.push("..."); // Adiciona "..." para mostrar que há mais páginas
      if (pages[pages.length - 1] !== totalPages) pages.push(totalPages); // Garante que a última página esteja na lista
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
      {/* Controles de paginação */}
      <div className="mt-4 mb-4 flex justify-center items-center gap-x-3 text-[13px] py-2 bg-[#f0f3f6]">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#e1e7ed] text-[#6f8caa] rounded-full disabled:opacity-60"
        >
          Anterior
        </button>

        {/* Exibe os números das páginas */}
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