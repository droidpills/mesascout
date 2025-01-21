import Link from "next/link";
import TwitterFollowButton from "./button-follow";

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-white px-4">
        <h1>Mesa Scout</h1> </Link>
      <nav>
        <Link href="/" className="text-white px-4">Temporada 2024</Link>
        <Link href="/about" className="text-white px-4">Sobre nós</Link>
        <Link href="/contact" className="text-white px-4">Contato</Link>
        <Link href="/copinha" className="text-white px-4">Copinha</Link>
      </nav>
      <TwitterFollowButton />
    </header>
  );
};

export default Header;