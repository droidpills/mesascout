"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo/mesa_logo_Br01.png";
import { usePathname } from "next/navigation";
import { FaInstagram, FaXTwitter, FaBars } from "react-icons/fa6";
import { FaTimes, FaYoutube, FaTiktok } from "react-icons/fa";

interface Season {
  urlName: string;
  name: string;
  sortOrder: number;
}

interface HeaderClientProps {
  seasons: Season[];
}

const HeaderClient: React.FC<HeaderClientProps> = ({ seasons }) => {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-3 bg-[#292C34] text-white w-full shadow-lg">
      <div className="lg:container mx-auto md:px-0 lg:px-4 2xl:px-0">
        <header className="flex items-center justify-between uppercase font-semibold">
          <Link href="/" className=" pr-0 mx-auto lg:pr-8 lg:mx-0" scroll={false}>
            <Image src={logo} width={150} height={150} alt="Logo Mesa Scout" className="w-20 h-auto lg:w-[150px] lg:h-auto" />
          </Link>

          <nav className="hidden w-full justify-start space-x-6 lg:flex">
            {[...seasons.sort((a, b) => a.sortOrder - b.sortOrder).map(({ urlName, name }) => ({
              href: `/seasons/${urlName}`,
              label: name,
            })), { href: "/about", label: "Sobre nós" }, { href: "/contact", label: "Contato" }]
            .map(({ href, label }) => (
              <Link key={href} href={href} scroll={false}
                className={`relative inline-block py-2 leading-none transition-all duration-300 tracking-wide text-sm ${
                  currentPath === href ? "border-b-2 border-white text-white" :
                  "border-b-2 border-transparent text-white hover:border-gray-400 hover:text-white"
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden space-x-3 lg:flex">
            {/* redes sociais */}
            {[
              { href: "https://www.instagram.com/mesascout", icon: <FaInstagram size={20} className="text-white hover:text-pink-500" /> },
              { href: "https://twitter.com/Mesascout", icon: <FaXTwitter size={20} className="text-white hover:text-black" /> },
              { href: "https://www.tiktok.com/@mesascout", icon: <FaTiktok size={20} className="text-white hover:text-cyan-600" /> },
              { href: "https://www.youtube.com/@mesascout", icon: <FaYoutube size={20} className="text-white hover:text-red-700" /> },
            ].map(({ href, icon }) => (
              <div key={href} className="bg-[#171A21] rounded-full p-3 hover:shadow-lg transition-transform transform hover:scale-110">
                <Link href={href} target="_blank">{icon}</Link>
              </div>
            ))}
          </div>

          <button className="text-white text-2xl absolute right-1 top-10 p-4 pt-0 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        {isOpen && (
          <nav className="flex flex-col items-center bg-[#292C34] py-3 px-6 rounded-lg mt-2 space-y-3 animate-slide-in lg:hidden">
            {[...seasons.sort((a, b) => a.sortOrder - b.sortOrder).map(({ urlName, name }) => ({
              href: `/seasons/${urlName}`,
              label: name,
            })), { href: "/about", label: "Sobre nós" }, { href: "/contact", label: "Contato" }]
            .map(({ href, label }) => (
              <Link key={href} href={href} scroll={false}
                className={`relative inline-block py-2 leading-none transition-all duration-300 tracking-wide text-sm ${
                  currentPath === href ? "border-b-2 border-white text-white" :
                  "border-b-2 border-transparent text-white hover:border-gray-400 hover:text-white"
                }`}>
                {label}
              </Link>
            ))}

            <div className="flex space-x-4 justify-center mt-5 py-2">
              <Link href="https://www.instagram.com/mesascout" target="_blank"><FaInstagram size={30} className="text-gray-400 hover:scale-110 hover:text-pink-500" /></Link>
              <Link href="https://twitter.com/Mesascout" target="_blank"><FaXTwitter size={30} className="text-gray-400 hover:scale-110 hover:text-black" /></Link>
              <Link href="https://www.tiktok.com/@mesascout" target="_blank"><FaTiktok size={30} className="text-gray-400 hover:scale-110 hover:text-cyan-600" /></Link>
              <Link href="https://www.youtube.com/@mesascout" target="_blank"><FaYoutube size={30} className="text-gray-400 hover:scale-110 hover:text-red-700" /></Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default HeaderClient;
