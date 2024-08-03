import ChatDB from "@/databases/chat.db";
import { IMessage } from "@/types/message";
import { Server } from "socket.io";

const events = {
  CREATE_MESSAGE: "create-message",
  NEW_MESSAGE: "new-message",
  JOIN_ROOM: "room-join",
};

const chatSocket = (io: Server, db: ChatDB) => {
  const chatNamespace = io.of("/socket/chat");

  chatNamespace.on("connection", (socket) => {
    console.log("User Connected: ", socket.id);

    // handle new message
    socket.on(events.CREATE_MESSAGE, (msg: IMessage) => {
      console.log("New Message", msg);

      socket.to(msg.room).emit(events.NEW_MESSAGE, msg);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected: ", socket.id);
    });
  });
};

export default chatSocket;
