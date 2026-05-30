import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hashPassword.js";

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // 1. GET TOKEN FROM COOKIE
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // 2. VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id; // ✅ FIXED HERE

    // 3. GET USER
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. CHECK OLD PASSWORD
    const isMatch = await comparePassword(oldPassword, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // 5. HASH NEW PASSWORD
    const hashed = await hashPassword(newPassword);

    // 6. UPDATE USER
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: hashed,
        mustChangePassword: false,
      },
    });

    return res.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};