import { handleJoin, handleMessage, handleClose } from './messageHandlers';

let counter = 0;
export const handleConnection = async (ws, req) => {
    const wsId = counter++;
    console.log("New connection", wsId);
    ws.on("message", async (message: string) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            handleJoin(wsId, data, ws);
        }

        if (data.type === "message") {
            handleMessage(wsId, data);
        }
    });
    ws.on("close", () => {
        handleClose(wsId);
    })
};