import { FaFutbol } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

interface TitleTableProps {
    title?: string;
    flagSrc?: StaticImageData[];
    description?: string;
}

const TitleTable: React.FC<TitleTableProps> = ({ title, flagSrc = [], description }) => {
    return (
        <div className="flex items-center px-4 gap-x-2 bg-[#f0f3f6] w-full">
            {/* Título */}
            <div className="shadow-[4px_0_0_0_currentColor] text-white skew-x-[-20deg] h-full py-2 pr-3">
                <div className="skew-x-[20deg] flex items-center gap-x-2">
                    <FaFutbol color="green" size={20} />
                    <h2 className="text-[#708CAA] uppercase text-sm">{title}</h2>
                </div>
            </div>

            {/* Bandeiras */}
            <div className="shadow-[4px_0_0_0_currentColor] text-white skew-x-[-20deg] h-full py-2 px-2 pr-3">
                <div className="skew-x-[20deg] flex items-center gap-x-2">
                    {flagSrc.map((flag, index) => (
                        <Image key={index} src={flag} alt="Bandeira" width={20} height={20} />
                    ))}
                </div>
            </div>

            {/* Descrição (agora com espaço delimitado) */}
            <div className="flex-1 px-3">
                <p className="text-[#708CAA] text-[13px] truncate whitespace-nowrap">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default TitleTable;
