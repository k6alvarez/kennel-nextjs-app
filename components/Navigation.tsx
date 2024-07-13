import SignIn from "./auth/SignIn";
import { Logo } from "./Logo";
import { Suspense } from "react";
import { Menu } from "./Menu";

export const Navigation = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary text-white px-4 py-2 shadow-xl">
      <nav className="flex flex-1 justify-evenly text-xs md:text-base md:grid md:grid-cols-[1fr_3fr_1fr] md:justify-between items-center">
        <Logo />
        <Menu />
        <Suspense fallback="Loading...">
          <SignIn />
        </Suspense>
      </nav>
    </header>
  );
};
