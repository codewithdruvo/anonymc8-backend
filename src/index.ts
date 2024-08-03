import { initEnvConfig } from "./config/env.config";
initEnvConfig(); // initialize env config

import { createServer } from "http";
import app from "./app";
import ChatDB from "./databases/chat.db";
import initSocket from "./socket";

// initialize db
const chatDB = new ChatDB();
app.set("chatDB", chatDB); // attach to access in express

const server = createServer(app);

// initialize socket io
const io = initSocket(server, chatDB);
app.set("io", io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
