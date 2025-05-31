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
    "Tour and Packages",
    "How to reach",
    "Contact us",
  ];

  const authLinks = ["Login", "Signup"];

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 shadow-md bg-transparent z-50">
      {/* Logo on the left */}
      <div className="w-[10%] flex items-center justify-center h-16">
        <img
          src={logo}
          alt="Logo"
          className="h-full object-contain hover:cursor-pointer"
        />
      </div>

      {/* Center + Auth Buttons */}
      {/* <div className="flex-1 flex flex-col custom:flex-row justify-between items-center"> */}
        {/* Desktop layout */}
        <div className="hidden custom:flex justify-between items-center w-[85%]">
          {/* Main nav buttons */}
          <nav className="ml-20 bg-white/20 backdrop-blur-md h-[6vh] rounded-full shadow-lg flex items-center gap-6">
            {mainLinks.map((item, index) => (
              <button
                key={item}
                onClick={() =>
                  window.scrollBy({
                    top: window.innerHeight * (index + 1),
                    behavior: "smooth",
                  })
                }
                className={`rounded-full px-3 py-1.5 text-sm transition duration-200 font-spartan ${
                  item === "Home"
                    ? "bg-[#023471] text-white"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Auth buttons */}
          <nav className="bg-white/20 backdrop-blur-md h-[6vh] rounded-full shadow-lg px-1 flex items-center justify-evenly w-[12%]">
            {authLinks.map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Login") navigate("/login");
                  else navigate("/signup");
                }}
                className={`text-sm rounded-full px-3 py-1.5 transition duration-200 font-spartan ${
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
        <div className="custom:hidden flex justify-end w-full">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown content */}
        {isOpen && (
          <div className="flex flex-col gap-4 mt-3 custom:hidden w-full">
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
                  onClick={() =>
                    item === "Login"
                      ? navigate("/login")
                      : navigate("/signup")
                  }
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
  );
};

export default Navbar;
