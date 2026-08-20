const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


/* =========================
   TEST / HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WinOne Pakistan backend is running!"
  });
});


/* =========================
   PAYMENT ENDPOINT
========================= */

app.post("/api/create-payment", async (req, res) => {

  try {

    const {
      prize,
      entryFee,
      quantity,
      total,
      paymentMethod
    } = req.body;


    if (
      !prize ||
      !entryFee ||
      !quantity ||
      !total ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment information is incomplete."
      });
    }


    if (
      paymentMethod !== "easypaisa" &&
      paymentMethod !== "jazzcash"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method."
      });
    }


    /*
      IMPORTANT:

      Real Easypaisa/JazzCash API code
      will be added here after merchant
      credentials and gateway details
      are available.

      DO NOT put secret keys in index.html.
    */


    console.log("Payment request:", {
      prize,
      entryFee,
      quantity,
      total,
      paymentMethod
    });


    return res.json({
      success: false,
      message:
        "Payment gateway is not connected yet. Merchant credentials are required."
    });


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error."
    });

  }

});


/* =========================
   START SERVER
========================= */

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `WinOne backend running on port ${PORT}`
  );

});
