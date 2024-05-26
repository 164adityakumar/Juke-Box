const express = require("express");
const http = require("http");
const ws = require("ws");
const WebSocketServer = ws.Server;
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

import { handleConnection } from "./ws/websocketHandlers";

const routes = require("./routes/router");
dotenv.config();

const app = express();
const port = 8080;

  const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `example.com`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
  };

app.use(routes);
app.use(allowCrossDomain);
app.use(cors({
    origin: '*',
    allowedHeaders: ['Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

const wss = new WebSocketServer({ server });

export const users: { [key: string]: {
    room: string;
    ws: any;
} } = {};

export const rooms: { [key: string]: {
    users: string[];
    queue: string[];
} } = {};



 
wss.on("connection", handleConnection);


server.listen( port, () => {    // Changed from app.listen to server.listen
    console.log(`Server started on http://localhost:${port}`);
});