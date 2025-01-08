import Link from "next/link";
import TwitterFollowButton from "./button-follow";

const Header: React.FC = () => {
    return (
      <header className="p-4 bg-gray-800 text-white flex justify-between">
    <h1>Player Database</h1>
    <nav>
      <Link href="/" className="text-white px-4">Home</Link>
      <Link href="/about" className="text-white px-4">About</Link>
      <Link href="/contact" className="text-white px-4">Contact</Link>
    </nav>
    <TwitterFollowButton />
  </header>
);
  };
  
  export default Header;