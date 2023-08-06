const express = require("express");
const http = require("http");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

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
      return res.json({
        roomExists: true,
        full: true,
        roomType: room.roomType,
      });
    } else {
      return res.json({
        roomExists: true,
        full: false,
        roomType: room.roomType,
      });
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
  let roomId = uuidv4();

  console.log("CONNECTION:");
  console.log(`user (${roomId}) is connected  \n`);

  socket.emit("room-id", { roomId });

  socket.on("new-room-id", () => {
    roomId = uuidv4();
    socket.emit("room-id", { roomId });
  });

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket, roomId);
  });
  socket.on("create-new-only-room", (data) => {
    createNewOnlyRoomHandler(data, socket, roomId);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });

  socket.on("join-only-room", (data) => {
    joinOnlyInRoomHandler(data, socket);
  });

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => {
    initializeConnectionHandler(data, socket);
  });

  socket.on("disconnect", () => {
    disconnectHandler(socket, roomId);
  });
  socket.on("leave", () => {
    disconnectHandler(socket, roomId);
  });

  //Sound panel
  socket.on("send-sound", (data) => {
    const { roomId } = data;
    socket.to(roomId).emit("receive-sound", data);
    console.log("received sound from room: " + roomId);
  });

  //Whiteboard

  socket.on("draw", (data, roomCode) => socket.to(roomCode).emit("draw", data));
});

const createNewRoomHandler = (data, socket, roomId) => {
  console.log("CREATE ROOM:");

  const { identity } = data;
  const userId = roomId;

  console.log(`user (${userId}) created a new room\n`);

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    userId,
  };

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
    roomType: "roomAudioVideo",
  };

  connectedUsers = [...connectedUsers, newUser];
  rooms = [...rooms, newRoom];
  socket.join(roomId);
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId, userId } = data;
  console.log("JOIN ROOM:");
  if (roomId !== null) {
    const newUser = {
      identity,
      id: uuidv4(),
      socketId: socket.id,
      roomId,
      userId,
      //onlyAudio,
    };

    // join room as user which just is trying to join room passing room id
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      if (room.roomType == "roomOnly") {
        joinOnlyInRoomHandler(data, socket);
      } else {
        room.connectedUsers = [...room.connectedUsers, newUser];

        socket.join(roomId);
        console.log(`user (${userId}) joined room [${roomId}] \n`);
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
    }
  } else {
    socket.emit("room-id", { roomId: "not-available" });
  }
};

const createNewOnlyRoomHandler = (data, socket, roomId) => {
  console.log("CREATE ONLY ROOM:");

  const { identity } = data;
  const userId = roomId;

  console.log(`user (${userId}) created a new  only room\n`);

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    userId,
  };

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
    roomType: "roomOnly",
  };

  connectedUsers = [...connectedUsers, newUser];
  rooms = [...rooms, newRoom];
  socket.join(roomId);
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinOnlyInRoomHandler = (data, socket) => {
  const { identity, roomId, userId } = data;
  console.log("JOIN ONLY ROOM:");
  if (roomId !== null) {
    const newUser = {
      identity,
      id: uuidv4(),
      socketId: socket.id,
      roomId,
      userId,
    };

    // join room as user which just is trying to join room passing room id
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      room.connectedUsers = [...room.connectedUsers, newUser];
      socket.join(roomId);
      console.log(`user (${userId}) joined only room [${roomId}] \n`);
      // add new user to connected users array
      connectedUsers = [...connectedUsers, newUser];

      // emit to all users which are already in this room to prepare peer connection
      room.connectedUsers.forEach((user) => {
        if (user.socketId !== socket.id) {
          const data = {
            connUserSocketId: socket.id,
          };
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
    console.log("DISCONNECT ROOM:");
    console.log(
      `user (${user.userId}) disconnected from room [${user.roomId}] \n`
    );
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
  console.log(`Server is listening on port ${PORT}`);
});
