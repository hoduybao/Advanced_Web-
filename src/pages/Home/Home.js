import React from "react";

import Header from "../../components/Header";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";


const Home = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Header currentPage={"home"} />
            <div className="w-main">
                <SideBar />
                <MainContent />
            </div>
        </div>
    );
};

export default Home;
