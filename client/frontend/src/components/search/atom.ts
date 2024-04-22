import { atom } from "recoil";


export const data = atom<never[]>({
    key: "data",
    default: [],
});