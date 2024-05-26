const roomrouter=require('express').Router()
const { handleJoin, handleClose } = require("../../ws/messageHandlers");
const { RedisSubscriptionManager } = require("../../redis");
const cors = require('cors');

roomrouter.use(cors({
    origin: '*', // replace with your client's origin in production
  }));
// Route for creating a room
roomrouter.post('/create', (req, res) => {
    const roomId = req.body.roomId;
    RedisSubscriptionManager.getInstance().createRoom(roomId);
    res.send('Room created with id: ' + roomId);
});

roomrouter.get('/:roomId/getQueue', (req, res) => {
    const roomId = req.params.roomId;
    const queue = RedisSubscriptionManager.getInstance().getSongQueue(roomId);
    res.send(queue    );
});

module.exports = roomrouter;