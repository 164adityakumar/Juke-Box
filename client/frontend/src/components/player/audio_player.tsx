import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useRecoilState } from 'recoil';
import { FinalQueueState } from '../queue/atom';
var Peer = require('simple-peer')

export function AudioPlayer() {
    const [songs, setSongs] = useRecoilState<any[]>(FinalQueueState);
    const [currentSong, setCurrentSong] = useState(songs[0]
        
    );



    const handleSongEnd = () => {
        if (songs.length === 0) {
            return;
        }

        const nextSong = songs[1];
        setCurrentSong(nextSong);
        setSongs(songs.slice(1));
    };


    return (
        <div>
            {songs.length === 0 ? (
                // Queue is empty, show a message or placeholder
                <p>No songs in the queue</p>
            ) : (
                <ReactAudioPlayer
                    style={{
                        borderRadius: "0px",
                        width: "100%",
                    }}
                    src={currentSong.downloadUrl || ""}
                    autoPlay
                    onEnded={handleSongEnd}
                    controls
                
                />
            )}
        </div>
    );
}