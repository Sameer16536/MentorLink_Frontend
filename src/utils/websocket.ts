import { join } from "path";
import { useEffect, useRef } from "react";

interface VideoRoomProps {
  roomId: string;
  isMentor: boolean;
}

const webSocketUrl = process.env.NEXT_PUBLIC_WS_URL;
if (!webSocketUrl) {
  throw new Error("NEXT_PUBLIC_WS_URL is not defined in environment variables");
}

const VideoRoom = ({ roomId, isMentor }: VideoRoomProps) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    //Open connection
    socketRef.current = new WebSocket(webSocketUrl);

    // Handle connection open
    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");

      // Join the room
      const joinPayload = {
        action: "joinRoom",
        data: {
          roomId,
          isMentor,
        },
      };
      socketRef.current?.send(JSON.stringify(joinPayload));
    };

    // Handle incoming messages
    socketRef.current.onmessage = (event) => {
                
    }

  }, [roomId, isMentor]);
};


export default VideoRoom;