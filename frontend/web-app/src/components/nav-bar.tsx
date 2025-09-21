import Logo from "./logo";
import Search from "./search";

const NavBar = () => {
  return (
    <header className="flex justify-between items-center sticky top-0 z-50 bg-white py-4 px-6 shadow-md">
      {/* left side */}
      <Logo />

      {/* middle */}
      <Search />

      {/* right side */}
      <div className="flex items-center gap-4">Login</div>
    </header>
  );
};

export default NavBar;
