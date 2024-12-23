import TwitterFollowButton from "./button-follow";

const Header: React.FC = () => {
    return (
      <header className="bg-blue-500 text-white p-4 text-center inline-flex flex-row justify-between w-full">
        <h1 className="text-2xl font-bold">Welcome to MesaScout</h1>
        <TwitterFollowButton />
      </header>
    );
  };
  
  export default Header;