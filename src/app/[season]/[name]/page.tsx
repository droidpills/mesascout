// import Image from "next/image";
import Head from "next/head";
import { notFound } from 'next/navigation';
import { Player } from "../../types/Player";
import { normalizeName } from "../../utils/normalizeName";
import { normalizeFileName } from "../../utils/normalizeFileName";

const SEASONS_DATA = {
  season24: "https://storage.googleapis.com/mesascout/players_with_positions.json",
  copinha: "https://storage.googleapis.com/mesascout/players_with_positions2.json",
};

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
  }>
};

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

    const playerImageURL = `https://storage.googleapis.com/mesascout/s24_players_images/${normalizeFileName(
      player.name,
      player.club,
      "player_image"
    )}.jpeg`;

    const pageURL = `https://mesascout.vercel.app/copinha/player/${normalizeName(player.name)}`;


    const statistics = [
      {
        label: 'Idade',
        value: `${player.age}`,
      },
      {
        label: 'Jogos',
        value: `${player.games}`,
      },
      {
        label: 'Valor',
        value: `${player.value}`,
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

        {/* <main className="p-4"> */}
        <div className="mx-auto w-[380px] flex items-center justify-center h-screen p-5">
          <div className="rounded-3xl border border-custom-gray-200 bg-gray-100">
            <div className="rounded-3xl p-4 ring-1 ring-gray-200">
              <div className="relative overflow-hidden pb-3">
                <div className="overflow-hidden [filter:url('#rounded')]">
                  <div className="relative h-[400px] border border-custom-gray-200 bg-gradient-to-b from-orange-600 to-yellow-500 [clip-path:polygon(0_0,_100%_0,_100%_95%,_50%_100%,_0_95%)]">
                    <div className="pointer-events-none absolute start-1/2 top-10 -z-10 ms-8 -translate-x-1/2 text-center text-9xl/[0.8em] font-extrabold uppercase italic tracking-tighter text-white opacity-40 mix-blend-overlay">
                      <div>{player.name}</div>
                      <div>{player.name}</div>
                    </div>
                    {/* <Image
                      src={playerImageURL}
                      alt={`${player.name} Foto`}
                      width={500}
                      height={600}
                      className="absolute start-1/2 top-2 max-w-[calc(100%+60px)] -translate-x-1/2 z-0"
                    /> */}
                  </div>
                </div>

                <div className="absolute bottom-0 start-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-b from-[#ff5411] to-[#fc0] text-2xl/none font-extrabold tracking-tighter text-white">
                  {player.score}
                </div>

                <div className="absolute start-0 top-0 aspect-square w-[76px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-custom-gray-200 bg-white">

                </div>

                <div className="absolute top-0 right-0 aspect-square w-[76px] -translate-y-1/2 translate-x-1/2 rounded-full border border-custom-gray-200 bg-white flex items-center justify-center">
                  
                </div>

              </div>

              <div className="pb-1 pt-3 text-center text-slate-800 ">
                <h2 className="text-[22px]/tight font-bold tracking-tight">{player.name}</h2>
                <div className="text-sm">{player.club}</div>
              </div>
            </div>

            <div className="mx-auto grid w-fit grid-cols-3 divide-x divide-custom-gray-200 py-5 text-slate-800">
              {statistics.map((statistic) => (
                <div key={statistic.label} className="px-7 text-center">
                  <div className="mb-2 text-sm/tight font-bold">{statistic.value}</div>
                  <div className="text-[0.6875rem]/tight uppercase">{statistic.label}</div>
                </div>
              ))}
            </div>
          </div>

          <svg className="invisible absolute" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="rounded">
                <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
        {/* </main> */}
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return (notFound())
  }
}





