// import React from "react";
// import kulludesh from "../assets/kulludesh.jpg";
// import snowfall from "../assets/snowfall.jpg";
// import forest from "../assets/forest.jpg";
// import bluehills from "../assets/bluehills.png";
// const Conclusion = () => {
//   return (
//     <div className="bg-white pt-8 bg-cover">
//       {/* Card Section */}
//       <div className="font-helveticaCompressed text-7xl text-center mb-7">
//         ----------------------Popular Destinations---------------------
//       </div>
//       <div className="flex justify-center">
//         <div className="flex mb-12 font-poppins">
//           {/* Card 1 */}
//           <div className="w-[26vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
//             <img
//               src={`${kulludesh}`}
//               className="rounded-2xl mb-2"
//               alt="Dussehra in Kullu"
//             />
//             <h2 className="text-xl font-semibold mb-2">Dussehra in Kullu</h2>
//             <p className="text-sm mb-4">
//               Kullu Dussehra is a unique week-long festival celebrated in the
//               Kullu Valley of Himachal Pradesh, starting on Vijayadashami.
//               Unlike the rest of India, effigies of Ravana are not burned here;
//               instead, the festival centers around the worship of Lord
//               Raghunath. Over 200 local deities arrive in vibrant processions at
//               Dhalpur Maidan, creating a divine congregation.
//             </p>
//             <button className="text-white w-full rounded-full bg-[#043271] p-2">
//               Explore now Dussehra in Kullu
//             </button>
//           </div>

//           {/* Card 2 */}
//           <div className="w-[26vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
//             <img
//               src={`${snowfall}`}
//               alt="Prashar Lake in Mandi"
//               className="rounded-2xl mb-2"
//             />
//             <h2 className="text-xl font-semibold mb-2">
//               Prashar Lake in Mandi
//             </h2>
//             <p className="text-sm mb-4">
//               Prashar Lake is a beautiful lake situated in the Mandi district of
//               Himachal Pradesh, known for its stunning views and unique
//               surroundings. It is a serene spot for nature lovers and
//               adventurers alike, offering breathtaking landscapes and a tranquil
//               environment.
//             </p>
//             <button className="text-white w-full rounded-full bg-[#043271] p-2">
//               Explore now Prashar Lake
//             </button>
//           </div>

//           {/* Card 3 */}
//           <div className="w-[26vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
//             <img
//               src={`${forest}`}
//               alt="Jibhi in Kullu"
//               className="rounded-2xl mb-2"
//             />
//             <h2 className="text-xl font-semibold mb-2">Jibhi in Kullu</h2>
//             <p className="text-sm mb-4">
//               Jibhi is a captivating destination in the Kullu Valley known for
//               its serene environment and scenic beauty. It offers a perfect
//               getaway for those seeking tranquility amidst nature, with charming
//               wooden cottages and lush greenery.
//             </p>
//             <button className="text-white w-full rounded-full bg-[#043271] p-2">
//               Explore now Jibhi
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Newsletter Signup Form */}
//       <div
//         className="relative flex h-[50vh] px-10 overflow-hidden justify-between object-cover bg-no-repeat "
//         style={{ backgroundImage: `url(${bluehills})` }}
//       >
//         <div className=" text-white rounded-lg w-[40vw] ml-10 p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Signup for Himachal tourism Monthly newsletter
//           </h2>
//           <form>
//             <div className="mb-4">
//               <label className="block mb-2 text-white" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 className="bg-transparent border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-[70%]"
//                 type="text"
//                 id="name"
//                 placeholder="Enter your Name"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 text-white" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 className="bg-transparent border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-[70%]"
//                 type="email"
//                 id="email"
//                 placeholder="Enter your Email"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-white text-black w-[70%] rounded p-2 hover:bg-gray-100"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//         <div className="  text-white flex justify-evenly p-6">
//           <div className="flex justify-around">
//             {/* Quick Links Section */}
//             <div className="w-[35%] mr-5">
//               <h3 className="text-lg font-bold mb-4">Quick links</h3>
//               <ul className="list-disc list-inside space-y-2">
//                 <li className="hover:cursor-pointer">Home</li>
//                 <li className="hover:cursor-pointer">Destinations</li>
//                 <li className="hover:cursor-pointer">Activities</li>
//                 <li className="hover:cursor-pointer">How to reach</li>
//                 <li className="hover:cursor-pointer">Tours and packages</li>
//               </ul>
//             </div>

//             {/* About Us Section */}
//             <div className="w-[35%] mr-5">
//               <h3 className="text-lg font-bold mb-4">About us</h3>
//               <ul className="list-disc list-inside space-y-2">
//                 <li className="hover:cursor-pointer">About Himachal Tourism</li>
//                 <li className="hover:cursor-pointer">What we do</li>
//                 <li className="hover:cursor-pointer">Our story</li>
//                 <li className="hover:cursor-pointer">Why choose us</li>
//                 <li className="hover:cursor-pointer">Contact us</li>
//               </ul>
//             </div>

//             {/* Customer Support Section */}
//             <div className="w-[35%]">
//               <h3 className="text-lg font-bold mb-4">Customer support</h3>
//               <ul className="list-disc list-inside space-y-2">
//                 <li className="hover:cursor-pointer">Travel Insurance</li>
//                 <li className="hover:cursor-pointer">FAQs</li>
//                 <li className="hover:cursor-pointer">Cancellation policy</li>
//                 <li className="hover:cursor-pointer">Testimonials</li>
//                 <li className="hover:cursor-pointer">Call support</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="absolute left-[35vw] bottom-0 top-[42vh] leading-none text-gray-500 font-bold opacity-60 text-[70px] text-center">
//           Himachal Tourism
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Conclusion;
import React from "react";
import kulludesh from "../assets/kulludesh.jpg";
import snowfall from "../assets/snowfall.jpg";
import forest from "../assets/forest.jpg";
import bluehills from "../assets/bluehills.png";

const Conclusion = () => {
  return (
    <div className="bg-white pt-8 bg-cover">
      {/* Heading */}
      <div className="font-helveticaCompressed text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center mb-7 px-4">
        ----------------------Popular Destinations---------------------
      </div>

      {/* Cards */}
      <div className="flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-6 mb-12 font-poppins max-w-7xl">
          {/* Card Component */}
          {[ 
            {
              img: kulludesh,
              title: "Dussehra in Kullu",
              desc:
                "Kullu Dussehra is a unique week-long festival celebrated in the Kullu Valley of Himachal Pradesh...",
              btnText: "Explore now Dussehra in Kullu",
            },
            {
              img: snowfall,
              title: "Prashar Lake in Mandi",
              desc:
                "Prashar Lake is a beautiful lake situated in the Mandi district of Himachal Pradesh...",
              btnText: "Explore now Prashar Lake",
            },
            {
              img: forest,
              title: "Jibhi in Kullu",
              desc:
                "Jibhi is a captivating destination in the Kullu Valley known for its serene environment and scenic beauty...",
              btnText: "Explore now Jibhi",
            },
          ].map(({ img, title, desc, btnText }, idx) => (
            <div
              key={idx}
              className="w-full md:w-[26vw] text-black rounded-lg shadow-lg p-4 bg-white"
            >
              <img src={img} alt={title} className="rounded-2xl mb-2 w-full" />
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-sm mb-4">{desc}</p>
              <button className="text-white w-full rounded-full bg-[#043271] p-2">
                {btnText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 lg:px-10 py-10 gap-10 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bluehills})` }}
      >
        {/* Newsletter Form */}
        <div className="text-white rounded-lg w-full lg:w-[40%] p-4 lg:p-6">
          <h2 className="text-xl font-semibold mb-4">
            Signup for Himachal tourism Monthly newsletter
          </h2>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-white" htmlFor="name">
                Name
              </label>
              <input
                className="bg-transparent border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-full"
                type="text"
                id="name"
                placeholder="Enter your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white" htmlFor="email">
                Email
              </label>
              <input
                className="bg-transparent border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-full"
                type="email"
                id="email"
                placeholder="Enter your Email"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black w-full rounded p-2 hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Quick Links */}
        <div className="text-white flex flex-wrap justify-around w-full lg:w-[55%] gap-6">
          {[
            {
              title: "Quick links",
              items: [
                "Home",
                "Destinations",
                "Activities",
                "How to reach",
                "Tours and packages",
              ],
            },
            {
              title: "About us",
              items: [
                "About Himachal Tourism",
                "What we do",
                "Our story",
                "Why choose us",
                "Contact us",
              ],
            },
            {
              title: "Customer support",
              items: [
                "Travel Insurance",
                "FAQs",
                "Cancellation policy",
                "Testimonials",
                "Call support",
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="min-w-[140px]">
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="list-disc list-inside space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="hover:cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Background Text */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 leading-none text-gray-500 font-bold opacity-60 text-4xl md:text-6xl lg:text-[70px] text-center">
          Himachal Tourism
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
