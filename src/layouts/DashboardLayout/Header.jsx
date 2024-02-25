import { NavLink } from "react-router-dom";
import icons from "~/assets/js/icons";
import Dropdown from "~/components/Global/Dropdown/DropDown";
import Logo from "~/components/Global/Logo/Logo";
import { classNames } from "~/utilities/classNames";

const Header = ({ onToggleSidebar }) => {
  const handleLogout = () => {
    alert("logging out");
  };

  return (
    <header className="bg-white fixed top-0 inset-x-0 z-[2] gap-4">
      <nav className="h-full w-full flex items-center gap-4 p-6 py-3">
        {/* Sidebar Toggle Button */}
        <button
          className="text-primary text-2xl focus:outline-none hover:bg-onPrimary rounded-md transition-all p-1 lg:hidden"
          onClick={onToggleSidebar}
        >
          {icons.menu}
        </button>
        {/* Logo */}
        <Logo className="w-auto h-14" />

        <div className="flex-1" />
        {/* Notification Icon */}
        <button className="text-primary text-xl focus:outline-none hover:bg-onPrimary rounded-md transition-all p-1.5">
          {icons.bell}
        </button>
        {/* Avatar Dropdown */}
        <Dropdown
          toggleElement={
            <button className="inline-flex items-center gap-2 hover:bg-onPrimary transition rounded-lg">
              {/* <img src="" className="h-10 w-10 bg-onPrimary rounded-full" /> */}
              <span className="h-10 w-10 bg-onPrimary rounded-full inline-flex items-center justify-center text-2xl text-primary">
                {icons.person}
              </span>
              <span className="text-">{icons.caretDown}</span>
            </button>
          }
        >
          <ul className="w-56 rounded-2xl text-sm pt-2 pb-2 bg-white shadow-lg border border-gray/20">
            <li className="py-2 px-4 truncate">
              <p className="font-semibold truncate">Person Papa</p>
              <p className="text-xs text-gray truncate">somebody@gmail.com</p>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  classNames(
                    "flex items-center gap-3 px-5 py-2 cursor-pointer border-t  font-medium transition-all",
                    isActive ? "bg-onPrimary text-primary" : "bg-transparent text-black hover:bg-onPrimary"
                  )
                }
              >
                <span className="text-lg">{icons.person}</span> View profile
              </NavLink>
            </li>
            <li
              className="flex gap-3 items-center text-black cursor-pointer border-t px-5 py-2 hover:bg-onPrimary transition-all"
              onClick={handleLogout}
            >
              <span className="text-lg">{icons.logout}</span> Logout
            </li>
          </ul>
        </Dropdown>
      </nav>
    </header>
  );
};

export default Header;
