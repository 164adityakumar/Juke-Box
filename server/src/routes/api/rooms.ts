const roomrouter=require('express').Router()
const { handleJoin, handleClose } = require("../../ws/messageHandlers");
const { RedisSubscriptionManager } = require("../../redis");

// Route for creating a room
roomrouter.post('/create', (req, res) => {
    const roomId = req.body.roomId;
    RedisSubscriptionManager.getInstance().createRoom(roomId);
    res.send('Room created');
});

// Route for joining a room
roomrouter.post('/join', (req, res) => {
    const roomId = req.body.roomId;
    const userId = req.body.userId;
    const ws = req.body.ws;
    handleJoin(userId, { payload: { roomId } }, ws);
    res.send('Joined room');
});

// Route for leaving a room
roomrouter.post('/leave', (req, res) => {
    const userId = req.body.userId;
    handleClose(userId);
    res.send('Left room');
});

module.exports = roomrouter;