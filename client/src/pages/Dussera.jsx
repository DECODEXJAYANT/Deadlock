import React from 'react'
import kulludesh from '../assets/kulludesh.jpg'
export default function Dussera() {
  return (
   <div className="items-center flex flex-col mt-5 w-[100vw] text-black rounded-lg shadow-lg p-4 bg-white mx-2">
               <img
                 src={`${kulludesh}`}
                 className="rounded-2xl hover:cursor-pointer mb-2 w-[80vw]"
                 alt="Dussehra in Kullu"
               />
               <h2 className="text-3xl font-semibold mb-2">Dussehra in Kullu</h2>
               <p className="text-xl mb-4">
                 Kullu Dussehra is a unique week-long festival celebrated in the
                 Kullu Valley of Himachal Pradesh, starting on Vijayadashami.
                 Unlike the rest of India, effigies of Ravana are not burned here;
                 instead, the festival centers around the worship of Lord
                 Raghunath. Over 200 local deities arrive in vibrant processions at
                 Dhalpur Maidan, creating a divine congregation.
               </p>
               
             </div>
  )
}
