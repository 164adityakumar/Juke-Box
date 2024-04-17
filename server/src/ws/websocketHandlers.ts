import { handleJoin, handleMessage, handleClose } from './messageHandlers';
import crypto from 'crypto';


export const handleConnection = async (ws, req) => {
    const userId = crypto.randomBytes(16).toString('hex');
    console.log("New connection", userId);
    ws.on("message", async (message: string) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            handleJoin(userId, data, ws);
        }

        if (data.type === "message") {
            handleMessage(userId, data);
        }
    });
    ws.on("close", () => {
        handleClose(userId);
    })
};