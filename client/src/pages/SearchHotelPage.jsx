import React, { useState, useEffect, useRef } from "react";
import HotelCard from "../components/HotelCard";
import hotelsData from "../hotels.json";

export default function SearchHotelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(hotelsData);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const filtered = hotelsData.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHotels(filtered);
    }, 80);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  return (
    <div className="w-[100vw] h-[100vh] mt-5 flex flex-col items-center bg-gray-50">
      <div className="flex">
        <p className="text-3xl  mt-1 w-[25vw] text-green-500">Search Hotel here:</p>
        <input
          type="text"
          placeholder="Search hotels by its name..."
          className="w-full max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full max-w-[100vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
