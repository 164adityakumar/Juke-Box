import { atom } from "recoil";


export const data = atom<never[]>({
    key: "Data",
    default: [],
});

export const newQueuesong =atom<string>({
    key: "newQueuesong",
    default: "",
})
