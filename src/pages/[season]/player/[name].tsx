import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Head from "next/head";
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

  const pageURL = `https://mesascout.vercel.app/copinha/player/${normalizeName(player.name)}`;

  const playerAttributes = [
    { label: "Posição", value: player.position },
    { label: "Jogos", value: player.games },
    { label: "Idade", value: player.age },
    { label: "Score", value: player.score },
    { label: "Valor de mercado", value: player.value },
    { label: "Clube", value: player.club },
    { label: "Liga", value: player.league },
    { label: "Contrato", value: player.contrato },
    {
      label: "Profile",
      value: (
        <a
          href={player.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Profile
        </a>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>{`${player.name} - Detalhes do Jogador`}</title>
        <meta name="description" content={`Detalhes do jogador ${player.name}, destaque da temporada ${player.league}.`} />
        <meta property="og:title" content={`${player.name} - Detalhes do Jogador`} />
        <meta property="og:description" content={`Confira as estatísticas de ${player.name}, incluindo posição, clube e mais.`} />
        <meta property="og:image" content={playerImageURL} />
        <meta property="og:url" content={pageURL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="p-4">
        <div className="flex items-center">
          <Image
            src={playerImageURL}
            alt={`${player.name} Foto`}
            width={200}
            height={200}
            className="rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-4 ml-4">{player.name}</h2>
        </div>
        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
          <tbody>
            {playerAttributes.map(({ label, value }) => (
              <tr key={label}>
                <td className="border border-gray-300 px-4 py-2 font-bold">{label}</td>
                <td className="border border-gray-300 px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center p-10">
          <h3 className="p-5">
            <b>Mapa de calor:</b>
          </h3>
          <Image
            src={heatmapImageURL}
            alt={`${player.name} Heatmap`}
            width={400}
            height={200}
            className="rounded-lg"
          />
        </div>

        <div className="flex items-center justify-center p-10">
          <h3 className="p-5">
            <b>Melhores momentos:</b>
          </h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/C8HUbFKkeRc?si=wwnQstx1nxZ7ghhZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

        <div className="mt-8 flex space-x-4">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageURL)}&text=${encodeURIComponent(
              `${player.name} foi um destaque na temporada ${player.league} jogando pelo ${player.club}. O seu market value é de ${player.value}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Compartilhar no Twitter</button>
          </a>
          <a
            href={`https://wa.me/?&text=${encodeURIComponent(
              `${player.name} foi um destaque na temporada ${player.league} jogando pelo ${player.club}. O seu market value é de ${player.value}. Veja mais em ${pageURL}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-500 text-white px-4 py-2 rounded">Compartilhar no WhatsApp</button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlayerDetails;

