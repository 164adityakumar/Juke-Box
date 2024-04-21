import { Input } from '@/components/ui/input';
import SpotifyAPI from '../../utils/api';
import { Button } from '@/components/ui/button';
import { atom, useRecoilState } from 'recoil';

import React, { useEffect, useRef, useState } from 'react'; // Add missing import for React
import { wsManager } from '@/utils/ws';

export default function Room() {
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
                            images: track.album.images
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
    


    return (
        <div>
            <form onSubmit={searchBtnHandler.search}>
                <Input type='search' placeholder='Search for a song' name='input' />
                <Button type='submit'>Search</Button>
                <div>{searchResults.map((track: any) => (
                    <div key={track.id}>
                    <img src={track.images[2].url} alt={track.name} onClick={() => wsManager.sendSongToBackend(track)} />
                        <p>Artist: {track.artist}</p>
                        <p>Name: {track.name}</p>
                    </div>
                ))}</div>
            </form>
        </div>
    );
}

const data = atom<never[]>({
    key: "data",
    default: []
});