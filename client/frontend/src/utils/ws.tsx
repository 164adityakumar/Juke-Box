import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

export const WSManager = () => {
    const [ws, setWs] = useState <WebSocket | null>(null);
    const [listeners, setListeners] = useState<{ [type: string]: ((message: any) => void)[] }>({});

    useEffect(() => {
        const ws = new WebSocket(`${process.env.WS_URL}`);
        ws.onopen = () => {
        setWs(ws);
        console.log('WebSocket connected');
        }

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    const handleRoomJoin = (roomId: string, router: NextRouter) => {
        if (ws) {
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    type: "join",
                    payload: {
                        roomId: roomId
                    }
                }));
            };

            ws.onmessage = async (event) => {
                const response = await event.data;
                await router.push(`/room/${roomId}`);
                console.log('Response:', response);
            };
        } else {
            console.error('WebSocket is not connected');
        }
    };

    const sendSongToBackend = (track: any, setnewSong: any, newSong: any) => {
        if (!ws) {
            console.error('WebSocket is not connected');
            return;
        }

        ws.send(JSON.stringify({
            type: "addToQueue",
            payload: {
                songId: track.id
            }
        }));

        ws.onmessage = async (event) => {
            const response = JSON.parse(await event.data);
            if (response.type === 'queueUpdate') {
                console.log('Response:', response.payload);
                await setnewSong(response.payload);
            }
        };
    };

    const sendTimeUpdate = (roomId: string, currentTime: number) => {
        if (!ws) {
            console.error('WebSocket is not connected');
            return;
        }

        ws.send(JSON.stringify({
            type: "timeUpdate",
            payload: {
                roomId: roomId,
                currentTime: currentTime
            }
        }));
    };

    const sendControl = (control: string, setPlaying: any, playing: any) => {
        if (!ws) {
            console.error('WebSocket is not connected');
            return;
        }

        ws.send(JSON.stringify({
            type: "control",
            payload: {
                control: control,
            }
        }));

        ws.onmessage = async (message) => {
            const { type, payload } = JSON.parse(message.data);
            console.log('Message:', type, payload);
            if (type == 'controlUpdate') {
                console.log('Control:', payload);
                if (payload === 'play') {
                    setPlaying(true);
                }
                else if (payload === 'pause') {
                    setPlaying(false);
                    console.log(playing)
                }
            }
        };
    };

    const on = (type: string, listener: (message: any) => void) => {
        if (!listeners[type]) {
            setListeners({ ...listeners, [type]: [] });
        }
        setListeners({ ...listeners, [type]: [...listeners[type], listener] });
    };

    const off = (type: string, listener: (message: any) => void) => {
        if (!listeners[type]) {
            return;
        }
        setListeners({ ...listeners, [type]: listeners[type].filter(l => l !== listener) });
    };

    return {
        handleRoomJoin,
        sendSongToBackend,
        sendTimeUpdate,
        sendControl,
        on,
        off
    };
};



