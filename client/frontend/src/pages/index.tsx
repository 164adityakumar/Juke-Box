import React from "react";
import { Vortex } from "../components/ui/vortex";

export default function Home() {
  
  console.log(process.env.API_URL)
  return (
    <div className=" mx-auto h-[100vh]  overflow-hidden">
    <Vortex
      backgroundColor="#29061d"
      className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      particleCount={1000}
    >
      <h2 className="Juke text-slate-200  text-7xl sm:text-8xl font-bold text-center">
        Juke Box
      </h2>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
     
      </div>
    </Vortex>
  </div>
  );
}
