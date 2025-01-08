import { GetStaticProps, GetStaticPaths } from "next";
import Header from "@/components/header";
import { Player } from "@/types/Player";

interface PlayerPageProps {
  player: Player;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/players`);
    if (!response.ok) throw new Error("Erro na API");
    const players = await response.json();

    const paths = players.map((player: Player) => ({
      params: {
        name: player.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ /g, "-"),
      },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    return { paths: [], fallback: "blocking" }; // Evita falha no build
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params!;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/players`);
  const players: Player[] = await response.json();

  const player = players.find((p) =>
    p.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "-") === name
  );

  if (!player) {
    return { notFound: true };
  }

  return {
    props: { player },
  };
};

const PlayerDetails: React.FC<PlayerPageProps> = ({ player }) => {
  if (!player) {
    return (
      <div>
        <Header />
        <main className="p-4">
          <p className="text-center text-red-500">Player not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">{player.name}</h2>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Position</td>
              <td className="border border-gray-300 px-4 py-2">{player.position}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Jogos</td>
              <td className="border border-gray-300 px-4 py-2">{player.jogos}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Age</td>
              <td className="border border-gray-300 px-4 py-2">{player.idade}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Score</td>
              <td className="border border-gray-300 px-4 py-2">{player.score}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Market Value</td>
              <td className="border border-gray-300 px-4 py-2">{player.marketValue}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Club</td>
              <td className="border border-gray-300 px-4 py-2">{player.club}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Nationalities</td>
              <td className="border border-gray-300 px-4 py-2">{player.nationalities.join(", ")}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Profile Link</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={player.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Profile
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default PlayerDetails;