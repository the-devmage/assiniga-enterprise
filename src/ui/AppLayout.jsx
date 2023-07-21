import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import NotificationArea from "../components/NotificationArea";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import CartBadge from "../components/CartBadge";
export default function AppLayout() {
  const [hidden, setHidden] = useState(true);

  function toggle() {
    setHidden((hidden) => !hidden);
  }

  return (
    <div className="bg-[#E0E7E9] md:grid md:grid-cols-12 h-[100vh] md:pr-10 md:py-8 relative">
      <aside
        className={`fixed z-20 md:relative top-0 left-0 md:col-span-2 md:row-span-full p-4 md:p-0 md:h-full bg-[#b3d2dd] md:bg-inherit ${
          hidden ? "w-full" : "w-full"
        }`}
      >
        <GiHamburgerMenu
          size={"1.5em"}
          className={`block md:hidden`}
          onClick={toggle}
        />
        <div
          className={`${
            hidden ? "hidden" : "sm-block sm:z-[300]"
          } md:block md:h-full`}
        >
          <Sidebar />
        </div>
      </aside>
      <main className="md:col-span-10 h-[100%] border  border-[#0c4a6023] pt-2 overflow-auto">
        <header className="pb-2 px-4 w-full flex justify-center items-center gap-20 border border-b-[#0c4a6023] relative mt-16 md:mt-0">
          <div className="flex flex-grow justify-center">
            <Search />
          </div>
          <div className="inline-flex gap-4">
            <CartBadge />
            <NotificationArea />
          </div>
        </header>
        <Outlet className={`p-12 ${hidden ? "" : "ml-0"}`} />
      </main>
    </div>
  );
}
