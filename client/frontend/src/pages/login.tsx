import React from "react";
import { Vortex } from "../components/ui/vortex";
import { poppins } from "../utils/fonts";
import { FaSpotify } from "react-icons/fa";
import Router, { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    return (
    <div className=" mx-auto h-[100vh]  overflow-hidden">
    <Vortex
      backgroundColor="black"
      className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      particleCount={2000}
      rangeY={200}
      baseHue={250}
    >
      <h2 className="Juke text-white  text-7xl sm:text-8xl font-bold text-center">
        Juke Box
      </h2>
 
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
      <button className="bg-zinc-700  no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px  text-xs font-semibold leading-6  text-white inline-block" onClick={()=>{router.push("/room/create")}}>
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className={`relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950  py-2.5 px-4 ring-1 ring-white/10 ${poppins.className} text-slate-50 text-sm`}>
    <span>
      Let's Vibe in 
    </span>
    <svg
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
      </div>
    </Vortex>
  </div>
  );
}
