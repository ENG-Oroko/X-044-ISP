import { prisma } from "../../utils/prisma.js";
import { comparePassword } from "../../utils/hashPassword.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { tenantId, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    let user = null;

    // SUPER ADMIN LOGIN
    if (!tenantId) {
      user = await prisma.user.findFirst({
        where: {
          email,
          role: "SUPER_ADMIN",
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          passwordHash: true,
          role: true,
          status: true,
          tenantId: true,
        },
      });
    }

    // TENANT USER LOGIN
    if (tenantId) {
      user = await prisma.user.findUnique({
        where: {
          tenantId_email: {
            tenantId,
            email,
          },
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          passwordHash: true,
          role: true,
          status: true,
          tenantId: true,
        },
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await comparePassword(
      password,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
      tenantId: user.tenantId,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

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

    delete user.passwordHash;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};