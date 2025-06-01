import React from "react";
import kulludesh from "../assets/kulludesh.jpg";
import snowfall from "../assets/snowfall.jpg";
import forest from "../assets/forest.jpg";
import bluehills from "../assets/bluehills.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 

const Conclusion = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value); 
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmitSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscription submitted");
  
    alert("Subscription successful!");
    // Reset the email and name fields after submission
    setEmail("");
    setName("");
    //form reset
    e.target.reset();
  };
  return (
    <div className="bg-white pt-8 bg-cover mt-[10vh]">
      {/* Card Section */}
      <div className="font-helveticaCompressed text-7xl text-center mb-7">
        --------------Popular Destinations------------
      </div>
      <div className="flex justify-center">
        <div className="flex mb-12 font-poppins">
          {/* Card 1 */}
          <div className="w-[26vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
            <img
              src={`${kulludesh}`}
              className="rounded-2xl mb-2"
              alt="Dussehra in Kullu"
            />
            <h2 className="text-xl font-semibold mb-2">Dussehra in Kullu</h2>
            <p className="text-sm mb-4">
              Kullu Dussehra is a unique week-long festival celebrated in the
              Kullu Valley of Himachal Pradesh, starting on Vijayadashami.
              Unlike the rest of India, effigies of Ravana are not burned here;
              instead, the festival centers around the worship of Lord
              Raghunath. Over 200 local deities arrive in vibrant processions at
              Dhalpur Maidan, creating a divine congregation.
            </p>
            <button
              className="text-white w-full rounded-full bg-[#043271] p-2"
              onClick={() => {
                navigate("/dussera");
              }}
            >
              Explore now Dussehra in Kullu
            </button>
          </div>

          {/* Card 2 */}
          <div className="w-[26vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
            <img
              src={`${snowfall}`}
              alt="Prashar Lake in Mandi"
              className="rounded-2xl mb-2"
            />
            <h2 className="text-xl font-semibold mb-2">
              Prashar Lake in Mandi
            </h2>
            <p className="text-sm mb-4">
              Prashar Lake is a beautiful lake situated in the Mandi district of
              Himachal Pradesh, known for its stunning views and unique
              surroundings. It is a serene spot for nature lovers and
              adventurers alike, offering breathtaking landscapes and a tranquil
              environment.
            </p>
            <button
              className="text-white w-full rounded-full bg-[#043271] p-2"
              onClick={() => {
                navigate("/prasharlake");
              }}
            >
              Explore now Prashar Lake
            </button>
          </div>

          {/* Card 3 */}
          <div className="w-[26vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
            <img
              src={`${forest}`}
              alt="Jibhi in Kullu"
              className="rounded-2xl mb-2"
            />
            <h2 className="text-xl font-semibold mb-2">Jibhi in Kullu</h2>
            <p className="text-sm mb-4">
              Jibhi is a captivating destination in the Kullu Valley known for
              its serene environment and scenic beauty. It offers a perfect
              getaway for those seeking tranquility amidst nature, with charming
              wooden cottages and lush greenery.
            </p>
            <button
              className="text-white w-full rounded-full bg-[#043271] p-2"
              onClick={() => {
                navigate("/kullu");
              }}
            >
              Explore now Jibhi
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Form */}
      <div
        className="relative flex h-[50vh] w-[100vw] overflow-hidden justify-around object-cover  bg-no-repeat "
        style={{ backgroundImage: `url(${bluehills})` }}
      >
        <div className=" text-white rounded-lg w-[30vw] p-6 flex flex-col items-center gap-2 mt-5">
          <p className="text-3xl max-w-[28vw] text-[#043271] font-semibold mb-4 truncate">
            Signup for Himachal tourism Monthly newsletter
          </p>
          <form className="text-lg">
            <div className="mb-4 ">
              <label
                className="block mb-2 text-white max-w-[28vw] "
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="bg-transparent border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-[28vw]"
                type="text"
                id="name"
                value={name}
                placeholder="Enter your Name"
                onChange={(e) => {
                  {
                    handleNameChange(e);
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-white max-w-[70%]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="bg-transparent border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-[28vw]"
                type="email"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  {
                    handleEmailChange(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black w-[28vw] rounded p-2 hover:bg-gray-100"
              onClick={(e) => {
                handleSubmitSubscribe(e); 
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="  text-[#043271] text-lg flex justify-evenly p-6">
          <div className="flex justify-around">
            {/* Quick Links Section */}
            <div className="w-[35%] mr-5">
              <h3 className="text-lg font-bold mb-4">Quick links</h3>
              <ul className="list-none text-white list-inside space-y-2 rounded-lg border-red-500 border-2">
                <li className="hover:cursor-pointer">Home</li>
                <li className="hover:cursor-pointer">Destinations</li>
                <li className="hover:cursor-pointer">Activities</li>
                <li className="hover:cursor-pointer">How to reach</li>
                <li className="hover:cursor-pointer">Tours and packages</li>
              </ul>
            </div>

            {/* About Us Section */}
            <div className="w-[35%] mr-5">
              <h3 className="text-lg font-bold mb-4">About us</h3>
              <ul className="list-none text-white list-inside space-y-2 rounded-lg border-red-500 border-2">
                <li className="hover:cursor-pointer">About Himachal Tourism</li>
                <li className="hover:cursor-pointer">What we do</li>
                <li className="hover:cursor-pointer">Our story</li>
                <li className="hover:cursor-pointer">Why choose us</li>
                <li className="hover:cursor-pointer">Contact us</li>
              </ul>
            </div>

            {/* Customer Support Section */}
            <div className="w-[35%] ">
              <h3 className="text-lg font-bold mb-4">Customer support</h3>
              <ul className="list-none text-white list-inside space-y-2 rounded-lg border-red-500 border-2">
                <li className="hover:cursor-pointer">Travel Insurance</li>
                <li className="hover:cursor-pointer">FAQs</li>
                <li className="hover:cursor-pointer">Cancellation policy</li>
                <li className="hover:cursor-pointer">Testimonials</li>
                <li className="hover:cursor-pointer">Call support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute left-[35vw] bottom-0 top-[42vh] leading-none text-gray-500 font-bold opacity-60 text-[70px] text-center">
          Himachal Tourism
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
