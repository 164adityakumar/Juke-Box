
const {RedisSubscriptionManager} = require("../redis");
import {rooms, users} from "../index";

export const handleJoin = async(userId, data, ws) => {
    if (!ws) {
        throw new Error('WebSocket is not defined');
    }

    users[userId] = {
        room: data.payload.roomId,
        ws
    };

    rooms[data.payload.roomId] ={
        users: [userId],
        queue: []
    }


    await RedisSubscriptionManager.getInstance().subscribe(userId.toString(), data.payload.roomId, ws);

    // Get the number of users in the room
    const roomUsers = RedisSubscriptionManager.getInstance().getRoomUsers(data.payload.roomId);
    const numUsers = Object.keys(roomUsers).length;

    // Send the number of users in the room to the client
    ws.send(JSON.stringify({
        type: "Joined",
        payload: `Joined room. There are now ${numUsers} users in the room.`,
    }));
};

export const handleMessage = async(userId, data) => {
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
    await RedisSubscriptionManager.getInstance().addChatMessage(roomId, message);

};

export const handleClose = (userId) => {
    RedisSubscriptionManager.getInstance().unsubscribe(userId.toString(), users[userId].room);
};

export const handleAddToQueue = async (userId, data, ws) => {
    if (!ws) {
        throw new Error('WebSocket is not defined');
    }
    const roomId = users[userId].room;
    const songId = data.payload.songId;

    // Add the song to the queue in Redis
    await RedisSubscriptionManager.getInstance().addSongToQueue(roomId, songId);

    // Notify all users in the room that a new song has been added to the queue
    const roomUsers = RedisSubscriptionManager.getInstance().getRoomUsers(roomId);
    for (const user of Object.values<any>(roomUsers)) {
        (user as any).ws.send(JSON.stringify({
            type: "queueUpdate",
            payload: songId
            
        }));
    }
};
