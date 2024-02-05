import React from "react";
import { FaEraser } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useState } from "react";

const SliderHandler = ({
  brushSize,
  setBrushSize,
  isHovering,
}) => {
  return (
    <div
      className="absolute -top-7 -left-2"
      style={{ display: isHovering ? "block" : "none" }}
    >
      <Slider
        size="small"
        sx={{ width: 100, color: "black" }}
        value={brushSize}
        onChange={(e, v) => setBrushSize(v)}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </div>
  );
};

const ToolBar = ({ handleClear, brushSize, setBrushSize, setEraserMode }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="flex justify-center items-center my-2 py-2">
      <button
        type="button"
        onClick={handleClear}
        className="rounded-full mx-2 text-2xl hover:shadow-xl"
      >
        <MdDelete />
      </button>
      <button
        onClick={()=>setEraserMode(true)}
        className="rounded-full mx-2 text-2xl hover:shadow-xl"
      >
        <FaEraser  />
      </button>
      <button
        onClick={()=>setEraserMode(false)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="rounded-full mx-2 text-xl hover:shadow-xl relative"
      >
        <FaPen />
        <SliderHandler brushSize={brushSize} setBrushSize={setBrushSize} isHovering={isHovering} />
      </button>
    </div>
  );
};

export default ToolBar;
