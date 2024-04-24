import { Input } from '@/components/ui/input';
import API from '../../utils/api';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';

import React, { useEffect, useState } from 'react'; 
import { wsManager } from '@/utils/ws';

import { ScrollArea } from "../ui/scroll-area";
import { data ,newQueuesong} from './atom';


export function Search (){
    const [Data, setData] = useRecoilState(data);
    const [newsong, setNewsong] = useRecoilState(newQueuesong);
    const [searchResults, setSearchResults] = useState([]); // Add state to store search results
    
    const searchBtnHandler = {
        search: async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
                const input = (e.target as HTMLFormElement).input.value;
                if (input) {
                    const response = await API.trackSearch(input);
                    // console.log(response.data.data.results);
                    if (response.data.data.results) {
                        const tracksArr = response.data.data.results.map((track: any) => ({
                            id: track.id,
                            name: track.name,
                            artist: track.artists.primary.map((artist: any) => artist.name).join(" · "),
                            image: [track.image[0].url,track.image[1].url,track.image[2].url] ,
                            duration: track.duration || 0, 
                            plays: track.playCount || 0,
                        }));
    
                        setSearchResults(tracksArr);
                        setData(tracksArr);
                    } else {
                        console.error("Invalid response format");
                    }
                }
            
        },
        close: (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
        }
    };
    


    const handleSongClick = async (track: any) => {
        await wsManager.sendSongToBackend(track, setNewsong,newsong);
    }


    useEffect(() => {
        console.log('newSong:', newsong);
    }, [newsong]);


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
        <div className="p-2 ">
            
            <form onSubmit={searchBtnHandler.search}>
                <div className="flex flex-row">
                    <Input type='search' placeholder='Search for a track' name='input' className=" rounded-tl-3xl rounded-bl-3xl bg-gradient-to-r from-slate-700 from-10%  via-slate-800 via-50%  to-slate-700 to-100%  border border-slate-600"  />
                    <Button type='submit' onClick={toggleSearch} className=" search rounded-none rounded-tr-3xl rounded-br-3xl">Search</Button>
                </div>
            </form>

            {showSearch && (
                <ScrollArea className="results flex flex-col h-[60vh] overflow-y-scroll relative  w-full z-50 overflow-hidden rounded-md border bg-popover  shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-slate-900 transition-colors " >
                    {searchResults.map((track: any) => (
                        <div key={track.id} onClick={() =>{ handleSongClick(track)}} className="flex flex-row relative px-2 py-1.5 text-sm outline-none transition-transform hover:bg-accent hover:text-accent-foreground border border-slate-800 cursor-pointer">
                            <img src={track.image[1]} alt={track.name} className=" rounded-sm w-12" />
                            <div className="px-2 flex flex-col justify-between ">
                                <p className="songname">{track.name}</p>
                                <p className="artist"> {track.artist} · {formatTime(track.duration)} · {formatCount(track.plays)}</p> 
                            </div>
                            {/* {JSON.stringify(Data)} */}
                            {/* {track.image} */}
                        </div>
                    ))}
                </ScrollArea>
            )}
            
        </div>
    );
    
}




