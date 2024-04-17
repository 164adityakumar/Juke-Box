const dotenv = require('dotenv');
const { createClient } = require('redis');
import type { RedisClientType } from "redis";
dotenv.config();

export class RedisSubscriptionManager {
    private static instance: RedisSubscriptionManager;
    private subscriber: RedisClientType;
    public publisher: RedisClientType;
    private subscriptions: Map<string, string[]>;
    private reverseSubscriptions: Map<string, { [userId: string]: { userId: string; ws: any; } }>;

    private constructor() {
        // Provide the connection details for your cloud Redis server
        this.subscriber = createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
        });
        this.publisher = createClient({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD
        });

    
        this.subscriber.on('error', (err) => {
            console.error('Subscriber error:', err);
        });
        this.publisher.on('error', (err) => {
            console.error('Publisher error:', err);
        });

        
        // Initialize other properties
        this.subscriptions = new Map<string, string[]>();
        this.reverseSubscriptions = new Map<string, { [userId: string]: { userId: string; ws: any; } }>();
    }



    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisSubscriptionManager();
        }
        return this.instance;
    }

    createRoom(roomId: string, userId: string) {
        // Check if the room already exists
        if (this.subscriptions.has(roomId)) {
            throw new Error('Room already exists');
        }

        // Create a new room
        this.subscriptions.set(roomId, [userId]);
    }
    getRoomUsers(roomId: string) {
        return this.reverseSubscriptions.get(roomId) || {};
    }
    subscribe(userId: string, room: string, ws: any) {
        this.subscriptions.set(userId, [
            ...(this.subscriptions.get(userId) || []),
            room,
        ]);

        this.reverseSubscriptions.set(room, {
            ...(this.reverseSubscriptions.get(room) || {}),
            [userId]: {userId: userId, ws},
        });

        if (Object.keys(this.reverseSubscriptions.get(room) || {}).length === 1) {
            console.log(`subscribing message from ${room}`);
            // This is the first subscriber to this room
            this.subscriber.subscribe(room, (payload) => {
                try {
                    // const parsedPayload = JSON.parse(payload);
                    const subscribers = this.reverseSubscriptions.get(room) || {};
                    Object.values(subscribers).forEach(({ws}) =>
                        ws.send(payload)
                    );
                } catch (e) {
                    console.error("erroneous payload found?");
                }
            });
        }
    }

    unsubscribe(userId: string, room: string) {
        this.subscriptions.set(
            userId,
            this.subscriptions.get(userId)?.filter((x) => x !== room) || []
        );
        if (this.subscriptions.get(userId)?.length === 0) {
            this.subscriptions.delete(userId);
        }
        delete this.reverseSubscriptions.get(room)?.[userId];
        if (
            !this.reverseSubscriptions.get(room) ||
            Object.keys(this.reverseSubscriptions.get(room) || {}).length === 0
        ) {
            console.log("unsubscribing from " + room);
            this.subscriber.unsubscribe(room);
            this.reverseSubscriptions.delete(room);
        }
    }

    addChatMessage(room: string, message: string) {
        this.publisher.publish(room, JSON.stringify({ type: "message", payload: { message } }));
    }
}

export default RedisSubscriptionManager.getInstance();
