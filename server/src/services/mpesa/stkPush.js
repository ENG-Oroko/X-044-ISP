import axios from "axios";
import moment from "moment";
import { getMpesaAccessToken } from "./accessToken.js";

export const stkPush = async ({ phone, amount, accountReference, transactionDesc }) => {
  const token = await getMpesaAccessToken();

  const timestamp = moment().format("YYYYMMDDHHmmss");

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const formattedPhone = phone.startsWith("0")
    ? "254" + phone.slice(1)
    : phone;

  const payload = {
    BusinessShortCode: Number(process.env.MPESA_SHORTCODE),
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Number(amount),
    PartyA: formattedPhone,
    PartyB: Number(process.env.MPESA_SHORTCODE),
    PhoneNumber: formattedPhone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };

  const url =
    process.env.MPESA_ENV === "production"
      ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};