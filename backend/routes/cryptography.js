require("dotenv").config();

var express = require("express");
var router = express.Router();
const crypto = require("crypto");

const secretKey = process.env.SECRET_KEY;

router.post("/encrypt", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body" });
  }

  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(message, "utf-8", "hex");
  encrypted += cipher.final("hex");

  res.status(200).json({ encryptedMessage: encrypted });
});

router.post("/decrypt", (req, res) => {
  const { encryptedMessage } = req.body;

  if (!encryptedMessage) {
    return res
      .status(400)
      .json({ error: "Missing encryptedMessage in request body" });
  }

  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedMessage, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  res.status(200).json({ decryptedMessage: decrypted });
});

module.exports = router;
