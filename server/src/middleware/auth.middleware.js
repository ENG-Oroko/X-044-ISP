import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token)
      return res.status(401).json({ message: "No token" });

    console.log("TOKEN:", token); // DEBUG

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};