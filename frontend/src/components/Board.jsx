import React, { useState, useRef, useEffect } from "react";

import { LuMousePointer2 } from "react-icons/lu";
import _debounce from "lodash/debounce";
import { useSocketContext } from "../service/SocketContextProvider";
import ToolBar from "./ToolBar";
import RoomIdCard from "./RoomIdCard";
const Board = ({ userName, RoomId }) => {
  const initialized = useRef(false);
  const { socket } = useSocketContext();
  const [cursor, setCursor] = useState({ x: null, y: null });
  const [nextCursor, setNextCursor] = useState(null);
  const [visible, setVisible] = useState(false);

  var prevX = nextCursor?.x;
  var prevY = nextCursor?.y;

  useEffect(() => {
    const joinRoom=()=>{
      socket.emit("join-room",RoomId);
    }
    if(!initialized.current){
      initialized.current=true;
      joinRoom();
    }
  }, [])
  
  //cursour hover
  socket.on("mouse-moved", (data) => {
    setNextCursor(data);
  });
  socket.on("mouse-left", (visibility) => {
    setVisible(visibility);
  });
  socket.on("mouse-entered", (visibility) => {
    setVisible(visibility);
  });
  const debouncedMouseMove = _debounce((x, y) => {
    if (x != prevX || y != prevY) {
      socket.emit("mouse-moved", { x, y },RoomId);
    }
  }, 100);

  const HandleMouseLeave = () => {
    setTimeout(() => {
      socket.emit("mouse-left", false,RoomId);
    }, 50);
  };
  const HandleMouseEnter = () => {
    setTimeout(() => {
      socket.emit("mouse-entered", true, RoomId);
    }, 50);
  };

  // Draw on canvas
  const canvasRef = useRef(null);
  const [eraserMode, setEraserMode] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = brushSize;
    setContext(ctx);
  }, [brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    const e = nativeEvent;
    var x = e.clientX - e.target.offsetLeft;
    var y = e.clientY - e.target.offsetTop;
    const withinBounds =
      x >= 0 &&
      x <= e.target.clientWidth &&
      y >= 0 &&
      y <= e.target.clientHeight;
    if (withinBounds) {
      setCursor({ x, y });
      debouncedMouseMove(x, y);
    }

    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    if (eraserMode) {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
    }
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };
  const finishDrawing = () => {
    context.closePath();
    var base64Image = canvasRef.current.toDataURL("image/png");
    setTimeout(() => {
      socket.emit("canvas-data", base64Image,RoomId);
    }, 100);
    setIsDrawing(false);
  };

  const handleClear = () => {
    if (context) {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      socket.emit("clear-canvas", RoomId);
    }
  };

  socket.on("canvas-data", (base64Image) => {
    var image = new Image();
    image.src = base64Image;
    image.onload = () => {
      context?.drawImage(image, 0, 0);
    };
  });
  socket.on("clear-canvas", () => {
    if (context) {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  });
  return (
    <div className="flex-col justify-center my-8 relative items-center">
      <RoomIdCard RoomId={RoomId}/>
      <ToolBar
        brushSize={brushSize}
        setEraserMode={setEraserMode}
        setBrushSize={setBrushSize}
        handleClear={handleClear}
      />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-4 shadow-md shadow-black border-black"
        onMouseEnter={HandleMouseEnter}
        onMouseLeave={HandleMouseLeave}
        onMouseMove={draw}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
      />
      <div
        className={`text-black absolute text-xl -translate-x-2/4 -translate-y-2/4`}
        style={{
          top: `${
            nextCursor?.y + canvasRef?.current?.getBoundingClientRect().top
          }px`,
          left: `${
            nextCursor?.x + canvasRef?.current?.getBoundingClientRect().left
          }px`,
          display: visible ? `block` : `none`,
        }}
      >
        <div className="relative">
          <LuMousePointer2 />
          <p className="text-sm absolute top-2 -right-10 p-2">{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
