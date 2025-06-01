import React from 'react'
import snowfall from '../assets/snowfall.jpg'
export default function Prasharlake() {
  return (
    <div className="items-center flex flex-col mt-5 w-[100vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
                <img
                  src={`${snowfall}`}
                  alt="Prashar Lake in Mandi"
                  className="rounded-2xl hover:cursor-pointer mb-2 w-[60vw]"
                />
                <h2 className="text-3xl font-semibold mb-2">
                  Prashar Lake in Mandi
                </h2>
                <p className="text-lg mb-4">
                  Prashar Lake is a beautiful lake situated in the Mandi district of
                  Himachal Pradesh, known for its stunning views and unique
                  surroundings. It is a serene spot for nature lovers and
                  adventurers alike, offering breathtaking landscapes and a tranquil
                  environment.
                </p>
                
              </div>
  )
}
