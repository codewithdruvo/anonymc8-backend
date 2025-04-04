import chatRouter from "@/routes/chat.route";
import healthRouter from "@/routes/health.route";
import { Router } from "express";
import createHttpError from "http-errors";

const router = Router();

router.use("/health", healthRouter);
router.use("/chat", chatRouter);

// not found handler
router.use((_req, _res, next) => {
  next(createHttpError(404, "Not Found"));
});

export default router;
