import { FaFutbol } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

interface TitleTableProps {
    title?: string;
    flagSrc?: StaticImageData[];
    description?: string;
}

const TitleTable: React.FC<TitleTableProps> = ({ title, flagSrc = [], description }) => {
    return (
        <div className="flex-wrap bg-[#f0f3f6] gap-x-2 mt-2 px-0 w-full flex items-center justify-center lg:justify-start lg:px-1">
            {/* Título */}
            <div className="h-full py-3 lg:px-2 lg:shadow-[4px_0_0_0_currentColor] lg:text-white lg:skew-x-[-20deg]">
                <div className="flex gap-x-2 lg:skew-x-[20deg]">
                    <FaFutbol color="green" size={20} />
                    <h2 className="text-[#708CAA] uppercase text-sm">{title}</h2>
                </div>
            </div>

            {/* Bandeiras */}
            <div className="h-full w-full py-3 bg-[#292C34] flex justify-center lg:pr-3 lg:w-auto lg:bg-[#f0f3f6] lg:shadow-[4px_0_0_0_currentColor] lg:text-white lg:skew-x-[-20deg] lg:px-2">
                <div className="lg:skew-x-[20deg] flex items-center gap-x-3">
                    {flagSrc.map((flag, index) => (
                        <Image key={index} src={flag} alt="Bandeira" width={20} height={20} />
                    ))}
                </div>
            </div>

            {/* Descrição (agora com espaço delimitado) */}
            <div className="lg:px-3">
                <p className="py-3 text-[#708CAA] text-[13px] truncate whitespace-nowrap">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default TitleTable;
