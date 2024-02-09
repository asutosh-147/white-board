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
    // socket.on("join-room",(roomId)=>{
    //   socket.join(roomId);
    // })
    socket.on("mouse-moved",(data)=>{
      socket.broadcast.emit("mouse-moved",data);
    })
    socket.on("mouse-left",(visibility)=>{
      socket.broadcast.emit("mouse-left",visibility)
    })
    socket.on("mouse-entered",(visibility)=>{
      socket.broadcast.emit("mouse-entered",visibility)
    })
    socket.on("canvas-data",(canvasImage)=>{
      socket.broadcast.emit("canvas-data",canvasImage);
    })
    socket.on("clear-canvas",()=>{
      socket.broadcast.emit("clear-canvas");
    })
    console.log(io.engine.clientsCount);
});
