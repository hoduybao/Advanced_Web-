import React from "react";

import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
    
            <div className="w-full bg-white mt-[56px]">
                <Outlet />
            </div>
        </div>
    );
};

export default LandingPage;
