export const passwordTemplate = ({
  fullName,
  email,
  password,
  role,
}) => {

  return `

    <div style="
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      padding: 40px;
    ">

      <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      ">

        <div style="
          background: #111827;
          color: white;
          padding: 20px;
          text-align: center;
        ">
          <h1>ISP SaaS System</h1>
        </div>

        <div style="padding: 30px;">

          <h2>Hello ${fullName},</h2>

          <p>
            Your account has been created successfully.
          </p>

          <p>
            Below are your login credentials:
          </p>

          <div style="
            background: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          ">

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Password:</strong>
              ${password}
            </p>

            <p>
              <strong>Role:</strong>
              ${role}
            </p>

          </div>

          <p style="color: #dc2626;">
            Please change your password after login.
          </p>

          <div style="
            margin-top: 30px;
            text-align: center;
          ">

            <a
              href="#"
              style="
                background: #2563eb;
                color: white;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 6px;
                display: inline-block;
              "
            >
              Login To System
            </a>

          </div>

        </div>

        <div style="
          background: #f9fafb;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        ">

          © ISP SaaS System

        </div>

      </div>

    </div>

  `;
};