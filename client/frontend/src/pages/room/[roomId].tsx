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
    <div className=" h-[100vh] flex flex-col ">
      <div className=" navbar-bg flex flex-row border-b border-slate-950">
      <div className="w-[27%]"></div>

        <div className="w-[38%]">        <Search />
</div>
<div className="w-[30%]"></div>
      </div>
      <div className=" h-full flex flex-row ">
      <div className=" h-full w-[35%] ">
          <Queue />
        </div>
        <div className=" w-auto flex flex-col h-full p-2 border-r-2">
          <Player />
        </div>
        <div className="w-[45%]">

        </div>
        
      </div>
      <div className="border">
        <AudioPlayer />
      </div>
    </div>
  );
}
