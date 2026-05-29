export const passwordChangedTemplate = (name) => {
  return `
  <div style="
    margin:0;
    padding:40px 20px;
    background:#f4f7fb;
    font-family:Arial,sans-serif;
  ">

    <div style="
      max-width:600px;
      margin:auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 20px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->
      <div style="
        background:#0f172a;
        padding:30px;
        text-align:center;
      ">
        <h1 style="
          margin:0;
          color:#ffffff;
          font-size:24px;
        ">
          🔐 Password Changed
        </h1>
      </div>

      <!-- BODY -->
      <div style="
        padding:35px;
        color:#334155;
      ">

        <h2 style="
          margin-top:0;
          font-size:20px;
          color:#0f172a;
        ">
          Hello ${name},
        </h2>

        <p style="
          font-size:15px;
          line-height:1.8;
          margin-bottom:20px;
        ">
          Your account password was changed successfully.
        </p>

        <div style="
          background:#eff6ff;
          border-left:4px solid #2563eb;
          padding:15px;
          border-radius:6px;
          margin-bottom:25px;
        ">
          <p style="
            margin:0;
            font-size:14px;
            color:#1e3a8a;
            line-height:1.6;
          ">
            If you did not make this change, secure your account immediately and contact support.
          </p>
        </div>

        <p style="
          font-size:14px;
          line-height:1.7;
          color:#475569;
        ">
          For security reasons, you may need to login again on your devices.
        </p>

        <div style="
          margin-top:30px;
        ">
          <a href="#"
            style="
              display:inline-block;
              background:#2563eb;
              color:#ffffff;
              text-decoration:none;
              padding:12px 22px;
              border-radius:8px;
              font-size:14px;
              font-weight:bold;
            ">
            Secure Account
          </a>
        </div>

        <p style="
          margin-top:35px;
          font-size:14px;
          color:#64748b;
        ">
          Regards,<br/>
          <strong>X-25 ISP System</strong>
        </p>

      </div>

      <!-- FOOTER -->
      <div style="
        background:#f8fafc;
        padding:18px;
        text-align:center;
        font-size:12px;
        color:#94a3b8;
        border-top:1px solid #e2e8f0;
      ">
        © ${new Date().getFullYear()} X-25 ISP. All rights reserved.
      </div>

    </div>

  </div>
  `;
};