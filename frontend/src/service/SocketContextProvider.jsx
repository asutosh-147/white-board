import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://whiteboardbackend-mca3.onrender.com");
const socketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [createRoom, setCreateRoom] = useState(false);
  return (
    <socketContext.Provider
      value={{
        socket,
        userName,
        setUserName,
        joinRoomId,
        setJoinRoomId,
        createRoom,
        setCreateRoom,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};
export const useSocketContext = () => useContext(socketContext);
