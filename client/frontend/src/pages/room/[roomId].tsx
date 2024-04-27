import { Queue } from "@/components/queue/queue";
import { Search } from "@/components/search/search";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Player } from "@/components/player/player";
import { AudioPlayer } from "@/components/player/audio_player";

export default function Room() {
  return (
    <div className="gradient-background h-[100vh] grid grid-cols-12">
      <div className="col-start-1 col-span-3  h-[100vh] border-r-2">
        <Queue />
      </div>
      <div className="col-start-4 col-end-9 flex flex-col justify-between h-[100vh]">
        <div className="relative z-50">
          <Search />
        </div>
        <AudioPlayer />
      </div>
      <div className="col-start-9 col-span-4 border-l-2"></div>
    </div>
  );
}
