import { atom } from "recoil";
var bandname = require('bandname');

export const username = atom ({
    key: "username",
    default: bandname(),
})

export const avatarRefersh=atom({
    key:"avatarrefresh",
    default:false
})