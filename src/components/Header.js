import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import path from "../utils/path";
import { BiLogIn, BiSearch } from "react-icons/bi";
import { useState } from "react";

function Header({ currentPage, onSwitchPage }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSwitch = () => {
    if (currentPage === "login") {
      onSwitchPage("register");
    } else {
      onSwitchPage("login");
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="flex justify-center w-full h-[56px] bg-[#210035]">
      <div className="w-main flex justify-between items-center h-full">
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="cursor-pointer w-[60px]" />
        </Link>
        {currentPage === "login" && (
          <Link to="/auth/register" onClick={() => handleSwitch()}>
            <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
              <BiLogIn size={20} />
              <span>Register</span>
            </button>
          </Link>
        )}
        {currentPage === "register" && (
          <Link to="/auth/login" onClick={() => handleSwitch()}>
            <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
              <BiLogIn size={20} />
              <span>Login</span>
            </button>
          </Link>
        )}
        {currentPage !== "register" && currentPage !== "login" && (
          <div className="flex gap-4 items-center">
            <div className="relative">
              <BiSearch
                size={20}
                className="cursor-pointer text-white"
                onClick={() => handleSearchClick()}
              />
              {isSearchOpen && (
                <div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="absolute top-0 right-0 bg-white border border-gray-300 p-1 rounded"
                  />
                </div>
              )}
            </div>
            <Link to="/auth/register">
              <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
                <BiLogIn size={20} />
                <span>Register</span>
              </button>
            </Link>
            <Link to="/auth/login">
              <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
                <BiLogIn size={20} />
                <span>Login</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
