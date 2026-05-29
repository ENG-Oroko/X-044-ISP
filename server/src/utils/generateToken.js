import jwt from "jsonwebtoken";

/* ================= ACCESS TOKEN ================= */
export const generateAccessToken = (
  user
) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      tenantId: user.tenantId,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

/* ================= REFRESH TOKEN ================= */
export const generateRefreshToken = (
  user
) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/* ================= VERIFY ACCESS ================= */
export const verifyAccessToken = (
  token
) => {
  return jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET
  );
};

/* ================= VERIFY REFRESH ================= */
export const verifyRefreshToken = (
  token
) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET
  );
};