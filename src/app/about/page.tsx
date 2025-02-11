import Image from "next/image";
import mesaleft from "../../../public/images/about/mesa-left.jpg";
import mesaright from "../../../public/images/about/mesa-right.jpg";

const About = () => (
  <div className="container bg-white p-5 md:p-0">
    <section className="mt-10 flex flex-wrap items-center justify-center gap-x-24 md:flex-nowrap">
      <div className="relative mb-8 md:w-6/12 md:mb-0 ">
        <Image
          src={mesaleft}
          width={800}
          height={921}
          alt="Jogador de futebol de costas segurando uma bola"
          className=""
        />
      
        {/* SVG no canto inferior direito da imagem */}
        <div className="absolute -bottom-16 -right-16 p-4 hidden md:block">
          <img
            src="https://spin.axiomthemes.com/wp-content/uploads/2023/09/about-us-go.svg"
            width={148}
            height={148}
            alt="SVG"
            className="animate-spin-slow"
          />
        </div>
      </div>

      <div className="md:w-6/12">
        <h3 className="uppercase text-xs font-semibold">Transformando dados em talentos</h3>
        <h1 className="text-[2.5em] leading[1.13em] font-bold">Encontre o próximo craque do seu time</h1>
        <p className="mt-3 mb-14 text-[#797C7F]">
          O MesaScout conta com um robô que analisa sites especializados e identifica jogadores com excelente custo-benefício, cruzando dados de performance e valorização de mercado. Nossa tecnologia permite encontrar talentos promissores que podem se destacar no cenário do futebol, otimizando a busca para scouts, clubes e investidores. 🚀⚽
        </p>
        <Image
          src={mesaright}
          width={921}
          height={800}
          alt="Bola de futebol batendo na rede"
        />
      </div>
    </section>
  </div>
);

export default About;
