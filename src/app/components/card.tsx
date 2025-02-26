import Image from "next/image";
import { FaRegStarHalfStroke, FaStar, FaLink } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
// import { BsChevronCompactLeft } from "react-icons/bs";
import { Player } from "../types/Player";


interface PlayerCardProps {
    player: Player;
    imageExists: boolean;
    playerImageURL: string;
}

export default function PlayerCard({ player, imageExists, playerImageURL }: PlayerCardProps) {
    interface Habilit {
        label: string;
        value: React.ReactNode;
    }

    const renderStars = (count: number) => {
        return Array.from({ length: count }).map((_, index) => (
            <FaStar key={index} size={12} />
        ));
    };

    const habilits: Habilit[] = [];
    if (player.pontos_fortes && player.pontos_fortes !== "null") {
        const pontosFortes = player.pontos_fortes.split(",");
        pontosFortes.forEach((ponto) => {
            habilits.push({
                label: ponto.trim(),
                value: (
                    <>
                        {renderStars(4)}
                        <FaRegStarHalfStroke size={12} />
                    </>
                ),
            });
        });
    }

    if (player.pontos_fracos && player.pontos_fracos !== "null") {
        const pontosFracos = player.pontos_fracos.split(",");
        pontosFracos.forEach((ponto) => {
            habilits.push({
                label: ponto.trim(),
                value: (
                    <>
                        {renderStars(1)}
                        <div className="bg-clip-text from-[#008000] to-[#729c72]">
                            <FaRegStarHalfStroke size={12} />
                        </div>
                        <div className="flex opacity-30">{renderStars(3)}</div>
                    </>
                ),
            });
        });
    }

    const statistics = [
        { label: "Valor", value: `${player.value}` },
        { label: "Idade", value: `${player.age} anos` },
        { label: "Jogos", value: `${player.games} jogos em ${player.league}` },
        { label: "Posição", value: `${player.position}` },
        { label: "Liga", value: `${player.league}` },
        { label: "Contrato", value: `${player.contrato}` },
        {
            label: "Veja +",
            value: (
                <a href={player.link} target="_blank">
                    <FaLink />
                </a>
            ),
        },
    ];

    return (
        <div className="relative w-[400px] flex items-center justify-center h-full p-5">
            {/* <div className="absolute -mt-6 -left-3 top-[45%] z-10 lg:pl-0 lg:-left-20">
                <Link
                    href={`/${season}/`}
                    className="rounded-full flex items-center text-sm font-medium text-[#48484986] hover:text-[#292C34] hover:bg-[#7a7c80]"
                >
                    <BsChevronCompactLeft size={50} />
                </Link>
            </div> */}

            <div className="w-full rounded-3xl border border-gray-200 bg-white">
                <div className="rounded-3xl p-4 ring-1 ring-gray-200">
                    <div className="relative overflow-hidden pb-3">
                        <div className="relative h-[200px] border rounded-t-3xl border-gray-200 bg-gradient-to-b from-[#008000] to-[#729c72] [clip-path:polygon(0_0,_100%_0,_100%_95%,_50%_100%,_0_95%)]">
                            <div className="pointer-events-none absolute start-1/2 top-6 -z-10 -translate-x-1/2 text-center text-9xl/[0.8em] font-extrabold uppercase italic tracking-tighter text-white opacity-40 mix-blend-overlay">
                                {player.name}
                            </div>

                            {imageExists ? (
                                <Image
                                    src={playerImageURL}
                                    alt={`${player.name} Foto`}
                                    width={150}
                                    height={150}
                                    className="absolute start-1/2 bottom-0 -translate-x-1/2 z-0 rounded-3xl"
                                />
                            ) : (
                                <div className="absolute start-1/2 -bottom-2 -translate-x-1/2 z-0 text-6xl">
                                    <FaUserCircle size={120} className="text-gray-500" />
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-0 start-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-b from-[#008000] to-[#729c72] text-2xl/none font-extrabold tracking-tighter text-white">
                            {player.score}
                        </div>
                    </div>

                    <div className="pb-1 pt-3 text-center text-slate-800 ">
                        <h2 className="text-[22px]/tight font-bold tracking-tight">{player.name}</h2>
                        <div className="text-sm">{player.club}</div>
                    </div>

                    <div className="h-full pt-3 text-slate-800">
                        {habilits.map((habilit) => (
                            <div key={habilit.label} className="flex justify-between items-center">
                                <div className="text-[0.8rem] font-bold pb-2 uppercase h-full">{habilit.label}</div>
                                <div className="flex">{habilit.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto flex w-full flex-col p-0 m-0">
                    {statistics.map((statistic) => {
                        if (statistic.value && statistic.value !== "null" && statistic.value !== null) {
                            return (
                                <div
                                    className="relative overflow-hidden border-b border-gray-300 rounded-full px-4 pb-2 pt-3"
                                    key={statistic.label}
                                >
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
        
    );
}
