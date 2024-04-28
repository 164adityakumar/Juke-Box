import { Queue } from "@/components/queue/queue";
import { Search } from "@/components/search/search";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Player } from "@/components/player/player";
import { AudioPlayer } from "@/components/player/audio_player";
import Image from "next/image";
import { Vortex } from "@/components/ui/vortex";

export default function Room() {
  return (
    <div className=" h-[100vh] flex flex-row">
      <div className="z-50 navbar-bg flex flex-col items-center border-b border-slate-950  fixed top-0 left-0 right-0">
        {/* <div className="w-[34%]"></div> */}

        <div className="w-[45%]">
          {" "}
          <Search />
        </div>
        <div className="w-[30%]"></div>
      </div>
      <div className=" h-full w-full  flex flex-row pt-[3.22rem] pb-[3.58rem] ">
        <div className="flex flex-col m-2  rounded-[2.5rem] py-[1.5vw] gradient-background">
          <Player />
        </div>
        <div className=" h-full  w-[40%] ">
          <Queue />
        </div>

        <div className="w-[40%]"></div>
      </div>
      <div className="border bottom-0 left-0 right-0 flex flex-col fixed">
        <AudioPlayer />
      </div>
    </div>
  );
}
