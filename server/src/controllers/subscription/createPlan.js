import { prisma } from "../../utils/prisma.js";

export const createPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      durationDays,
    } = req.body;

    // =========================
    // VALIDATION
    // =========================
    if (!name || !price || !durationDays) {
      return res.status(400).json({
        success: false,
        message: "Name, price and durationDays are required",
      });
    }

    // =========================
    // CHECK DUPLICATE
    // =========================
    const existingPlan = await prisma.subscriptionPlan.findFirst({
      where: {
        name,
      },
    });

    if (existingPlan) {
      return res.status(409).json({
        success: false,
        message: "Plan already exists",
      });
    }

    // =========================
    // CREATE PLAN
    // =========================
    const plan = await prisma.subscriptionPlan.create({
      data: {
        name,
        description,
        price: Number(price),
        durationDays: Number(durationDays),
        isActive: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Subscription plan created successfully",
      plan,
    });
  } catch (error) {
    console.error("CREATE PLAN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};