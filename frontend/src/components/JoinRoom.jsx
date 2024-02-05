import React, { useState } from "react";
import { useSocketContext } from "../service/SocketContextProvider";
const JoinRoom = ({setHandleRoom}) => {
  const { userName, setUserName, joinRoomId, setJoinRoomId, setCreateRoom } =
    useSocketContext();
  const handleJoinRoom = () => {
    setCreateRoom(true);
  };
  return (
    <>
      <p className="font-bold text-2xl text-center mb-5 text-gray-800">
        Join Room
      </p>
      <div className="flex justify-center gap-3 w-full pb-4">
        <input
          type="text"
          id="room_id"
          className="w-3/5 h-10 rounded-md p-2 focus:outline-none focus:border-2 focus:border-black  text-center shadow-md"
          placeholder="Room Id"
          onChange={(e) => setJoinRoomId(e.target.value)}
          value={joinRoomId}
        />
        <input
          type="text"
          value={userName}
          className="w-3/5 text-gray-800 h-10 rounded-md p-2 focus:outline-none focus:border-2 focus:border-black text-center  shadow-md"
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          disabled={joinRoomId === ""}
          type="button"
          className="bg-black rounded-md text-white p-2 px-4 font-body hover:drop-shadow-lg hover:scale-110 transition-transform duration-300 tracking-wider disabled:bg-gray-500"
          onClick={handleJoinRoom}
        >
          Join
        </button>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="bg-black rounded-md text-white p-2 px-4 font-body hover:drop-shadow-lg hover:scale-110 transition-transform duration-300 tracking-wider disabled:bg-gray-500 mt-5 w-3/4"
          onClick={() => setHandleRoom(true)}
        >
          Create Room
        </button>
      </div>
    </>
  );
};

export default JoinRoom;
