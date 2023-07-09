const express = require("express");
const app = express();
const cors = require("cors");

const http = require("http").Server(app);
const PORT = 5001;

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("joinRoom", (roomCode) => {
    console.log(`A user ${socket.id} joined the room ${roomCode}`);
    socket.join(roomCode);
  });
  socket.on("disconnect", () => {
    lyricsData = {
      emptyAnswers: [],
      removedWordArray: [],
      flatSplitByWords: [],
      excludeIndexes: [],
      chunkSizesOfCopy: [],
    };
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });

  //Whiteboard - mini app
  socket.on("draw", (data, roomCode) => socket.to(roomCode).emit("draw", data));
});

app.get("/api", (req, res) => {
  res.json(lyricsData);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
