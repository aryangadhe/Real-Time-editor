import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDb } from "./lib/db.js";

import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend (update in production)
  },
});

const PORT = 5000;

// Store code state per room
export const roomCodes = {};

//io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("🟢 A user connected:", userId);

  if(userId) roomCodes[userId] = socket.id;

  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`👥 ${username} joined room ${roomId}`);

    // Send existing code to the new user
    if (roomCodes[roomId]) {
      socket.emit("code-sync", roomCodes[roomId]);
    }

    // Notify others in the room
    socket.to(roomId).emit("user-joined", username);
  });

  socket.on("code-change", ({ roomId, code }) => {
    roomCodes[roomId] = code;
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
    // Optionally: broadcast disconnect to others
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

await connectDb();