import React from 'react'
import forest from '../assets/forest.jpg'
export default function Kullu() {
  return (
    <div className="items-center flex flex-col mt-5 w-[100vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
                <img
                  src={`${forest}`}
                  alt="Jibhi in Kullu"
                  className="rounded-2xl mb-2 w-[70vw] h-[80vh]"
                />
                <h2 className="text-3xl font-semibold mb-2">Jibhi in Kullu</h2>
                <p className="text-lg mb-4">
                  Jibhi is a captivating destination in the Kullu Valley known for
                  its serene environment and scenic beauty. It offers a perfect
                  getaway for those seeking tranquility amidst nature, with charming
                  wooden cottages and lush greenery.
                </p>
              </div>
  )
}
