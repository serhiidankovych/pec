import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api",
});

export const getRoomExists = (roomId) => API.get(`/room-exists/${roomId}`);
