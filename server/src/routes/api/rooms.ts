const roomrouter=require('express').Router()
const { handleJoin, handleClose } = require("../../ws/messageHandlers");
const { RedisSubscriptionManager } = require("../../redis");

// Route for creating a room
roomrouter.post('/create', (req, res) => {
    const roomId = req.body.roomId;
    RedisSubscriptionManager.getInstance().createRoom(roomId);
    res.send('Room created with id: ' + roomId);
});

module.exports = roomrouter;