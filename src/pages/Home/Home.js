import React from "react";

import Header from "../../components/Header";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";


const Home = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <div className="w-full">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
