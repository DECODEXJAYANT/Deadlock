import React from "react";
import bgImage from "../assets/monk.jpg";
import HotelSearch from "./HotelSearchCard";
import Navbar from "./Navbar";

const Homepage = () => {
  return (
    <div
      className="h-[100vh] w-[100vw] bg-no-repeat bg-center object-contain bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />
      <div className="flex items-center flex-col">
        <div className="font-poppins mt-10 text-white flex  sm:text-base md:text-[50px] lg:text-[60px] leading-relaxed font-bold mb-1">
          Discover the untouched charm of Himachal
        </div>
        <div className=" font-poppins text-white sm:text-base md:text-lg lg:text-[28px] leading-relaxed text-[30px] my-5">
          where every valley whispers stories, and every sunrise invites a new
          adventure.
        </div>
      </div>
      <div className="flex justify-end mr-20 mt-10">
        <HotelSearch />
      </div>
      <div className="text-red-600 text-3xl text-center mt-5">Best Experience @ 80% of screen "Ctrl+ -"</div>
      <div className="h-[22vh]"></div>
      <div className="h-[8vh]"></div>
    </div>
  );
};

export default Homepage;
