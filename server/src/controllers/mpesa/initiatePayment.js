import { prisma } from "../../utils/prisma.js";
import { stkPush } from "../../services/mpesa/stkPush.js";

export const initiateSubscriptionPayment = async (req, res) => {
  try {
    const { tenantId, phone } = req.body;

    if (!tenantId || !phone) {
      return res.status(400).json({
        success: false,
        message: "tenantId and phone required",
      });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    // Example fixed plan (you can later attach real billing logic)
    const amount = 1000;

    const stk = await stkPush({
      phone,
      amount,
      accountReference: tenant.slug,
      transactionDesc: "ISP Subscription",
    });

    await prisma.mpesaPayment.create({
      data: {
        tenantId,
        amount,
        phoneNumber: phone,
        checkoutRequestId: stk.CheckoutRequestID,
        merchantRequestId: stk.MerchantRequestID,
        status: "PENDING",
      },
    });

    return res.status(200).json({
      success: true,
      message: "STK Push sent",
      data: stk,
    });
  } catch (error) {
    console.error("MPESA ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Payment failed",
    });
  }
};