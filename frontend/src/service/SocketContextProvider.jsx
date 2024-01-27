
import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");
const socketContext = createContext();


export const SocketContextProvider = ({ children }) => {
    return (
    <socketContext.Provider value={socket}>
        {children}
    </socketContext.Provider>
  )
}
export const useSocketContext = () => useContext(socketContext);


