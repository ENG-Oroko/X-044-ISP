import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma.js";
import { generateAccessToken } from "../../utils/generateToken.js";

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token)
      return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true },
    });

    if (!user)
      return res.status(401).json({ message: "User not found" });

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Token refreshed" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};