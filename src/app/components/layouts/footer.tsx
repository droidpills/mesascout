import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaYoutube, FaTiktok } from "react-icons/fa";


const Footer: React.FC = () => {
  return (
    <section className="text-gray-700 bg-white body-font border mt-9 border-t-gray-200 ">
      <div className="container mx-auto flex flex-col items-center py-8 sm:flex-row md:px-0 lg:px-4 2xl:px-0">
        <p className="mt-4 text-sm text-gray-500 sm:mt-0">© 2025 Mesa Scout </p>
        <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
          <a href="https://www.youtube.com/@mesascout" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">YouTube</span>
            <FaYoutube size={24} />
          </a>

          <a href="https://www.instagram.com/mesascout" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <FaInstagram size={24}/>
          </a>

          <a href="https://twitter.com/Mesascout" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <FaXTwitter size={24}/>
          </a>

          <a href="https://www.tiktok.com/@mesascout" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Tiktok</span>
            <FaTiktok size={24} />
          </a>
        </span>
      </div>
    </section>
  );
};

export default Footer;