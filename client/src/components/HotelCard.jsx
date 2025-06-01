// import React from "react";
// import logo from "../assets/tiharahotel.jpg";

// const HotelCard = (hotel, id) => {
//   return (
//     <div className="w-[18vw] rounded-2xl overflow-hidden shadow-lg bg-white">
//       {/* Image slider (can be implemented with a library) */}
//       <div className="relative p-3">
//         <img
//           className="rounded-2xl transition-transform duration-500 hover:scale-110"
//           src={logo}
//           width={275}
//           alt="Hotel"
//         />
//         <div className="absolute top-[17vh] left-3 ">
//           {/* Placeholder for carousel controls */}
//           <button className="bg-white rounded-full px-2 shadow-md">❮</button>
//         </div>
//         <div className="absolute top-[17vh] right-3 ">
//           {/* Placeholder for carousel controls */}
//           <button className="bg-white rounded-full px-2 shadow-md">❯</button>
//         </div>
//       </div>

//       <div className="p-2">
//         <h2 className="text-lg font-600">{hotel.name}</h2>
//         <p className="text-gray-600 text-sm font-600">
//           Hadimba temple road, mall road
//         </p>

//         <div className="flex items-center ">
//           <span className="text-lg font-bold text-green-700">
//             ₹ 4,500/night
//           </span>
//           <span className="line-through text-gray-400 ml-2">₹ 5,300</span>
//         </div>

//         <p className="font-bold ">1 Room - 2 Guests</p>
//         <div className="flex items-center">
//           <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
//           <span className="text-gray-500 ml-2">(69)</span>
//         </div>

//         <div className="flex justify-between mt-1">
//           <button className="bg-white transition-transform duration-500 hover:scale-110 text-black px-4 py-1 rounded-full shadow-lg">
//             View details
//           </button>
//           <button className="bg-yellow-500 text-blackpx-4 transition-transform duration-500 hover:scale-110 px-4 py-2 rounded-full">
//             Book now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelCard;
import React from "react";
import logo from "../assets/tiharahotel.jpg";

const HotelCard = ({ hotel }) => {
  return (
    <div className="flex w-[22vw] hover:border-red-300 border-2 hover:cursor-pointer rounded-2xl shadow-md bg-white h-[25vh]">
      {/* Image Section */}

      <div className="rounded-xl items-center flex">
        <img
          src={logo||hotel.image}
          alt={hotel.name}
          className=" h-[20vh] w-[10vw] object-contain rounded-xl"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col my-auto truncate">
        <div>
          <h2 className="text-lg font-semibold">{hotel.name}</h2>
          <p className="text-gray-600 text-sm">{hotel.location}</p>
          <div className="flex items-center mt-1">
            <span className="text-base font-bold text-green-700">
              {hotel.discountedPrice}/day
            </span>
            <span className="line-through text-gray-400 ml-2">
              {hotel.originalPrice}
            </span>
          </div>
          <p className="text-sm mt-1">{hotel.roomInfo}</p>
        </div>

        <div className="flex items-center">
          <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
          <span className="text-gray-500 ml-2">({hotel.reviews})</span>
        </div>

        <div className="flex justify-between mt-2">
          <button className="bg-white hover:border-green-500 border-2 transition-transform duration-300 hover:scale-105 text-black px-3 py-1 rounded-full shadow">
            View details
          </button>
          <button className="bg-yellow-500 hover:border-green-500 border-2 hover:bg-yellow-400 text-black px-4 py-1 rounded-full transition-transform duration-300 hover:scale-105">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
