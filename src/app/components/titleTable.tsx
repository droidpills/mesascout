import { FaFutbol } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

interface TitleTableProps {
    title?: string;
    flagSrc?: StaticImageData[];
    description?: string;
}

const TitleTable: React.FC<TitleTableProps> = ({ title, flagSrc = [], description }) => {
    return (
        <div className="flex-wrap bg-[#f0f3f6] gap-x-2 mt-2 px-0 w-full flex items-center justify-center sm:justify-start sm:px-4">
            {/* Título */}
            <div className="h-full py-3 sm:pr-3 sm:shadow-[4px_0_0_0_currentColor] sm:text-white sm:skew-x-[-20deg]">
                <div className="flex gap-x-2 sm:skew-x-[20deg]">
                    <FaFutbol color="green" size={20} />
                    <h2 className="text-[#708CAA] uppercase text-sm">{title}</h2>
                </div>
            </div>

            {/* Bandeiras */}
            <div className="h-full w-full py-3 bg-[#292C34] flex justify-center sm:pr-3 sm:w-auto sm:bg-[#f0f3f6] sm:shadow-[4px_0_0_0_currentColor] sm:text-white sm:skew-x-[-20deg] sm:px-2">
                <div className="sm:skew-x-[20deg] flex items-center gap-x-3">
                    {flagSrc.map((flag, index) => (
                        <Image key={index} src={flag} alt="Bandeira" width={20} height={20} />
                    ))}
                </div>
            </div>

            {/* Descrição (agora com espaço delimitado) */}
            <div className="sm:px-3">
                <p className="py-3 text-[#708CAA] text-[13px] truncate whitespace-nowrap">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default TitleTable;
