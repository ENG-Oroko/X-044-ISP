import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./router/auth.js";
import subscriptionRoutes from "./router/subscriptionPlan.js";
import mpesaRoutes from "./router/mpesa.js";

const app = express();

/* ---------------- SECURITY & PARSING MIDDLEWARE ---------------- */

// 🔥 MUST be first (body parsing)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // FIX: req.body undefined issue

// CORS
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.GATEWAY_URL,
    ].filter(Boolean), // avoids undefined crash
    credentials: true,
  })
);

// Security headers
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Cookies
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/mpesa", mpesaRoutes);

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "X-25 ISP Backend Running 🚀",
  });
});

/* ---------------- GLOBAL ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;