import io from "socket.io-client";
import store from "../redux/store";
import * as webRTCHandler from "./webRTCHandler";
import { setParticipants, setRoomId } from "../redux/actions";
import { socket } from ".././socketConfig";

export const connectWithSocketIOServer = () => {
  socket.on("connect", () => {
    console.log("successfully connected with socket io server " + socket.id);
  });

  socket.on("room-id", ({ roomId }) => {
    store.dispatch(setRoomId(roomId));
    console.log("Set room id " + roomId);
  });

  socket.on("room-update", ({ connectedUsers }) => {
    store.dispatch(setParticipants(connectedUsers));
    console.log("Set all participants for current room");
  });

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

export const createNewRoom = (identity, onlyAudio = false) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
    onlyAudio,
  };
  console.log("Created new room");
  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId, onlyAudio = false) => {
  //emit an event to server that we would to join a room
  const data = {
    roomId,
    identity,
    onlyAudio,
  };
  console.log("Joined to the room");
  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
