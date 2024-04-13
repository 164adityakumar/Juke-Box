import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import {RedisSubscriptionManager} from "./redis";
import dotenv from "dotenv";
const router = express.Router()
const routes = require('./routes/master-router');
dotenv.config();


const app = express();
const port = 8080;

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

server.listen(port);