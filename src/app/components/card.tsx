import Image from "next/image";
import { FaRegStarHalfStroke, FaStar, FaLink } from "react-icons/fa6";
import { Player } from "../types/Player";

interface PlayerCardProps {
    player: Player | null;
    playerImageURL: string | 'https://storage.googleapis.com/mesascout/images/no-player-image.svg';
}

export default function PlayerCard({ player, playerImageURL }: PlayerCardProps) {
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
    if (player?.pontos_fortes) {
        const pontosFortes = player.pontos_fortes.split(",").map(ponto => ponto.trim());
        pontosFortes.forEach(ponto => {
            habilits.push({
                label: ponto,
                value: (
                    <>
                        {renderStars(4)}
                        <FaRegStarHalfStroke size={12} />
                    </>
                ),
            });
        });
    }

    if (player?.pontos_fracos) {
        const pontosFracos = player.pontos_fracos.split(",").map(ponto => ponto.trim());
        pontosFracos.forEach(ponto => {
            habilits.push({
                label: ponto,
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
        { label: "Valor", value: player?.value ?? "-" },
        { label: "Idade", value: player?.age ? `${player.age} anos` : "-" },
        { label: "Jogos", value: player?.games ? `${player.games} jogos` : "-" },
        { label: "Posição", value: player?.position ?? "-" },
        { label: "Liga", value: player?.league ?? "-" },
        { label: "Contrato", value: player?.contrato ?? "-" },
        { label: "Minutos por jogo", value: player?.minute ?? "-" },
        { label: "Minutos jogados total", value: player?.totalminutos ?? "-" },
        { label: "Próximo Adversário", value: player?.prox_adversario ?? "-" },
        {
            label: "Veja +",
            value: player?.link ? (
                <a href={player.link} target="_blank" rel="noopener noreferrer">
                    <FaLink />
                </a>
            ) : "-",
        },
    ];

    return (
        <div className="lg:flex-none lg:min-w-[30%] flex min-w-full relative w-[400px] items-center justify-center h-full py-5 ">
            <div className="w-full rounded-3xl border border-gray-200 bg-white">
                <div className="rounded-3xl p-4 ring-1 ring-gray-200">
                    <div className="relative overflow-hidden pb-3">
                        <div className="relative h-[200px] border rounded-t-3xl border-gray-200 bg-gradient-to-b from-[#008000] to-[#729c72]">
                            <div className="absolute start-1/2 top-6 -translate-x-1/2 text-center text-9xl font-extrabold uppercase italic tracking-tighter text-white opacity-40 mix-blend-overlay">
                                {player?.name ?? "Jogador"}
                            </div>
                                <Image
                                    src={playerImageURL ?? ''}
                                    alt={`${player?.name ?? "Jogador"} Foto`}
                                    width={150}
                                    height={150}
                                    className="absolute start-1/2 bottom-0 -translate-x-1/2 rounded-3xl"
                                />
                        </div>
                        <div className="absolute bottom-0 start-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-b from-[#008000] to-[#729c72] text-2xl font-extrabold tracking-tighter text-white">
                            {player?.score ?? "-"}
                        </div>
                    </div>

                    <div className="pb-1 pt-3 text-center text-slate-800">
                        <h2 className="text-[22px] font-bold tracking-tight">{player?.name ?? "Nome"}</h2>
                        <div className="text-sm">{player?.club ?? "Clube"}</div>
                    </div>

                    <div className="h-full pt-3 text-slate-800">
                        {habilits.map(habilit => (
                            <div key={habilit.label} className="flex justify-between items-center">
                                <div className="text-[0.8rem] font-bold pb-2 uppercase h-full">{habilit.label}</div>
                                <div className="flex">{habilit.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto flex w-full flex-col p-0 m-0">
                    {statistics.map(statistic => (
                        statistic.value !== "-" ? (
                            <div
                                className="relative overflow-hidden border-b border-gray-300 rounded-full px-4 pb-2 pt-3"
                                key={statistic.label}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs uppercase text-slate-800">{statistic.label}</h3>
                                    <p className="text-sm font-bold text-slate-800">{statistic.value}</p>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}
