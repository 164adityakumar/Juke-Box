import { NextRouter } from "next/router";

export class WebSocketManager {
    private ws: WebSocket | null = null;

    private connect() {
        this.ws = new WebSocket(`${process.env.WS_URL}`);
    }

    handleRoomJoin(roomId: string, router: NextRouter) {
        this.connect();

        if (this.ws) {
            this.ws.onopen = () => {
                this.ws?.send(JSON.stringify({
                    type: 'join',
                    payload: {
                        roomId: roomId
                    }
                }));
            };

            this.ws.onmessage = async (event) => {
                const response = await event.data;
                console.log('Response:', response);
                router.push(`/room/${roomId}`);
            };
        } else {
            console.error('WebSocket is not connected');
        }
    }

    sendSongToBackend(track: any) {
        if (!this.ws) {
            console.error('WebSocket is not connected');
            return;
        }

        this.ws.send(JSON.stringify({
            type: "addToQueue",
            payload: {
                songId: track.id
            }
        }));
    }

    getqueue(setData: any) {
        if (!this.ws) {
            console.error('WebSocket is not connected');
            return;
        }

        this.ws.send(JSON.stringify({
            type: "getQueue",
            payload: {}
        }));

        this.ws.onmessage = async (event) => {
            const response = await event.data;
            setData(response);
            console.log('Response:', response);
        };
    }
}

export const wsManager = new WebSocketManager();