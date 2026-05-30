import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { hashPassword } from "../../utils/hashPassword.js";
import { generatePassword } from "../../utils/generatePassword.js";
import { transporter } from "../../config/smpt.js";
import { sendPasswordTemplate } from "../../templates/sendPasswordTemplate.js";

export const registerTenantAdmin = async (req, res) => {
  try {
    const {
      tenantName,
      slug,
      tenantEmail,

      firstName,
      surName,
      email,
      phone,
    } = req.body;

    // =========================
    // STRONG VALIDATION (FIXED)
    // =========================
    if (
      !tenantName ||
      !slug ||
      !firstName ||
      !surName ||
      !email ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (tenantName, slug, firstName, surName, email, phone)",
      });
    }

    // =========================
    // CLEAN SLUG
    // =========================
    const cleanSlug = slug.toLowerCase().trim().replace(/\s+/g, "-");

    // =========================
    // CHECK DUPLICATES
    // =========================
    const existingTenant = await prisma.tenant.findFirst({
      where: {
        OR: [
          { slug: cleanSlug },
          ...(tenantEmail ? [{ email: tenantEmail }] : []),
        ],
      },
    });

    if (existingTenant) {
      return res.status(409).json({
        success: false,
        message: "Tenant already exists",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // =========================
    // CREATE TENANT (SAFE)
    // =========================
    const tenant = await prisma.tenant.create({
      data: {
        name: tenantName,
        slug: cleanSlug,
        email: tenantEmail || email, // fallback safe
        phone: phone, // REQUIRED FIX

        status: "PENDING",
        isActive: false,
      },
    });

    // =========================
    // CREATE PASSWORD
    // =========================
    const plainPassword = generatePassword();
    const passwordHash = await hashPassword(plainPassword);

    // =========================
    // CREATE ADMIN
    // =========================
    const admin = await prisma.user.create({
      data: {
        firstName,
        surName,
        email,
        phone,

        passwordHash,

        role: "TENANT_ADMIN",
        status: "ACTIVE",
        isVerified: false,

        tenantId: tenant.id,
        mustChangePassword: true,
      },
    });

    // =========================
    // EMAIL (SAFE)
    // =========================
    try {
      await transporter.sendMail({
        to: admin.email,
        subject: "Tenant Admin Account",
        html: sendPasswordTemplate({
          firstName: admin.firstName,
          email: admin.email,
          password: plainPassword,
          loginUrl: process.env.LOGIN_URL || "http://localhost:3000/login",
        }),
      });
    } catch (err) {
      console.log("⚠️ Email failed");
      console.log({ email: admin.email, password: plainPassword });
    }

    // =========================
    // RESPONSE
    // =========================
    return res.status(201).json({
      success: true,
      message: "Tenant + Admin created successfully",
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
      },
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        tenantId: admin.tenantId,
      },
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};