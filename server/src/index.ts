const express = require("express");
const http = require("http");
const ws = require("ws");
const WebSocketServer = ws.Server;
const dotenv = require('dotenv');
const morgan = require('morgan');

import { handleConnection } from "./ws/websocketHandlers";

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

export const users: { [key: string]: {
    room: string;
    ws: any;
} } = {};


wss.on("connection", handleConnection);


server.listen( port, () => {    // Changed from app.listen to server.listen
    console.log(`Server started on http://localhost:${port}`);
});