import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { hashPassword } from "../src/utils/hashPassword.js";
import { generatePassword } from "../src/utils/generatePassword.js";
import { transporter } from "../src/config/smpt.js";
import { sendPasswordTemplate } from "../src/templates/sendPasswordTemplate.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME;
  const ADMIN_SUR_NAME = process.env.ADMIN_SUR_NAME;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PHONE = process.env.ADMIN_PHONE;

  if (
    !ADMIN_FIRST_NAME ||
    !ADMIN_SUR_NAME ||
    !ADMIN_EMAIL ||
    !ADMIN_PHONE
  ) {
    throw new Error(
      "Missing ADMIN_FIRST_NAME, ADMIN_SUR_NAME, ADMIN_EMAIL or ADMIN_PHONE in .env"
    );
  }

  const existingAdmin = await prisma.user.findFirst({
    where: {
      email: ADMIN_EMAIL,
      role: "SUPER_ADMIN",
    },
  });

  if (existingAdmin) {
    console.log("⚠️ SUPER ADMIN already exists");
    return;
  }

  // Generate random password
  const plainPassword = generatePassword();

  // Hash password
  const passwordHash = await hashPassword(plainPassword);

  // Create Super Admin
  const admin = await prisma.user.create({
    data: {
      firstName: ADMIN_FIRST_NAME,
      surName: ADMIN_SUR_NAME,

      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,

      passwordHash,

      role: "SUPER_ADMIN",
      status: "ACTIVE",

      isVerified: true,

      tenantId: null,
    },
  });

  try {
    await transporter.sendMail({
      to: admin.email,
      subject: "Your Super Admin Account",

      html: sendPasswordTemplate({
        firstName: admin.firstName,
        email: admin.email,
        password: plainPassword,
        loginUrl:
          process.env.LOGIN_URL ||
          "http://localhost:5173/login",
      }),
    });

    console.log("📧 Admin credentials sent successfully");
  } catch (error) {
    console.error("⚠️ Failed to send email");

    console.log("\n================================");
    console.log("SUPER ADMIN LOGIN DETAILS");
    console.log("================================");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${plainPassword}`);
    console.log("================================\n");
  }

  console.log("\n✅ SUPER ADMIN CREATED");
  console.log(`👤 ${admin.firstName} ${admin.surName}`);
  console.log(`📧 ${admin.email}`);
  console.log(`📱 ${admin.phone}`);
  console.log(`🔐 ${admin.role}\n`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });