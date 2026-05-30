import { prisma } from "../../utils/prisma.js";
import { comparePassword } from "../../utils/hashPassword.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // =========================
    // FIND USER (ALL ROLES)
    // =========================
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        firstName: true,
        surName: true,
        email: true,
        passwordHash: true,
        role: true,
        status: true,
        tenantId: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =========================
    // CHECK PASSWORD
    // =========================
    const match = await comparePassword(password, user.passwordHash);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // =========================
    // BLOCK INACTIVE USERS (OPTIONAL)
    // =========================
    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Account not active",
      });
    }

    // =========================
    // LAST LOGIN (NON-BLOCKING)
    // =========================
    const now = new Date();

    prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: now },
    }).catch(() => {});

    // =========================
    // TOKEN PAYLOAD
    // =========================
    const payload = {
      id: user.id,
      role: user.role,
      tenantId: user.tenantId,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({ id: user.id });

    // =========================
    // COOKIES
    // =========================
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // =========================
    // RESPONSE
    // =========================
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        fullName: `${user.firstName} ${user.surName}`,

        lastLoginAt: now.toISOString(),
        loginDate: now.toLocaleDateString("en-GB"),
        loginTime: now.toLocaleTimeString("en-GB"),
      },
    });
  } catch (error) {
    console.log("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};