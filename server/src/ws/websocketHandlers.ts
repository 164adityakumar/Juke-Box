import { handleJoin, handleMessage, handleClose , handleAddToQueue} from './messageHandlers';
import crypto from 'crypto';


export const handleConnection = async (ws, req) => {
    const userId = crypto.randomBytes(16).toString('hex');
    console.log("New connection", userId);
    ws.on("message", async (message: string) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            handleJoin(userId, data, ws);
            console.log("Joining room", userId, data.payload.roomId);
        }
        if (data.type === "message") {
            handleMessage(userId, data);
        }
        if(data.type === "addToQueue") {
            handleAddToQueue(userId, data, ws);
            console.log("Adding to queue", userId, data.payload.songId);
        }
     
    });
    ws.on("close", () => {
        handleClose(userId);
    })
};