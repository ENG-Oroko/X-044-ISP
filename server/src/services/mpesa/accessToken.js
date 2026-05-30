import axios from "axios";

export const getMpesaAccessToken = async () => {
  try {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("TOKEN ERROR:", error.response?.data || error.message);
    throw new Error("Failed to generate M-Pesa token");
  }
};