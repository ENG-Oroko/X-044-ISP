import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./router/auth.js";

const app = express();

/* ---------------- Middleware ---------------- */

app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.GATEWAY_URL,
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

/* ---------------- Routes ---------------- */

app.use("/api/auth", authRoutes);


/* ---------------- Health Check ---------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "X-25 ISP Backend Running 🚀",
  });
});

/* ---------------- Global Error Handler ---------------- */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;