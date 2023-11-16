import React from "react";

import Header from "../../components/Header";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";


const Home = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <div className="w-full">
                <SideBar />
                <MainContent />
            </div>
        </div>
    );
};

export default Home;
