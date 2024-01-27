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
    socket.send("Hello");
    socket.on("mouse-moved",(data)=>{
      // console.log(data);
      socket.broadcast.emit("mouse-moved",data);
    })
    console.log(io.engine.clientsCount);
});
