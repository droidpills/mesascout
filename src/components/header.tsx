const Header: React.FC = () => {
    return (
      <header className="bg-blue-500 text-white p-4 text-center inline-flex flex-row justify-between w-full">
        <h1 className="text-2xl font-bold">Welcome to MesaScout</h1>
        <a href="https://twitter.com/Mesascout?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">Follow @Mesascout</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </header>
    );
  };
  
  export default Header;