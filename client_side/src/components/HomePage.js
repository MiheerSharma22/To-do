import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center flex-col">
      <p className="w-full text-center text-3xl md:text-5xl text-[#ff5733] mb-[5rem]">
        Welcome, create your personalised TODO!
      </p>
      <div className="flex md:flex-row flex-col gap-6 justify-center items-center">
        <NavLink to={"/login"}>
          <button
            className="py-[0.5rem] md:py-[0.7rem] px-[2rem] bg-gradient-to-r from-[#bd2525] to-[#d22727] text-white text-xl 
            hover:text-[#bd2525] hover:outline-1 hover:outline hover:outline-offset-2 hover:outline-[#bd2525] hover:bg-gradient-to-r 
            hover:from-transparent transition-all duration-200"
          >
            Login
          </button>
        </NavLink>
        <NavLink to={"/signup"}>
          <button
            className="py-[0.5rem] md:py-[0.7rem] px-[2rem] bg-gradient-to-r from-[#bd2525] to-[#d22727] text-white text-xl 
            hover:text-[#bd2525] hover:outline-1 hover:outline hover:outline-offset-2 hover:outline-[#bd2525] hover:bg-gradient-to-r 
            hover:from-transparent transition-all duration-200"
          >
            Signup
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
