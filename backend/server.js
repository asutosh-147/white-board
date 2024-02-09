const express = require("express");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
    console.log('socket connected :',socket.id);
    socket.on("join-room",(roomId)=>{
      socket.join(roomId);
      console.log(roomId);
    })
    socket.on("mouse-moved",(data,roomId)=>{
      socket.to(roomId).emit("mouse-moved",data);
    })
    socket.on("mouse-left",(visibility,roomId)=>{
      socket.to(roomId).emit("mouse-left",visibility)
    })
    socket.on("mouse-entered",(visibility,roomId)=>{
      socket.to(roomId).emit("mouse-entered",visibility)
    })
    socket.on("canvas-data",(canvasImage,roomId)=>{
      socket.to(roomId).emit("canvas-data",canvasImage);
    })
    socket.on("clear-canvas",(roomId)=>{
      socket.to(roomId).emit("clear-canvas");
    })
    console.log(io.engine.clientsCount);
});
