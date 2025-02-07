import Image from "next/image";
import Head from "next/head";
import { notFound } from 'next/navigation';
import { Player } from "../../types/Player";
import { normalizeName } from "../../utils/normalizeName";
import { normalizeFileName } from "../../utils/normalizeFileName";
import { FaStar, FaStarHalfAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";

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

    const playerImageURL = `https://storage.googleapis.com/mesascout/s24_players_images/${normalizeFileName(
      player.name,
      player.club,
      "player_image"
    )}.jpeg`;

    const pageURL = `https://mesascout.vercel.app/copinha/player/${normalizeName(player.name)}`;

    const statistics = [
      {
        label: 'Valor',
        value: `${player.value}`,
      },
      {
        label: 'Idade',
        value: `${player.age}`,
      },
      {
        label: 'Jogos',
        value: `${player.games}`,
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
        label: 'Veja +',
        value: <a href={player.link} target="_blank"><FaLink /></a>,
      },
    ];

    const habilits = [
      {
        label: 'Passes',
        value: (
          <>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </>
        ),
      },
      {
        label: 'Gols',
        value: (
          <>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </>
        ),
      },
      {
        label: 'Jogos',
        value: (
          <>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </>
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

        <div className="flex justify-start pt-8 pl-5 lg:pl-0">
          <Link href={`/${season}`} className="bg-[#292C34] px-5 py-2 rounded-full flex items-center text-sm font-medium text-white hover:text-[#292C34] hover:bg-[#7a7c80]">
            <FaArrowLeft className="mr-2" /> Voltar
          </Link>
        </div>

        <main className="flex justify-center flex-wrap lg:gap-x-10">
          <div className="w-[350px] flex items-center justify-center h-full p-5">
            <div className="rounded-3xl border border-gray-200 bg-white">
              <div className="rounded-3xl p-4 ring-1 ring-gray-200">
                <div className="relative overflow-hidden pb-3">
                  <div className="overflow-hidden [filter:url('#rounded')]">
                    <div className="relative h-[200px] border rounded-t-3xl border-gray-200 bg-gradient-to-b from-orange-600 to-yellow-500 [clip-path:polygon(0_0,_100%_0,_100%_95%,_50%_100%,_0_95%)]">
                      <div className="pointer-events-none absolute start-1/3 top-3 -z-10 ms-8 -translate-x-1/2 text-center text-[80px] font-extrabold uppercase italic tracking-tighter text-white opacity-40 mix-blend-overlay">
                        <div>{player.name}</div>
                        <div>{player.name}</div>
                      </div>

                      <Image
                        src={playerImageURL}
                        alt={`${player.name} Foto`}
                        width={150}
                        height={150}
                        className="absolute start-1/2 bottom-0 -translate-x-1/2 z-0"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 start-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-b from-[#ff5411] to-[#fc0] text-2xl/none font-extrabold tracking-tighter text-white">
                    {player.score}
                  </div>
                </div>

                <div className="pb-1 pt-3 text-center text-slate-800 ">
                  <h2 className="text-[22px]/tight font-bold tracking-tight">{player.name}</h2>
                  <div className="text-sm">{player.club}</div>
                </div>

                <div className="mx-auto grid w-fit grid-cols-3 divide-x divide-gray-200 pt-5 text-slate-800">
                  {habilits.map((habilit) => (
                    <div key={habilit.label} className="px-7 text-center">
                      <div className="text-[0.6875rem]/tight text-center uppercase pb-2">{habilit.label}</div>
                      <div className="text-sm/tight font-bold flex">{habilit.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto flex w-full flex-col p-0 m-0">
                {statistics.map((statistic) => (
                  <div className="relative overflow-hidden border-b border-gray-300 rounded-full px-4 pb-2 pt-3" key={statistic.label}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs uppercase text-slate-800">{statistic.label}</h3>
                      <p className="text-sm font-bold text-slate-800">{statistic.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="py-4 flex-1">
            <div className="flex-1 justify-start mb-8">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900 text-center mb-6 font-extrabold leading-tight tracking-wide lg:text-2xl">
                Veja o vídeo da liga {player.league} onde <br /> {player.name} se destacou!
              </h2>
              <iframe width="460" height="260" src="https://www.youtube.com/embed/C8HUbFKkeRc?si=wwnQstx1nxZ7ghhZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="mx-auto max-w-fit lg:max-w-full" allowFullScreen></iframe>
            </div>
            <div className="flex-1 justify-start">
              <h2 className="text-gray-800 text-center mb-4  font-bold  tracking-normal md:text-lg lg:text-xl w-fit mx-auto">
                ⚡ Melhores lances de {player.name} ⚡ </ h2>
              <iframe width="460" height="260" src="https://www.youtube.com/embed/C8HUbFKkeRc?si=wwnQstx1nxZ7ghhZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="mx-auto max-w-fit lg:max-w-full" allowFullScreen></iframe>
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
