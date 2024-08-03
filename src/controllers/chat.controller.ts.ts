import ChatDB from "@/databases/chat.db";
import asyncWrapper from "@/helpers/async-wrapper";
import { IMessage } from "@/types/message";
import createHttpError from "http-errors";
import { Server } from "socket.io";

export const postCreateRoom = asyncWrapper((req, res) => {
  const { clientId } = req.body;

  if (!clientId) throw createHttpError(400, "Invalid client ID");

  const chatDB = req.app.get("chatDB") as ChatDB;

  if (!chatDB) throw createHttpError(500, "Database not connected");

  const newRoom = chatDB.addRoom();

  return res.status(200).json({ id: newRoom });
});

export const postJoinRoom = asyncWrapper((req, res) => {
  const { clientId, roomId } = req.body;

  if (!clientId) throw createHttpError(400, "Invalid client ID");
  if (!roomId) throw createHttpError(400, "Invalid room ID");

  const chatDB = req.app.get("chatDB") as ChatDB;
  if (!chatDB) throw createHttpError(500, "Database not connected");

  const roomExist = chatDB.findRoom(roomId);
  if (!roomExist) throw createHttpError(404, "Room does not exist");

  const io = req.app.get("io") as Server;

  const socket = io.of("/socket/chat").sockets.get(clientId);

  if (!socket) throw createHttpError(400, "Invalid client ID");

  socket.join(roomId); // join to the room
  socket.to(roomId).emit("new-message", {
    author: "NOTICE",
    createdAt: new Date().getTime(),
    room: roomId,
    text: `${clientId} joined this room`,
  } as IMessage);

  return res.status(200).json({ id: roomId, clientId });
});
