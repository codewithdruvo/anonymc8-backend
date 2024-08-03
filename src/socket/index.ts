import { corsOptions } from "@/config/cors.config";
import ChatDB from "@/databases/chat.db";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import chatSocket from "./chat.socket";

const initSocket = (server: Server, db: ChatDB) => {
  const io = new SocketServer(server, { cors: corsOptions });

  // initialize chat socket
  chatSocket(io, db);

  return io;
};

export default initSocket;
