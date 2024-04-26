import { atom } from "recoil";

export const FinalQueueState = atom<any[]>({
    key: 'finalQueueState',
    default: [],
});