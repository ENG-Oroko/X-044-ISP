import { prisma } from "../../utils/prisma.js";

export const mpesaCallback = async (req, res) => {
  try {
    const data = req.body;

    console.log("MPESA CALLBACK:", JSON.stringify(data, null, 2));

    const stkCallback = data?.Body?.stkCallback;

    const checkoutRequestId = stkCallback?.CheckoutRequestID;
    const resultCode = stkCallback?.ResultCode;

    if (checkoutRequestId) {
      await prisma.mpesaPayment.updateMany({
        where: { checkoutRequestId },
        data: {
          status: resultCode === 0 ? "SUCCESS" : "FAILED",
          resultCode,
          resultDesc: stkCallback?.ResultDesc,
        },
      });
    }

    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("CALLBACK ERROR:", err);
    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
};