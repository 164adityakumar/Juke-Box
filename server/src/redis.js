import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.REDIS_PORT;

export const client = createClient({
    password: process.env.REDIS_PASSWORD ,
    socket: {
        host: process.env.REDIS_HOST ,
        port: Number(port) ,
    }
});