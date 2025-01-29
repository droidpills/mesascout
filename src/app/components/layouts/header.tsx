"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/mesa_logo_Br01.png";
import { usePathname } from "next/navigation";
import { FaInstagram, FaXTwitter, FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4 px-6 bg-gray-700 text-white w-full">
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
                className={`relative inline-block py-2 leading-none transition-colors duration-300 ${
                  currentPath === href
                    ? "border-b-4 border-white"
                    : "border-b-4 border-transparent"
                } hover:border-white`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Ícones de redes sociais */}
          <div className="hidden md:flex space-x-2 px-10">
            <div className="bg-gray-800 rounded-full p-4">
              <Link href="https://www.instagram.com/mesascout" target="_blank">
                <FaInstagram
                  size={25}
                  className="text-gray-400 transition-colors duration-300 hover:text-pink-500"
                />
              </Link>
            </div>
            <div className="bg-gray-800 rounded-full p-4">
              <Link href="https://twitter.com/Mesascout" target="_blank">
                <FaXTwitter
                  size={25}
                  className="text-gray-400 transition-colors duration-300 hover:text-black"
                />
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
          <nav className="md:hidden flex flex-col bg-gray-800 py-4 px-6 rounded-lg mt-2 space-y-4">
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
                className={`block text-white text-lg py-2 transition-colors duration-300 ${
                  currentPath === href
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent"
                } hover:border-white`}
              >
                {label}
              </Link>
            ))}

            {/* Ícones de redes sociais no menu mobile */}
            <div className="flex space-x-4 justify-center mt-4">
              <Link href="https://www.instagram.com/mesascout" target="_blank">
                <FaInstagram
                  size={30}
                  className="text-gray-400 transition-colors duration-300 hover:text-pink-500"
                />
              </Link>
              <Link href="https://twitter.com/Mesascout" target="_blank">
                <FaXTwitter
                  size={30}
                  className="text-gray-400 transition-colors duration-300 hover:text-black"
                />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
