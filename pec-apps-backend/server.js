const express = require("express");
const http = require("http");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
//const { createNewRoomHandler, joinRoomHandler } = require("./handlers");

const PORT = process.env.PORT || 5002;

const app = express();
const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];

app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);
  if (room) {
    if (room.connectedUsers.length > 3) {
      return res.json({ roomExists: true, full: true });
    } else {
      return res.json({ roomExists: true, full: false });
    }
  } else {
    return res.json({ roomExists: false });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("_____________CONNECTION____________");
  console.log(`user connected ${socket.id}`);

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => {
    initializeConnectionHandler(data, socket);
  });

  socket.on("disconnect", () => {
    disconnectHandler(socket);
  });
});

const createNewRoomHandler = (data, socket) => {
  console.log("_____________CREATE ROOM_____________");

  const { identity } = data;

  console.log(`${identity} is creating new room`);
  const roomId = uuidv4();

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
  };

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };

  connectedUsers = [...connectedUsers, newUser];
  rooms = [...rooms, newRoom];

  console.log("_____________JOIN ROOM_____________");

  socket.join(roomId);
  console.log(`user joined room with ${roomId}`);

  socket.emit("room-id", { roomId });
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId } = data;

  if (roomId !== null) {
    const newUser = {
      identity,
      id: uuidv4(),
      socketId: socket.id,
      roomId,
      //onlyAudio,
    };

    // join room as user which just is trying to join room passing room id
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      room.connectedUsers = [...room.connectedUsers, newUser];

      // join socket.io room
      socket.join(roomId);

      // add new user to connected users array
      connectedUsers = [...connectedUsers, newUser];

      // emit to all users which are already in this room to prepare peer connection
      room.connectedUsers.forEach((user) => {
        if (user.socketId !== socket.id) {
          const data = {
            connUserSocketId: socket.id,
          };

          io.to(user.socketId).emit("conn-prepare", data);
        }
      });

      io.to(roomId).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
    }
  } else {
    socket.emit("room-id", { roomId: "not-available" });
  }
};

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-signal", signalingData);
};

const initializeConnectionHandler = (data, socket) => {
  const { connUserSocketId } = data;

  const initData = { connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-init", initData);
};

const disconnectHandler = (socket) => {
  const user = connectedUsers.find((user) => user.socketId === socket.id);

  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);
    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );
    socket.leave(user.roomId);
    io.to(room.id).emit("user-disconnected", { socketId: socket.id });
    if (room.connectedUsers.length > 0) {
      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
    } else {
      rooms = rooms.filter((r) => r.id !== room.id);
    }
  }
};

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
