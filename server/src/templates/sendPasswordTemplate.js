export const sendPasswordTemplate = ({
  firstName,
  email,
  password,
  loginUrl,
}) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>ISP Account Credentials</title>
  </head>

  <body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff; margin-top:40px; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.1);">

            <!-- HEADER -->
            <tr>
              <td align="center"
                style="background:#1e3a8a; color:white; padding:22px; font-size:26px; font-weight:bold;">
                ISP MAN
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px; color:#111827; font-size:15px; line-height:1.7;">

                <h2 style="margin-top:0; color:#111827;">
                  Welcome, ${firstName}
                </h2>

                <p>
                  Your ISP account has been created successfully. Below are your login credentials.
                </p>

                <!-- SECURITY WARNING -->
                <div style="
                  background:#fff7ed;
                  border-left:5px solid #f97316;
                  padding:12px 15px;
                  margin:20px 0;
                  border-radius:6px;
                  font-size:14px;
                ">
                  ⚠️ For your security, please change your password immediately after login.
                </div>

                <!-- CREDENTIAL BOX -->
                <table width="100%" cellpadding="12" cellspacing="0"
                  style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; margin-top:20px;">

                  <tr>
                    <td><strong>Email</strong></td>
                    <td>${email}</td>
                  </tr>

                  <tr>
                    <td><strong>Password</strong></td>
                    <td>${password}</td>
                  </tr>

                </table>

                <!-- LOGIN BUTTON -->
                <div style="text-align:center; margin-top:25px;">
                  <a href="${loginUrl}"
                    style="
                      display:inline-block;
                      background:#1e3a8a;
                      color:white;
                      padding:12px 26px;
                      text-decoration:none;
                      font-weight:bold;
                      border-radius:6px;
                    ">
                    Login to Account
                  </a>
                </div>

                <p style="margin-top:30px; font-size:13px; color:#6b7280;">
                  If you did not request this account, please ignore this email or contact support immediately.
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td align="center"
                style="padding:18px; font-size:12px; color:#6b7280; background:#f9fafb;">
                © ${new Date().getFullYear()} ISP MAN. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};