import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { FinalQueueState } from '../queue/atom';
import { CurrentSongState } from './atom';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactAudioPlayer from 'react-audio-player';
var Peer = require('simple-peer')

export function AudioPlayer() {
    const [songs, setSongs] = useRecoilState<any[]>(FinalQueueState);
    const [currentSong, setCurrentSong] = useRecoilState<any>(CurrentSongState);
        
    if (songs.length > 0)
        setCurrentSong(songs[0]);

    const handleSongEnd = () => {
        if (songs.length === 0) {
            return;
        }

        const nextSong = songs[1];
        setCurrentSong(nextSong);
        setSongs(songs.slice(1));
    };

    return (
        <div  className='audioplayer p-[1px]'>
                        {/* {songs.length === 0 ? (
                            <p>No songs in the queue</p>
            ) : ( */}
                            <ReactAudioPlayer                                src={currentSong?.downloadUrl || ""}
                                            autoPlay
                                onEnded={handleSongEnd}
                                preload="auto"
                                controls
                                className='w-full
                                '
                                controlsList='nofullscreen noremoteplayback noshare noplaybackrate nozoom noopenwith nocontextmenu noresumedisplay noseeking noremoteplayback' 
                            />
                            
                        {/* )} */}
        </div>
    );
}
