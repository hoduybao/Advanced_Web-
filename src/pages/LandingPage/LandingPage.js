import React from "react";

import Header from "../../pages/LandingPage/components/Header";
import Navbar from "./components/Navbar";
import Content from "./components/Content";

const LandingPage = () => {
    return (
        <div className="w-full flex flex-col items-center bg-purple-50">
            <Header />
            <div className="w-main">
                <Navbar />
                <Content />
            </div>
        </div>
    );
};

export default LandingPage;
