import { prisma } from "../../utils/prisma.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { transporter } from "../../config/smpt.js";
import { passwordResetSuccessTemplate } from "../../templates/passwordResetSuccessTemplate.js";

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // ================= VALIDATION =================
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    // ================= FIND USER =================
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ================= VERIFY OTP =================
    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (
      !user.resetPasswordOtpExpiry ||
      new Date() > user.resetPasswordOtpExpiry
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // ================= HASH PASSWORD =================
    const hashed = await hashPassword(newPassword);

    // ================= UPDATE USER =================
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashed,
        resetPasswordOtp: null,
        resetPasswordOtpExpiry: null,
        mustChangePassword: false,
      },
    });

    // ================= SEND EMAIL =================
    await transporter.sendMail({
      from: `"X-044 ISP" <${process.env.SMTP_EMAIL}>`,
      to: user.email,
      subject: "Password Reset Successful",
      html: passwordResetSuccessTemplate(user.firstName),
    });

    // ================= RESPONSE =================
    return res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Reset failed",
    });
  }
};