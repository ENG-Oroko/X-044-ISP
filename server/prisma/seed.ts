import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { hashPassword } from "../src/utils/hashPassword";
import { generatePassword } from "../src/utils/generatePassword";
import { sendEmail } from "../src/config/smpt";
import { sendPasswordTemplate } from "../src/templates/sendPasswordTemplate";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const ADMIN_NAME = process.env.ADMIN_NAME!;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
  const ADMIN_PHONE = process.env.ADMIN_PHONE!;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PHONE) {
    throw new Error("Missing ADMIN_NAME, ADMIN_EMAIL or ADMIN_PHONE in .env");
  }

  const existingAdmin = await prisma.user.findFirst({
    where: {
      email: ADMIN_EMAIL,
      tenantId: null,
    },
  });

  if (existingAdmin) {
    console.log("⚠️ Admin already exists");
    return;
  }

  // 1. generate password
  const plainPassword = generatePassword();

  // 2. hash password
  const hashedPassword = await hashPassword(plainPassword);

  // 3. create admin
  const admin = await prisma.user.create({
    data: {
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      isEmailVerified: true,
      tenantId: null,
    },
  });

  // 4. send email using template
  try {
    await sendEmail({
      to: admin.email,
      subject: "Your Admin Account Password",
      html: sendPasswordTemplate({
        firstName: admin.fullName,
        email: admin.email,
        password: plainPassword,
        loginUrl: process.env.LOGIN_URL || "http://localhost:3000/login",
      }),
    });

    console.log("📧 Email sent successfully");
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("⚠️ Email failed:", errorMessage);
    console.log("🔑 PASSWORD BACKUP:", plainPassword);
  }

  console.log("✅ SUPER ADMIN CREATED");
  console.log(`📧 ${admin.email}`);
  console.log(`🔐 ${admin.role}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });