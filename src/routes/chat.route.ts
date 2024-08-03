import * as chatController from "@/controllers/chat.controller.ts";
import { Router } from "express";

const chatRouter = Router();

chatRouter.post("/create-room", chatController.postCreateRoom);
chatRouter.post("/join-room", chatController.postJoinRoom);

export default chatRouter;
