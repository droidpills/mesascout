import Header from "@/components/header";
import Footer from "@/components/footer";

import { GetStaticProps, GetStaticPaths } from "next";
import { Player } from "@/types/Player";
import { normalizeName } from "@/utils/normalizeName";
import { normalizeFileName } from "@/utils/normalizeFileName";

const SEASONS_DATA = {
  season24: "https://storage.googleapis.com/mesascout/players_with_positions.json",
  copinha: "https://storage.googleapis.com/mesascout/players_with_positions2.json",
};


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  try {
    for (const [season, url] of Object.entries(SEASONS_DATA)) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro ao buscar dados de ${url}`);
      const players: Player[] = await response.json();

      paths.push(
        ...players.map((player) => ({
          params: { season, name: normalizeName(player.name) },
        }))
      );
    }
  } catch (error) {
    console.error("Erro ao gerar paths:", error);
  }

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { season, name } = context.params || {};

  if (!season || !name || typeof season !== "string" || typeof name !== "string") {
    return { notFound: true };
  }

  const jsonFileUrl = SEASONS_DATA[season as keyof typeof SEASONS_DATA];
  if (!jsonFileUrl) return { notFound: true };

  try {
    const response = await fetch(jsonFileUrl);
    if (!response.ok) throw new Error("Erro ao buscar jogadores");
    const players: Player[] = await response.json();

    const player = players.find((p) => normalizeName(p.name) === name);
    if (!player) return { notFound: true };

    return { props: { player } };
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return { notFound: true };
  }
};

const PlayerDetails: React.FC<{ player: Player }> = ({ player }) => {
  if (!player) {
    return (
      <div>
        <Header />
        <main className="p-4">
          <p className="text-center text-red-500">Player not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const playerImageURL = `https://storage.googleapis.com/mesascout/s24_players_images/${normalizeFileName(
    player.name,
    player.club,
    "player_image"
  )}.jpeg`;

  const heatmapImageURL = `https://storage.googleapis.com/mesascout/s24_players_images/${normalizeFileName(
    player.name,
    player.club,
    "heatmap"
  )}.jpeg`;

  const playerAttributes = [
    { label: "Posição", value: player.position },
    { label: "Jogos", value: player.games },
    { label: "Idade", value: player.age },
    { label: "Score", value: player.score },
    { label: "Valor de mercado", value: player.value },
    { label: "Clube", value: player.club },
    { label: "Liga", value: player.league },
    { label: "Contrato", value: player.contrato },
    { label: "Profile", value: <a href={player.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Profile</a> },
  ];

  return (
    <div>
      <Header />
      <main className="p-4">
        <div className="flex items-center">
        <img src={playerImageURL} alt={`${player.name} Foto`} className="mb-4 h-auto rounded-lg" />
          <h2 className="text-2xl font-bold mb-4">{player.name}</h2>
        </div>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <tbody>
            {playerAttributes.map(({ label, value }) => (
              <tr key={label}>
                <td className="border border-gray-300 px-4 py-2 font-bold">{label}</td>
                <td className="border border-gray-300 px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <div className="flex items-center justify-center p-10">
        <h3 className="p-5"><b>Mapa de calor:</b> </h3>
        <img src={heatmapImageURL} alt={`${player.name} Foto`} className="mb-4 h-auto" />
        </div>
      <Footer />
    </div>
  );
};

export default PlayerDetails;