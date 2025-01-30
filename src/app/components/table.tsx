import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import THead from "./thead";
import TBody from "./tbody";
import { Player } from "../types/Player";
import TitleTable from "./titleTable";

interface TableProps {
  players: Player[];
  sortField: keyof Player;
  sortOrder: string;
  onSort: (field: keyof Player) => void;
  season: string;
}

const Table: React.FC<TableProps> = ({ players, sortField, sortOrder, onSort, season }) => {
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
    <div >
      <TitleTable />
      <table className="table-fixed w-full">
        <THead sortField={sortField} sortOrder={sortOrder} onSort={onSort} />
        <TBody players={currentPlayers} season={season} />
      </table>

      {/* Controles de paginação */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
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
              className={`px-4 py-2 rounded ${
                page === currentPage
                  ? "bg-green-900 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
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
          className="px-4 py-2 bg-green-900 text-white rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Table;