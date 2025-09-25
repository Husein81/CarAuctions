import { getCurrentUser } from "@/app/actions/authAuctions";
import LoginButton from "./login-button";
import Logo from "./logo";
import Search from "./search";
import UserActions from "./user-actions";

export default async function NavBar() {
  const user = await getCurrentUser();
  return (
    <header className="flex justify-between items-center sticky top-0 z-50 bg-white py-4 px-6 shadow-md">
      {/* left side */}
      <Logo />

      {/* middle */}
      <Search />

      {/* right side */}
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
}
