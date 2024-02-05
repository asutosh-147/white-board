import React, { useState } from "react";
import { useSocketContext } from "../service/SocketContextProvider";
const CreateRoom = ({setHandleRoom}) => {
  const { userName, setUserName, setJoinRoomId, setCreateRoom } =
    useSocketContext();
  const handleCreateRoom = () => {
    setCreateRoom(true);
    setJoinRoomId(String(Math.floor(1000 + Math.random() * 9000)));
  };
  return (
    <>
      <p className="font-bold text-2xl text-center mb-5 text-gray-800">
        Create Room
      </p>
      <div className="flex justify-center flex-wrap gap-3 w-full pb-2">
        <input
          type="text"
          value={userName}
          className="w-3/5 text-gray-800 h-10 rounded-md p-2 focus:outline-none focus:border-2 focus:border-black text-center  shadow-md"
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          type="button"
          disabled={userName === ""}
          className="bg-black rounded-md text-white p-2 px-4 font-body hover:drop-shadow-lg hover:scale-110 transition-transform duration-300 tracking-wider disabled:bg-gray-500"
          onClick={handleCreateRoom}
        >
          Create
        </button>
        <button
          className="bg-black rounded-md text-white p-2 px-4 font-body hover:drop-shadow-lg hover:scale-110 transition-transform duration-300 tracking-wider disabled:bg-gray-500 mt-5 w-3/4"
          onClick={() => setHandleRoom(false)}
        >
          Join Room
        </button>
      </div>
    </>
  );
};

export default CreateRoom;
