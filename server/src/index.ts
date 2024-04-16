const express = require("express");
const http = require("http");
const ws = require("ws");
const RedisSubscriptionManager = require("./redis");
const WebSocketServer = ws.Server;
const dotenv = require('dotenv');
const morgan = require('morgan');

const routes = require("./routes/router");
dotenv.config();

const app = express();
const port = 8080;

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(routes);


const wss = new WebSocketServer({ server });

const users: { [key: string]: {
    room: string;
    ws: any;
} } = {};


let counter = 0;

wss.on("connection", async (ws, req) => {
    const wsId = counter++;
    console.log("New connection", wsId);
    ws.on("message", async (message: string) => {
        ws.send(`Hello, you sent a ${message}`);

        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            users[wsId] = {
                room: data.payload.roomId,
                ws
            };
            RedisSubscriptionManager.getInstance().subscribe(wsId.toString(), data.payload.roomId, ws);
        }

        if (data.type === "message") {
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
        }
    });
    ws.on("close", () => { // Changed from "disconnect" to "close"
        RedisSubscriptionManager.getInstance().unsubscribe(wsId.toString(), users[wsId].room);
    })
});

server.listen( port, () => {    // Changed from app.listen to server.listen
    console.log(`Server started on http://localhost:${port}`);
});