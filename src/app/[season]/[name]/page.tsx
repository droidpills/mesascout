import Image from "next/image";
import Head from "next/head";
import { notFound } from 'next/navigation';
import { Player } from "../../types/Player";
import { normalizeName } from "../../utils/normalizeName";
import { normalizeFileName } from "../../utils/normalizeFileName";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";

const SEASONS_DATA = {
  season24: "https://storage.googleapis.com/mesascout/jsons/season24.json",
  copinha: "https://storage.googleapis.com/mesascout/jsons/copinha.json",
};

// Função assíncrona para verificar se a imagem existe
async function checkImageExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" }); // Fazemos uma requisição HEAD para verificar a existência
    return res.ok; // Retorna true se o status for 200, false se for erro (404)
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return false; // Se houver erro ao fazer a requisição, consideramos que a imagem não existe
  }
}

export async function generateStaticParams() {
  const paths = [];

  for (const [season, url] of Object.entries(SEASONS_DATA)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro ao buscar dados de ${url}`);
    const players: Player[] = await response.json();

    paths.push(
      ...players.map((player) => ({
        season,
        name: normalizeName(player.name),
      }))
    );
  }

  return paths.map((path) => ({
    season: path.season,
    name: path.name,
  }));
}

interface PlayerDetailsProps {
  params: Promise<{
    season: string;
    name: string;
  }>;
}

export default async function PlayerDetails({ params }: PlayerDetailsProps) {
  const { season, name } = await params;

  const jsonFileUrl = SEASONS_DATA[season as keyof typeof SEASONS_DATA];
  if (!jsonFileUrl) return notFound();

  try {
    const response = await fetch(jsonFileUrl);
    if (!response.ok) throw new Error("Erro ao buscar jogadores");
    const players: Player[] = await response.json();

    const player = players.find((p) => normalizeName(p.name) === name);
    if (!player) return notFound();

    console.log(jsonFileUrl)

   const currentSeason = jsonFileUrl.includes("season24")
      ? "season24_images_no_bg"
      : "copinha_images_no_bg";

    const playerImageURL = `https://storage.googleapis.com/mesascout/images/${currentSeason}/${normalizeFileName(
      player.name,
      player.previous_club ?? player.club,
      "player_image"
    )}.png`;

    const pageURL = `https://mesascout.vercel.app/copinha/player/${normalizeName(player.name)}`;

    // Verificando se a imagem existe
    const imageExists = await checkImageExists(playerImageURL); // Verifica se a imagem existe

    const statistics = [
      {
        label: 'Valor',
        value: `${player.value}`,
      },
      {
        label: 'Idade',
        value: `${player.age} anos`,
      },
      {
        label: 'Jogos',
        value: `${player.games} jogos em ${player.league}`,
      },
      {
        label: 'Position',
        value: `${player.position}`,
      },
      {
        label: 'Liga',
        value: `${player.league}`,
      },
      {
        label: 'Contrato',
        value: `${player.contrato}`,
      },
      {
        label: 'Veja +',
        value: <a href={player.link} target="_blank"><FaLink /></a>,
      },
    ];

    interface Habilit {
      label: string;
      value: string;
    }

    const renderStars = (count: number) => {
      return '★'.repeat(count);
    };

    const habilits: Habilit[] = [];

    if (player.pontos_fortes && player.pontos_fortes !== "null") {
      const pontosFortes = player.pontos_fortes.split(",");
      pontosFortes.forEach((ponto) => {
        habilits.push({
          label: ponto.trim(),
          value: renderStars(4),
        });
      });
    }

    if (player.pontos_fracos && player.pontos_fracos !== "null") {
      const pontosFracos = player.pontos_fracos.split(",");
      pontosFracos.forEach((ponto) => {
        habilits.push({
          label: ponto.trim(),
          value: renderStars(2),
        });
      });
    }

    return (
      <div>
        <Head>
          <title>{`${player.name} - Detalhes do Jogador`}</title>
          <meta name="description" content={`Detalhes do jogador ${player.name}, destaque da temporada ${player.league}.`} />
          <meta property="og:title" content={`${player.name} - Detalhes do Jogador`} />
          <meta property="og:description" content={`Confira as estatísticas de ${player.name}, incluindo posição, clube e mais.`} />
          <meta property="og:image" content={imageExists ? playerImageURL : ''} />
          <meta property="og:url" content={pageURL} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <div className="flex justify-start pt-8 pl-5 lg:pl-0">
          <Link href={`/${season}`} className="bg-[#292C34] px-5 py-2 rounded-full flex items-center text-sm font-medium text-white hover:text-[#292C34] hover:bg-[#7a7c80]">
            <FaArrowLeft className="mr-2" /> Voltar
          </Link>
        </div>

        <main className="flex justify-center mx-auto flex-wrap lg:gap-x-10">
          <div className="w-[400px] flex items-center justify-center h-full p-5">
            <div className="w-full rounded-3xl border border-gray-200 bg-white">
              <div className="rounded-3xl p-4 ring-1 ring-gray-200">
                <div className="relative overflow-hidden pb-3">
                  <div className="relative h-[200px] border rounded-t-3xl border-gray-200 bg-gradient-to-b from-[#008000] to-[#729c72] [clip-path:polygon(0_0,_100%_0,_100%_95%,_50%_100%,_0_95%)]">
                    <div className="pointer-events-none absolute start-1/2 top-5 -z-10 -translate-x-1/2 text-[80px] font-extrabold uppercase italic tracking-tighter text-white opacity-40 mix-blend-overlay leading-none">
                      <div>{player.name} </div>
                    </div>

                    {/* Verificar se a imagem existe antes de renderizar */}
                    {imageExists ? (
                      <Image
                        src={playerImageURL}
                        alt={`${player.name} Foto`}
                        width={150}
                        height={150}
                        className="absolute start-1/2 bottom-0 -translate-x-1/2 z-0"
                      />
                    ) : (
                      <div className="absolute start-1/2 bottom-10 -translate-x-1/2 z-0 text-6xl">
                        <FaUserCircle className="text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pb-1 pt-3 text-center text-slate-800 ">
                  <h2 className="text-[22px]/tight font-bold tracking-tight">{player.name}</h2>
                  <div className="text-sm">{player.club}</div>
                </div>

                <div className="mx-16 h-full pt-3 text-slate-800">
                  {habilits.map((habilit) => (
                    <div key={habilit.label} className="flex justify-between items-center gap-x-2">
                      <div className="text-[0.6875rem] uppercase h-full">{habilit.label}</div>
                      <div>
                        {habilit.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto flex w-full flex-col p-0 m-0">
                {statistics.map((statistic) => {
                  if (statistic.value && statistic.value !== "null" && statistic.value !== null) {
                    return (
                      <div className="relative overflow-hidden border-b border-gray-300 rounded-full px-4 pb-2 pt-3" key={statistic.label}>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs uppercase text-slate-800">{statistic.label}</h3>
                          <p className="text-sm font-bold text-slate-800">{statistic.value}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return notFound();
  }
}
