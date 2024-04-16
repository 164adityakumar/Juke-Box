
const {RedisSubscriptionManager} = require("../redis");

import {users} from "../index";

export const handleJoin = (wsId, data, ws) => {
    users[wsId] = {
        room: data.payload.roomId,
        ws
    };
    RedisSubscriptionManager.getInstance().subscribe(wsId.toString(), data.payload.roomId, ws);
};

export const handleMessage = (wsId, data) => {
    const roomId = users[wsId].room;
    const message = data.payload.message;
    RedisSubscriptionManager.getInstance().addChatMessage(roomId, message);
    Object.keys(users).forEach((wsId) => {
        if (users[wsId].room === roomId) {
            users[wsId].ws.send(JSON.stringify({
                type: "message",
                payload: {
                    message
                }
            }));
        }
    })
};

export const handleClose = (wsId) => {
    RedisSubscriptionManager.getInstance().unsubscribe(wsId.toString(), users[wsId].room);
};