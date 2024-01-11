import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/Header";
const Authentication = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // Sử dụng location.pathname để xác định trang hiện tại
  const currentPage = location.pathname === "/auth/login" ? "login" : "register";

  const handleSwitchPage = (page) => {
    if (page === "login") {
      navigate("/auth/login");
    } else {
      navigate("/auth/register");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-purple-50">
      <Header currentPage={currentPage} onSwitchPage={handleSwitchPage} />
      <div className="w-main mt-[56px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Authentication;
