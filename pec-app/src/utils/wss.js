import io from "socket.io-client";
import store from "../redux/store";
import * as webRTCHandler from "./webRTCHandler";
import { setParticipants, setRoomId, setUserId } from "../redux/actions";
import { socket } from ".././socketConfig";

export const connectWithSocketIOServer = () => {
  socket.on("connect", () => {
    console.log(
      "SOCKET.IO: A connection was successfully established with the server, your soket.id: " +
        socket.id
    );
  });

  socket.on("room-id", ({ roomId }) => {
    store.dispatch(setRoomId(roomId));
    store.dispatch(setUserId(roomId));
    console.log("SOCKET.IO: Recived Room ID " + roomId);
  });

  socket.on("room-update", ({ connectedUsers }) => {
    store.dispatch(setParticipants(connectedUsers));
    console.log("SOCKET.IO: Updated participants");
  });

  //WebRTC wss
  socket.on("conn-prepare", ({ connUserSocketId }) => {
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconnected", (data) => {
    webRTCHandler.removePeerConnection(data);
  });
  socket.on("room-participant-left", (data) => {
    const { socketId } = data;
    console.log("SOCKET.IO: Participant left room with socket id " + socketId);
    webRTCHandler.handleParticipantLeftRoom(data);
  });
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

export const createNewRoom = (identity, onlyAudio) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
    onlyAudio,
  };
  console.log("SOCKET.IO: Emit create a new room");
  socket.emit("create-new-room", data);
};

export const createOnlyRoom = (identity) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
  };
  console.log("SOCKET.IO: Emit create a new room only");
  socket.emit("create-new-only-room", data);
};

export const joinRoom = (identity, roomId, userId, onlyAudio) => {
  //emit an event to server that we would to join a room
  const data = {
    roomId,
    identity,
    userId,
    onlyAudio,
  };
  console.log("SOCKET.IO: Joined a new room");
  socket.emit("join-room", data);
};

export const joinOnlyRoom = (identity, roomId, userId) => {
  const data = {
    roomId,
    identity,
    userId,
  };
  console.log("SOCKET.IO: Joined a new room only");
  socket.emit("join-only-room", data);
};

export const newRoomId = () => {
  socket.emit("new-room-id");
};

export const leaveRoom = (data) => {
  socket.emit("room-leave", data);
  console.log("SOCKET.IO: Emit leave room ");
};
