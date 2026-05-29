export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");

    return res.json({
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};