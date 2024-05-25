import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { FinalQueueState } from '../queue/atom';
import { CurrentSongState, Playerstate } from './atom';
import ReactAudioPlayer from 'react-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { wsManager } from '@/utils/ws';

export function AudioPlayer() {
    const [songs, setSongs] = useRecoilState<any[]>(FinalQueueState);
    const [currentSong, setCurrentSong] = useRecoilState<any>(CurrentSongState);
    const [playing, setPlaying] = useRecoilState(Playerstate);
    const audioComponent = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        console.log("Playing:", playing);
        if (audioComponent.current) {
            if (playing) {
                audioComponent.current.play();
            } else {
                audioComponent.current.pause();
            }
        }
    }, [playing]);

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
        <div className='audioplayer p-[1px]'>
            <audio
                ref={audioComponent}
                autoPlay
                src={currentSong?.downloadUrl || ""}
                onEnded={handleSongEnd}
                preload="auto"
                controls
                className='w-full'
                onPause={() => {wsManager.sendControl('pause',setPlaying,playing)}}
                onPlay={() => {wsManager.sendControl('play',setPlaying,playing)}}
                controlsList='nofullscreen noshare noplaybackrate nozoom noopenwith nocontextmenu noresumedisplay noseeking noremoteplayback' 
            />
        </div>
    );
}