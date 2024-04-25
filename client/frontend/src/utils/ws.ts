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
                    type: "join",
                    payload: {
                        roomId: roomId
                    }
                }));
            };

            this.ws.onmessage = async (event) => {
                const response =await event.data;
                await router.push(`/room/${roomId}`);
                console.log('Response:', response);
            };
        } else {
            console.error('WebSocket is not connected');
        }
    }

sendSongToBackend(track: any, setnewSong: any, newSong: any) {
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

    this.ws.onmessage = async (event) => {
        const response = JSON.parse(await event.data);
        if (response.type === 'queueUpdate') {
            console.log('Response:', response.payload);
            await setnewSong(response.payload);
        }
    };
    }
}

export const wsManager = new WebSocketManager();