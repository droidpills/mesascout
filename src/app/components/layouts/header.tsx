"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/logo/mesa_logo_Br01.png";
import { usePathname } from "next/navigation";
import { FaInstagram, FaXTwitter, FaBars } from "react-icons/fa6";
import { FaTimes, FaYoutube, FaTiktok } from "react-icons/fa";

const Header: React.FC = () => {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-3 px-6 bg-[#292C34] text-white w-full shadow-lg ">
      <div className="container mx-auto">
        <header className="flex items-center justify-between uppercase font-semibold">
          {/* Logo */}
          <Link href="/" className="px-8" scroll={false}>
            <Image src={logo} width={150} height={150} alt="Logo Mesa Scout" />
          </Link>

          {/* Menu para Desktop */}
          <nav className="hidden md:flex w-full justify-start space-x-6">
            {[
              { href: "/", label: "Temporada 2024" },
              { href: "/about", label: "Sobre nós" },
              { href: "/contact", label: "Contato" },
              { href: "/copinha", label: "Copinha" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                scroll={false}
                className={`relative inline-block py-2 leading-none transition-all duration-300 tracking-wide text-sm ${
                  currentPath === href
                    ? "border-b-2 border-white text-white"
                    : "border-b-2 border-transparent text-white hover:border-gray-400 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Ícones de redes sociais */}
          <div className="hidden md:flex space-x-3 px-10">
            <div className="bg-[#171A21] rounded-full p-3 hover:shadow-lg transition-transform transform hover:scale-110">
              <Link href="https://www.instagram.com/mesascout" target="_blank">
                <FaInstagram size={20} className="text-white hover:text-pink-500" />
              </Link>
            </div>
            <div className="bg-[#171A21] rounded-full p-3 hover:shadow-lg transition-transform transform hover:scale-110">
              <Link href="https://twitter.com/Mesascout" target="_blank">
                <FaXTwitter size={20} className="text-white hover:text-black" />
              </Link>
            </div>
            <div className="bg-[#171A21] rounded-full p-3 hover:shadow-lg transition-transform transform hover:scale-110">
              <Link href="https://www.tiktok.com/@mesascout" target="_blank">
                <FaTiktok size={20} className="text-white hover:text-cyan-600" />
              </Link>
            </div>
            <div className="bg-[#171A21] rounded-full p-3 hover:shadow-lg transition-transform transform hover:scale-110">
              <Link href="https://www.youtube.com/@mesascout" target="_blank">
                <FaYoutube size={20} className="text-white hover:text-red-700" />
              </Link>
            </div>
          </div>

          {/* Botão Menu Hambúrguer para Mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        {/* Menu Mobile */}
        {isOpen && (
          <nav className="md:hidden flex flex-col bg-gray-800 py-4 px-6 rounded-lg mt-2 space-y-4 animate-slide-in">
            {[
              { href: "/", label: "Temporada 2024" },
              { href: "/about", label: "Sobre nós" },
              { href: "/contact", label: "Contato" },
              { href: "/copinha", label: "Copinha" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                scroll={false}
                onClick={() => setIsOpen(false)}
                className={`block text-white text-lg py-2 transition-all duration-300 ${
                  currentPath === href
                    ? "border-b-2 border-white text-white"
                    : "border-b-2 border-transparent hover:border-white hover:text-gray-300"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Ícones de redes sociais no menu mobile */}
            <div className="flex space-x-4 justify-center mt-4">
              <Link href="https://www.instagram.com/mesascout" target="_blank">
                <FaInstagram size={30} className="text-gray-400 transition-transform transform hover:scale-110 hover:text-pink-500" />
              </Link>
              <Link href="https://twitter.com/Mesascout" target="_blank">
                <FaXTwitter size={30} className="text-gray-400 transition-transform transform hover:scale-110 hover:text-black" />
              </Link>
              <Link href="https://twitter.com/Mesascout" target="_blank">
                <FaTiktok size={30} className="text-gray-400 transition-transform transform hover:scale-110 hover:text-cyan-600" />
              </Link>
              <Link href="https://twitter.com/Mesascout" target="_blank">
                <FaYoutube size={30} className="text-gray-400 transition-transform transform hover:scale-110 hover:text-red-700" />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
