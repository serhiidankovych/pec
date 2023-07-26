import socketIO from "socket.io-client";
export const socket = socketIO.connect("http://localhost:5002");
