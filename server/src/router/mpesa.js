import express from "express";
import { initiateSubscriptionPayment } from "../controllers/mpesa/initiatePayment.js";
import { mpesaCallback } from "../controllers/mpesa/callback.js";

const router = express.Router();

router.post("/subscription-payment", initiateSubscriptionPayment);
router.post("/callback", mpesaCallback);

export default router;