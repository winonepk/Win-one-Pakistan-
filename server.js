const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`WinOne server running on port ${PORT}`);
});
