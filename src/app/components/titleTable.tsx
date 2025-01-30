import { FaFutbol } from "react-icons/fa";

const TitleTable: React.FC = ({}) => {
    

    return (
        <div className="flex align-middle items-center p-4 gap-x-2 bg-[#f0f3f6]">
            <FaFutbol color="green" size={20}/>
            <h2 className="text-[#708CAA] uppercase text-sm"> Temporada 2024</h2> 
        </div>
    );
  };


  export default TitleTable;