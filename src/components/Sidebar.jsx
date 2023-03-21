import { useState } from "react";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Search from "./Search";
import Messages from "./Messages";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:flex md:flex-col">
      <div
        className={` ${
          isOpen
            ? ":bg-white fixed top-0 left-0 z-50 h-screen w-full bg-white md:flex md:h-screen md:flex-col"
            : "hidden lg:block"
        }`}
      >
        <div className="mt-12 flex-1 md:mt-5">
          <Search />
          <Messages />
        </div>
      </div>
      <button
        className="absolute top-4 right-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 fill-current" />
        ) : (
          <Bars3BottomLeftIcon className="h-6 w-6 fill-current" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
