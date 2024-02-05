import React, { useState } from "react";
import { useSocketContext } from "../service/SocketContextProvider";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
const RoomCard = () => {
  const [handleRoom, setHandleRoom] = useState(true);

  return (
    <div className="bg-gray-300 border-zinc-800 border-0 w-400 mx-auto p-6 my-44 rounded-lg drop-shadow-2xl">
      {handleRoom ? (
        <CreateRoom setHandleRoom={setHandleRoom} />
      ) : (
        <JoinRoom setHandleRoom={setHandleRoom} />
      )}
    </div>
  );
};

export default RoomCard;
