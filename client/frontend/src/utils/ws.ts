import { NextRouter, useRouter } from "next/router";

export class WebSocketManager {

    private ws: WebSocket | null = null;
    private listeners: { [type: string]: ((message: any) => void)[] } = {};

    private connect() {
        this.ws = new WebSocket(`${process.env.WS_URL}`);

        this.ws.onclose = () => {
            console.log('WebSocket closed');
            
        };
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
    sendTimeUpdate(roomId: string, currentTime: number) {
        if (!this.ws) {
            console.error('WebSocket is not connected');
            return;
        }

        this.ws.send(JSON.stringify({
            type: "timeUpdate",
            payload: {
                roomId: roomId,
                currentTime: currentTime
            }
        }));
    }
    sendControl(control: string, setPlaying: any,playing:any) {
        if (!this.ws) {
            console.error('WebSocket is not connected');
            return;
        }

        this.ws.send(JSON.stringify({
            type: "control",
            payload: {
                control: control,
            }
        }));

        this.ws.onmessage = async (message) => {
            const { type, payload } = JSON.parse(message.data);
            console.log('Message:', type, payload);
    if (type =='controlUpdate') {
        console.log('Control:', payload);
        if (payload === 'play') {
            setPlaying(true);
        }
        else if (payload === 'pause'){
            setPlaying(false);
            console.log(playing)
        }
    }
        };
    }
    on(type: string, listener: (message: any) => void) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    }

    off(type: string, listener: (message: any) => void) {
        if (!this.listeners[type]) {
            return;
        }
        this.listeners[type] = this.listeners[type].filter(l => l !== listener);
    }
}

export const wsManager = new WebSocketManager();