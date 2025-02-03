import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaYoutube, FaTiktok, FaGithub } from "react-icons/fa";


const Footer: React.FC = () => {
  return (
    <section className="text-gray-700 bg-white body-font">
      <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">© 2025 Mesa Scout </p>
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

          <a href="https://github.com/droidpills/mesascout" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <FaGithub size={24} />
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