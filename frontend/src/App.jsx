import React, { useContext, useState } from "react";
import { LuMousePointer2 } from "react-icons/lu";
import { useSocketContext } from "./service/SocketContextProvider";
const App = () => {
  const { socket } = useSocketContext();
  const [cursor, setCursor] = useState({ x: null, y: null });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e) => {
    var x = e.clientX - e.currentTarget.offsetLeft;
    var y = e.clientY - e.currentTarget.offsetTop;
    const withinBounds =
      x >= 0 &&
      x <= e.currentTarget.clientWidth &&
      y >= 0 &&
      y <= e.currentTarget.clientHeight;
    if (withinBounds) {
      setCursor({ x, y });
      socket.emit("mouse-moved", cursor);
    }
  };
  return (
    <div>
      <div
        style={{ textAlign: "center" }}
        className="font-bold tracking-normal mt-5 pb-10 text-2xl"
      >
        WhiteBoard
      </div>
      <div
        className="w-400 h-400 bg-red-500 mx-auto border-8 border-black relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setVisible(false)}
        onMouseEnter={() => setVisible(true)}
      >
        <div
          className={`text-white absolute text-xl -translate-x-2/4 -translate-y-2/4`}
          style={{
            top: `${cursor.y}px`,
            left: `${cursor.x}px`,
            display: visible ? `block` : `none`,
          }}
        >
          <LuMousePointer2 />
        </div>
      </div>
    </div>
  );
};

export default App;
