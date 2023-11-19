import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import path from "../utils/path";
import { BiLogIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../store/user/asyncActions";
import { logout,clearMessage} from "../store/user/userSlice";
import Swal from "sweetalert2";

function Header({ currentPage, onSwitchPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggin, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isLoggin) {
      if (mes) {
        Swal.fire("Oops!", mes, "info").then(() => {
          dispatch(clearMessage());
        
            navigate("/auth/login");
        
        });
      }
      else{
        if (location.pathname !== "/") {
          navigate("/auth/login");

        }
     
      }
    }
  }, [isLoggin]);

  useEffect(() => {
    if (isLoggin) {
      dispatch(getCurrent());
    }
  }, [dispatch, isLoggin]);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleSwitch = () => {
    if (currentPage === "login") {
      onSwitchPage("register");
    } else if (currentPage === "register") {
      onSwitchPage("login");
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="flex justify-center w-full h-[56px] bg-[#210035]">
      <div className="w-main flex justify-between items-center h-full">
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="cursor-pointer w-[58px]" />
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

        {currentPage !== "register" && currentPage !== "login" && !isLoggin && (
         
            <Link to="/auth/login">
              <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
                <BiLogIn size={20} />
                <span>Login</span>
              </button>
            </Link>
        )}

        {isLoggin && (
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => handleProfileClick()}
              >
                <img
                  class="h-10 w-10 rounded-full"
                  src={current?.avatar}
                  alt=""
                />
              </button>
            </div>
            {isProfileOpen && (
              <div
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <Link
                  to={"/profile"}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  My Profile
                </Link>
                <div
                  onClick={() => {
                    dispatch(logout());
                    navigate("/auth/login");
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 cursor-pointer"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
