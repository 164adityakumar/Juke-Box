
const {RedisSubscriptionManager} = require("../redis");
import {users} from "../index";

export const handleJoin = (userId, data, ws) => {
    if (!ws) {
        throw new Error('WebSocket is not defined');
    }

    users[userId] = {
        room: data.payload.roomId,
        ws
    };
    RedisSubscriptionManager.getInstance().subscribe(userId.toString(), data.payload.roomId, ws);

    // Get the number of users in the room
    const roomUsers = RedisSubscriptionManager.getInstance().getRoomUsers(data.payload.roomId);
    const numUsers = Object.keys(roomUsers).length;

    // Send the number of users in the room to the client
    ws.send(JSON.stringify({
        type: "info",
        payload: {
            message: `Joined room. There are now ${numUsers} users in the room. Room users: ${JSON.stringify(roomUsers)}`
        }
    }));
};

export const handleMessage = (userId, data) => {
    const roomId = users[userId].room;
    const message = data.payload.message;
    Object.keys(users).forEach((userId) => {
        if (users[userId].room === roomId) {
            users[userId].ws.send(JSON.stringify({
                type: "message",
                payload: {
                    message
                }
            }));
        }
    })
    RedisSubscriptionManager.getInstance().addChatMessage(roomId, message);

};

export const handleClose = (userId) => {
    RedisSubscriptionManager.getInstance().unsubscribe(userId.toString(), users[userId].room);
};