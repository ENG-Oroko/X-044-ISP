export const phoneChangedTemplate = (name, newPhone) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
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

      <!-- Header -->
      <div style="
        background: #0f172a;
        padding: 20px;
        text-align: center;
        color: #ffffff;
      ">
        <h2 style="margin: 0; font-size: 22px;">📱 Security Alert</h2>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h3 style="margin-top: 0;">Hello ${name},</h3>

        <p style="font-size: 15px; line-height: 1.6;">
          Your phone number has been successfully updated on your ISP account.
        </p>

        <!-- Highlight Box -->
        <div style="
          background: #fef3c7;
          border-left: 5px solid #f59e0b;
          padding: 12px 15px;
          margin: 20px 0;
          border-radius: 5px;
          font-size: 14px;
        ">
          <strong>New Phone:</strong> ${newPhone}
        </div>

        <div style="
          background: #fee2e2;
          border-left: 5px solid #ef4444;
          padding: 12px 15px;
          margin: 20px 0;
          border-radius: 5px;
          font-size: 13px;
        ">
          If this was NOT you, contact support immediately to secure your account.
        </div>

        <p style="font-size: 14px; color: #555;">
          Keeping your contact information updated helps ensure uninterrupted ISP service and payment notifications.
        </p>

        <p style="font-size: 14px; color: #555;">
          Regards,<br/>
          <strong>X-25 ISP System</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="
        background: #f1f5f9;
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #777;
      ">
        © ${new Date().getFullYear()} X-25 ISP. All rights reserved.
      </div>

    </div>
  </div>
  `;
};