import React, { useEffect } from "react";

import Header from "../../components/Header";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getListClass } from "../../store/class/asyncActions";

const Home = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getListClass());
    },[])

    

    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <div className="w-full mt-14">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
