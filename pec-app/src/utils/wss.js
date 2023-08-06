import io from "socket.io-client";
import store from "../redux/store";
import * as webRTCHandler from "./webRTCHandler";
import { setParticipants, setRoomId, setUserId } from "../redux/actions";
import { socket } from ".././socketConfig";

export const connectWithSocketIOServer = () => {
  socket.on("connect", () => {
    console.log("successfully connected with socket io server " + socket.id);
  });

  socket.on("room-id", ({ roomId }) => {
    store.dispatch(setRoomId(roomId));
    store.dispatch(setUserId(roomId));
    console.log("Set room id " + roomId);
  });

  socket.on("room-update", ({ connectedUsers }) => {
    store.dispatch(setParticipants(connectedUsers));
    console.log("Set all participants for current room");
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
};

export const createNewRoom = (identity, onlyAudio) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
    onlyAudio,
  };
  console.log("Created new room");
  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId, userId, onlyAudio) => {
  //emit an event to server that we would to join a room
  const data = {
    roomId,
    identity,
    userId,
    onlyAudio,
  };
  console.log("Joined to the room");
  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

export const createOnlyRoom = (identity) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
  };
  console.log("Created new room only");
  socket.emit("create-new-only-room", data);
};
export const joinOnlyRoom = (identity, roomId, userId) => {
  const data = {
    roomId,
    identity,
    userId,
  };
  socket.emit("join-only-room", data);
  console.log("Joined only room");
};
export const newRoomId = () => {
  socket.emit("new-room-id");
};
