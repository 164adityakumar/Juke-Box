import { data } from "./atom";
import { Input } from '@/components/ui/input';
import SpotifyAPI from '../../utils/api';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';

import React, { useEffect, useState } from 'react'; // Add missing import for React
import { wsManager } from '@/utils/ws';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "../ui/scroll-area";
import { time } from "console";

export function Search (){
    const [Data, setData] = useRecoilState(data);
    const [searchResults, setSearchResults] = useState([]); // Add state to store search results
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;

    const searchBtnHandler = {
        search: async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                const input = (e.target as HTMLFormElement).input.value;
                if (input) {
                    const { data } = await SpotifyAPI.trackSearch(accessToken!, input);
                    const tracksArr = [...data.tracks.items].map(track => {
                        return {
                            artist: track.artists[0].name,
                            id: track.id,
                            name: track.name,
                            images: track.album.images,
                            time: track.duration_ms

                        };
                    });
                    setSearchResults(tracksArr as never[]);
                    setData(tracksArr as never[]);
                }
            } catch (err) {
                console.log(err);
            }
        },
        close: (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
        }
    };
    


    const [showSearch, setShowSearch] = useState(false); // Add state to control visibility of search div

    const toggleSearch = () => {
        setShowSearch(true);
    };

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target && !target.closest(".results")) {
            setShowSearch(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="p-2 h-[100vh]">
            
            <form onSubmit={searchBtnHandler.search}>
                <div className="flex flex-row">
                    <Input type='search' placeholder='Search for a track' name='input' className=" rounded-tl-3xl rounded-bl-3xl bg-slate-800 border border-slate-600"  />
                    <Button type='submit' onClick={toggleSearch} className=" search rounded-none rounded-tr-3xl rounded-br-3xl">Search</Button>
                </div>
            </form>

            {showSearch && (
                <ScrollArea className="results flex flex-col h-[60vh] overflow-y-scroll relative  w-full z-50 overflow-hidden rounded-md border bg-popover  shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-slate-900 transition-colors " >
                    {searchResults.map((track: any) => (
                        <div key={track.id} onClick={() => wsManager.sendSongToBackend(track)} className="flex flex-row relative  rounded-sm px-2 py-1.5 text-sm outline-none transition-transform hover:bg-accent hover:text-accent-foreground border border-slate-800 cursor-pointer">
                            <img src={track.images[2].url} alt={track.name} className="rounded-sm" onClick={() => wsManager.sendSongToBackend(track)} />
                            <div className="px-2 flex flex-col justify-between py-[0.5px]">
                            <p className="songname">{track.name}</p>
                            <p className="artist"> {track.artist} ● {formatTime(track.time)}</p>
                            </div>

                        </div>
                       
                    ))}
                </ScrollArea>
            )}
            
        </div>
    );
    
}



