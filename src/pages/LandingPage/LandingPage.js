import React from "react";

import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const LandingPage = ({isLogin}) => {
    return (
        <div className="w-full flex flex-col items-center">
            <Header isLogin />
    
            <div className="w-full bg-white">
                <Outlet />
            </div>
        </div>
    );
};

export default LandingPage;
