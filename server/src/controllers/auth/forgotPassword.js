import { prisma } from "../../utils/prisma.js";
import { generateOtp } from "../../utils/generateOTP.js";
import { transporter } from "../../config/smpt.js";
import { forgotPasswordOtpTemplate } from "../../templates/forgotPasswordOtpTemplate.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================
    // GENERATE OTP
    // =====================
    const otp = generateOtp(6);

    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // =====================
    // SAVE OTP IN DB
    // =====================
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordOtp: otp,
        resetPasswordOtpExpiry: expiry,
      },
    });

    // =====================
    // SEND EMAIL
    // =====================
    await transporter.sendMail({
  from: `"X-044 ISP" <${process.env.SMTP_EMAIL}>`,
  to: user.email,
  subject: "Password Reset OTP",
  html: forgotPasswordOtpTemplate(
    user.firstName,
    otp
  ),
});

    return res.json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send reset OTP",
    });
  }
};