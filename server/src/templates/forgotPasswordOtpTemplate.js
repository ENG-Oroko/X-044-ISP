export const forgotPasswordOtpTemplate = (name, otp) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f3f4f6;
    padding: 40px 0;
  ">

    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    ">

      <!-- HEADER -->
      <div style="
        background: #1e3a8a;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      ">
        <h2 style="margin:0; font-size:22px;">🔐 Password Reset</h2>
      </div>

      <!-- BODY -->
      <div style="padding: 30px; color: #111827;">

        <h3 style="margin-top: 0;">Hello ${name},</h3>

        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your password. Use the OTP below to continue.
        </p>

        <!-- OTP BOX -->
        <div style="
          background: #eef2ff;
          border-left: 5px solid #1e3a8a;
          text-align: center;
          padding: 20px;
          margin: 25px 0;
          border-radius: 8px;
        ">

          <p style="margin:0; font-size:13px; color:#6b7280;">
            Your OTP Code
          </p>

          <h1 style="
            margin:10px 0 0 0;
            letter-spacing: 8px;
            color: #1e3a8a;
            font-size: 32px;
          ">
            ${otp}
          </h1>

        </div>

        <!-- WARNING -->
        <div style="
          background: #fef2f2;
          border-left: 5px solid #ef4444;
          padding: 12px 15px;
          margin: 20px 0;
          border-radius: 6px;
          font-size: 13px;
          color: #991b1b;
        ">
          ⚠️ This OTP will expire in 10 minutes. Do not share it with anyone.
        </div>

        <p style="font-size: 13px; color: #6b7280;">
          If you did NOT request this password reset, please ignore this email or contact support immediately.
        </p>

        <p style="margin-top: 25px; font-size: 14px;">
          Regards,<br/>
          <strong>X-25 ISP System</strong>
        </p>

      </div>

      <!-- FOOTER -->
      <div style="
        background: #f9fafb;
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #6b7280;
      ">
        © ${new Date().getFullYear()} X-25 ISP. All rights reserved.
      </div>

    </div>

  </div>
  `;
};