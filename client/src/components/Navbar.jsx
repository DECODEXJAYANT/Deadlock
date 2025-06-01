import React, { useState } from "react";
import logo from "../assets/image1.png";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const mainLinks = [
    "Home",
    "Destinations",
    "Activities",
    "How to reach",
    "Contact us",
    "About us",
  ];

  const authLinks = ["Login", "Signup"];

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center py-4">
      {/* Logo on the left */}
      <div className="h-16 w-[120px] md:mt-5 md:mr-10">
        <img
          src={logo}
          alt="Logo"
          className="object-contain h-full w-full hover:cursor-pointer"
        />
      </div>

      {/* Center + Auth Buttons */}
      <div className="flex-1 mt-4 md:mt-5 md:ml-6 truncate">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-around items-center w-full">
          {/* Main nav buttons in glass div */}
          <nav className="bg-white/20 backdrop-blur-md h-[5.2vh] rounded-full px-4 shadow-lg flex items-center flex-wrap gap-6 w-[65%]">
            {mainLinks.map((item, index) => (
              <button
                key={item}
                onClick={() =>
                  window.scrollBy({
                    top: window.innerHeight * (index + 1),
                    behavior: "smooth",
                  })
                }
                className={`rounded-full px-3 py-1.5 text-xl overflow-hidden transition duration-200 font-spartan ${
                  item === "Home"
                    ? "bg-[#023471] text-white"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Auth buttons in separate glass div */}
          <nav className="bg-white/20 backdrop-blur-md h-[6vh] rounded-full shadow-lg px-1 flex items-center  justify-between">
            {["Login", "Signup"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Login") navigate("/login");
                  else navigate("/signup");
                }}
                className={`text-sm rounded-full px-5 py-2 transition duration-200 font-spartan ${
                  item === "Login"
                    ? "bg-[#023471] text-white"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex justify-between items-center w-full">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown content */}
        {isOpen && (
          <div className="flex flex-col gap-4 mt-3 md:hidden">
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 shadow">
              {mainLinks.map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollBy({
                      top: window.innerHeight * (index + 1),
                      behavior: "smooth",
                    });
                  }}
                  className={`block w-full text-left rounded-full px-4 py-2 text-sm transition duration-200 ${
                    item === "Home"
                      ? "bg-[#023471] text-white"
                      : "hover:bg-[#023471] hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 shadow flex justify-around">
              {authLinks.map((item) => (
                <button
                  key={item}
                  className={`text-sm rounded-full px-4 py-2 transition duration-200 ${
                    item === "Login"
                      ? "bg-[#023471] text-white"
                      : "hover:bg-[#023471] hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
