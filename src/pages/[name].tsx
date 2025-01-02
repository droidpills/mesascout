import { GetStaticProps, GetStaticPaths } from "next";
import Header from "../components/header";

interface Player {
  name: string;
  position: string;
  score: number;
  league: string;
  link: string;
  club: string;
  nationalities: string[];
  marketValue: string;
}

interface PlayerPageProps {
  player: Player;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/decryptFile`);
    if (!response.ok) throw new Error("Failed to fetch players");

    const players: Player[] = await response.json();

    const paths = players.map((player) => ({
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
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: false }; // Retorna um fallback vazio para evitar falha
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const { name } = context.params!;
    const response = await fetch(`${baseUrl}/api/decryptFile`);
    if (!response.ok) throw new Error("Failed to fetch players");

    const players: Player[] = await response.json();

    if (!Array.isArray(players)) throw new Error("Invalid data format");

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
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true }; // Evita quebra no build
  }
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