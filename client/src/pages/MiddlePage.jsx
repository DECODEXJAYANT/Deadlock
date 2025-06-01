import React from "react";
import logo1 from "../assets/temple.png";
import logo2 from "../assets/treking.png";
import logo3 from "../assets/snow.png";
import logo4 from "../assets/rafting.png";
import logo5 from "../assets/paragliding.png";
import { useNavigate } from "react-router-dom";

export default function MiddlePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="h-[105vh] flex justify-between">
        <div className="flex flex-col w-[60vw] bg-white ml-20 truncate">
          <div className="font-spartan font-bold bg-[#023471] w-[20vw] mt-[8vh] text-center p-2 text-white rounded-full hover:cursor-pointer hover:bg-blue-700">
            Why choose himachal tourism?
          </div>
          <h1 className="font-helveticaCompressed text-[4.5rem] text-[#9A9A9A]">
            Your search for perfect{" "}
          </h1>
          <h1 className="leading-none font-helveticaCompressed text-[5rem] mb-6 text-[#9A9A9A]">
            <span className="text-[#023471]">Himachali Itinerary</span> ends
            here
          </h1>
          <div className="w-full mt-5">
            <div className="w-[50] flex gap-5">
              <div>
                <img
                  src={logo5}
                  alt="paragliding"
                  className="w-[25vw] h-[30vh] object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div>
                <img
                  src={logo4}
                  alt="rafting"
                  className="w-[35vw] h-[30vh] rounded-3xl object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
            <div className="w-full mt-5 gap-7 flex justify-center">
              <img
                src={logo2}
                alt="mountain view"
                className="w-[20vw] h-[24vh] object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
              />
              <img
                src={logo1}
                alt="temple"
                className="w-[20vw] h-[35vh] object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
              />
              <img
                src={logo3}
                alt="snowboarding"
                className="w-[14vw] h-[25vh]  object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="flex h-[120vh] mx-auto w-[37vw] justify-center truncate ">
          <div className="flex py-auto flex-col justify-center">
            <div className=" h-[95vh] flex flex-col items-end justify-center rounded-xl">
              <button className="font-spartan text-lg bg-[#023471] text-white rounded-full p-1 px-5">
                Dont know much about himachal?
              </button>
              <p className="mt-2 text-gray-600 ">
                <span className="font-helveticaCompressed text-[#a9a9a9] flex justify-end">
                  you sure wonder about
                </span>
                <span className="text-[#505050] font-helveticaCompressed font-medium flex justify-end">
                  where to stay <span className="pl-1 text-[#ff0000]">?</span>
                </span>
                <span className="text-[#505050] font-helveticaCompressed font-medium flex justify-end">
                  which way to take{" "}
                  <span className="pl-1 text-[#ff0000]">?</span>
                </span>
                <span className="font-helveticaCompressed text-[#505050] font-medium flex justify-end">
                  which exquisite palces to visit{" "}
                  <span className="pl-1 text-[#ff0000]">?</span>
                </span>
                <span className="font-helveticaCompressed text-[#505050] font-medium flex justify-end">
                  Where to have local himachali food{" "}
                  <span className="pl-1 text-[#ff0000]">?</span>
                </span>
              </p>
              <div className="leading-none mb-3 font-helveticaCompressed mt-6 text-[3.5rem] text-[#FFA900]">
                We have got you covered
              </div>
              <div className="font-helveticaCompressed text-[5rem] leading-none text-[#FF0000]">
                Curated itinerary
              </div>
              <div className="font-helveticaCompressed mt-2 text-[3.5rem] leading-none text-[#9a9a9a]">
                for you
              </div>

              <div
                className="flex justify-center items-center mt-3"
                onClick={() => navigate("/plan-your-trip")}
              >
                <button className="font-spartan flex items-center justify-center bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition hover:bg-blue-600">
                  <span>Plan your trip</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 7l5 5-5 5M3 12h18"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
