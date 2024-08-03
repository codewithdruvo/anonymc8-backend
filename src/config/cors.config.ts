import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.166:5173"],
  credentials: true,
};
