import React, { useState } from "react";

import Board from "./components/Board";
import RoomCard from "./components/RoomCard";
import { useSocketContext } from "./service/SocketContextProvider";

const App = () => {
  const { userName, joinRoomId, createRoom } = useSocketContext();
  return (
    <div className="">
      {!createRoom ? (
        <RoomCard />
      ) : (
        <div className="w-full flex items-center justify-center">
          <Board userName={userName} RoomId={joinRoomId} />
        </div>
      )}
    </div>
  );
};

export default App;
