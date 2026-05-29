import express from "express";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { refreshToken } from "../controllers/auth/refreshToken.js";
import {
  loginRateLimiter,
  logoutRateLimiter,
  forgotPasswordRateLimiter,
  resetPasswordRateLimiter,
  changePasswordRateLimiter,
  changeNumberRateLimiter,
} from "../middleware/authRateLimiter.js";

const router = express.Router();

router.post("/login", loginRateLimiter, login);
router.post("/logout", logoutRateLimiter, logout);
router.post("/refresh-token", refreshToken);

export default router;