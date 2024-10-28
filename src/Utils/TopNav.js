import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TopNav = ({title}) => {
    const navigate = useNavigate();

    return (
        <nav className="py-7 max-sm:py-5 text-center text-3xl text-white flex items-center">
            <div 
            title="Back"
            onClick={() => navigate("/")}
            className="rounded-lg p-1">
                <IoIosArrowBack className="text-4xl max-sm:text-2xl cursor-pointer"/>
            </div>
            <h1 className="font-bold max-sm:text-2xl mx-auto">{title}</h1>
        </nav>
    );
};

export default TopNav;