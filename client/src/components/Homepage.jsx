import React from "react";
import bgImage from "../assets/monk.jpg";
import BusHotelSearch from "./BusHotelSearch";
import Navbar from "./Navbar";

const Homepage = () => {
  return (
    <div
      className="h-max-screen w-max-screen bg-no-repeat bg-center object-contain bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />
      <div className="flex items-center flex-col">
        <div className="font-poppins mt-10 text-white flex  sm:text-base md:text-[50px] lg:text-[50px] leading-relaxed font-bold ">
          Discover the untouched charm of Himachal
        </div>
        <div className=" font-poppins text-white sm:text-base md:text-lg lg:text-[25px] leading-relaxed text-[30px] my-5">
          where every valley whispers stories, and every sunrise invites a new
          adventure.
        </div>
      </div>
      <div className="flex justify-end mr-20 mt-10">
        <BusHotelSearch />
      </div>
      <div className="h-[22vh]"></div>
      <div className="h-[8vh]"></div>
    </div>
  );
};

export default Homepage;
