import { Queue } from "@/components/queue/queue";
import { Search } from "@/components/search/search";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Player } from "@/components/player/player";
import { AudioPlayer } from "@/components/player/audio_player";
import Image from "next/image";

export default function Room() {
  return (
    <div className="gradient-background h-[100vh] grid grid-cols-12">
      <div className="col-start-1 col-span-3  h-[100vh] border-r-2 flex flex-col justify-between">
        <div
    //      style={{background:
    //   "linear-gradient(132deg, rgba(55, 70, 132, 0.79) 0%, rgba(64, 62, 119, 0.883) 20%, rgb(43, 54, 98) 70%, rgba(44, 62, 133, 0.862)",
    // borderBottom: "solid rgba(255, 255, 255, 0.06)",
    // }} 
    className="logo-background  h-14 text-center  flex flex-row -ml-5 justify-center">
      <Image src="/logo.png" alt="logo" width={65} height={20} className=" scale-[.8] opacity-80" />
      <h1>JUKEBOX</h1>
      </div>
        <div className="flex flex-col justify-between">
        <Queue />
        <div style={{background:
      "linear-gradient(132deg, rgba(69, 69, 69, 0.222) 0%, rgba(62, 62, 62, 0.425) 20%, rgba(43,54,98,0.79) 70%, rgba(43,54,98,0.79)",
    borderTop: "solid rgba(255, 255, 255, 0.06)",
    borderBottom: "solid rgba(255, 255, 255, 0.06)",
    }} className="bg-[#2b3662ca] inline-block h-14">
        </div>
        </div>
      </div>
      <div className="col-start-4 col-end-9 flex flex-col justify-between h-[100vh]">
        <div className="relative z-50">
          <Search />
        </div>
        <AudioPlayer />
      </div>
      <div className="col-start-9 col-span-4 border-l-2 flex flex-col justify-between">
        <div></div>
      <div style={{background:
      "linear-gradient(132deg, rgba(43,54,98,0.79) 0%, rgba(43,54,98,0.79) 20%, rgba(81, 81, 81, 0.303) 70%, rgba(91, 91, 91, 0.146)",
    borderTop: "solid rgba(255, 255, 255, 0.06)",
    borderBottom: "solid rgba(255, 255, 255, 0.06)",
    }} className="bg-[rgba(43,54,98,0.79)] inline-block h-14">
        
</div>
      </div>
    </div>
  );
}
