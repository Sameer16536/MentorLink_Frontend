
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
      const msg = JSON.parse(event.data);
      console.log("Message received:", msg);

      switch (msg.action) {
        case "joinRoom":
          console.log(`✅ Joined room: ${msg.data.roomId}`);
          break;

        default:
          console.warn("Unknown action:", msg.action);
      }
    };

    //  Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [roomId, isMentor]);

  return (
    <div className="p-4">
      Connecting to Room: <strong>{roomId}</strong>
    </div>
  );
};

export default VideoRoom;
