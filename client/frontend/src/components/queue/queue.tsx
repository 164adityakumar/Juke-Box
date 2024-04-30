import { wsManager } from "@/utils/ws";
import { useEffect, useState } from "react";
import API from "../../utils/api";
import { useRecoilState } from "recoil";
import { RoomId } from "@/pages/room/create";
import axios from "axios";
import { newQueuesong } from "../search/atom";
import { ScrollArea } from "../ui/scroll-area";
import { get } from "http";
import { randomBytes } from "crypto";
import {  FinalQueueState } from "./atom";

export function Queue() {
    const [roomId] = useRecoilState(RoomId);
    const [newQsong] = useRecoilState(newQueuesong);
    const [getSongQueue, setgetSongQueue] = useState<any[]>([]);
    
    const [FinalQueue, setFinalQueue] = useRecoilState<any[]>(FinalQueueState);

    useEffect(() => {
        if (!roomId) {
            return;
        }

        axios.get(`${process.env.API_URL}/api/rooms/${roomId}/getQueue`).then(async (res) => {
            // setgetQueue(res.data);

            const fetchSongs = async () => {
                try {
                    // console.log(getQueue);
                    // console.log(res.data);
                    const songsData = await Promise.all(res.data.map(async (songId: string) => {
                        if (!songId || songId === "trigger") {
                            return null;
                        }
                        // console.log(songId);
                        return await API.getTrackfromId(String(songId));
                    }));
                    // console.log(songsData);

                    const QueueData = songsData
                        .filter((song: any) => song !== null)
                        .map((song: any) => ({
                            id: song.data.data[0].id,
                            name: song.data.data[0].name,
                            artist: song.data.data[0].artists.primary.map((artist: any) => artist.name).join(" · "),
                            image: [song.data.data[0].image[0].url, song.data.data[0].image[1].url, song.data.data[0].image[2].url],
                            duration: song.data.data[0].duration || 0,
                            plays: song.data.data[0].playCount || 0,
                            downloadUrl: song.data.data[0].downloadUrl[2].url,
                        }));

                    setgetSongQueue(QueueData as any);
                    setFinalQueue(QueueData as any);
                } catch (error) {
                    console.error("Error fetching songs:", error);
                }
            };

            fetchSongs();
        });
    }, [roomId]);


    useEffect(() => {
        if (newQsong && newQsong !== "trigger") {
            

            const fetchNewSong = async () => {
                const songResponse = await API.getTrackfromId(newQsong);
                const newSong = songResponse.data.data[0];
                const newSongData = {
                    id: newSong.id,
                    name: newSong.name,
                    artist: newSong.artists.primary.map((artist: any) => artist.name).join(" · "),
                    image: [newSong.image[0].url, newSong.image[1].url, newSong.image[2].url],
                    duration: newSong.duration || 0,
                    plays: newSong.playCount || 0,
                    downloadUrl: newSong.downloadUrl[2].url,
                };
                console.log(newSongData);
                setFinalQueue([...getSongQueue, newSongData]);
                setgetSongQueue([...getSongQueue, newSongData]);
            };

            fetchNewSong();
        }
    }, [newQsong]);

    // const tracksArr = Data.data.data.results.map((track: any) => ({
    //     id: track.id,
    //     name: track.name,
    //     artist: track.artists.primary.map((artist: any) => artist.name).join(" · "),
    //     image: [track.image[0].url,track.image[1].url,track.image[2].url] ,
    //     duration: track.duration || 0,
    //     plays: track.playCount || 0,
    // }));
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor((time % 60));
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const formatCount = (count: number) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        } else {
            return count.toLocaleString();
        }
    };
    return (
        <ScrollArea className="flex flex-col overflow-y-auto overflow-x-hidden border-x border-[#9898982d] h-full w-full  ">
            
            {FinalQueue.map((song: any, index: number) => (
                <div
                    key={randomBytes(4).toString("hex")}
                    className={`flex flex-row relative px-2 py-1.5 text-sm outline-none transition-transform hover:bg-accent hover:text-accent-foreground border-b   cursor-pointer w-full ${index === 0 ? 'bg-slate-800 border-slate-900' : 'bg-slate-950 border-slate-800'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                >
                    <img src={song.image[1]} alt={song.name} className="rounded-sm w-10 content-stretch aspect-square h-10" />
                  
                    <div className=" px-2 flex md:flex-row   flex-col justify-between md:items-center items-start w-[24vw] ">
                    <div className={`flex flex-col justify-between h-full  ${index === 0 ? 'w-[12vw]' : 'w-[14vw]'}`}>

                        <p className="wrapper songname-queue md:text-sm">{song.name}</p>
                        <p className="wrapper artist-queue md:text-xs text-[0.6rem] md:block hidden">
                            {song.artist}
                        </p>
                        </div>
                        <div className="text-slate-400 flex flex-row gap-8">
                        {index === 0 ? <div id="bars">
  <div className="bar"></div>
  <div className="bar"></div>
  <div className="bar"></div>
  <div className="bar"></div>
  <div className="bar"></div>
  <div className="bar"></div>
</div> : null}
                            {formatTime(song.duration)}
                            
                            </div>
                    </div>
                    
                </div>
            ))}

        </ScrollArea>
    );
}
