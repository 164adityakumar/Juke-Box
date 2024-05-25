import { atom } from "recoil";

export const CurrentSongState = atom({
    key: 'currentSong',
    default: {},
});

export const Playerstate= atom({
    key: 'playerState',
    default: null,
})