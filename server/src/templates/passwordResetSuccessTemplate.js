export const passwordResetSuccessTemplate = (name) => {
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
        background: #16a34a;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      ">
        <h2 style="margin:0; font-size:22px;">✅ Password Reset Successful</h2>
      </div>

      <!-- BODY -->
      <div style="padding: 30px; color: #111827;">

        <h3 style="margin-top: 0;">Hello ${name},</h3>

        <p style="font-size: 15px; line-height: 1.6;">
          Your password has been successfully updated on your ISP account.
        </p>

        <!-- SUCCESS BOX -->
        <div style="
          background: #ecfdf5;
          border-left: 5px solid #16a34a;
          padding: 12px 15px;
          margin: 20px 0;
          border-radius: 6px;
          font-size: 14px;
          color: #065f46;
        ">
          ✔ Your account is now secure with your new password.
        </div>

        <!-- WARNING BOX -->
        <div style="
          background: #fef2f2;
          border-left: 5px solid #ef4444;
          padding: 12px 15px;
          margin: 20px 0;
          border-radius: 6px;
          font-size: 13px;
          color: #991b1b;
        ">
          ⚠️ If you did NOT perform this action, please contact support immediately.
        </div>

        <p style="font-size: 13px; color: #6b7280;">
          For security reasons, we recommend using a strong password and updating it regularly.
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