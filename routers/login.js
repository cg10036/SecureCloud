const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const verifyUser = require("../auth/verify-user");

const User = require("../models/user");

router.post("/", (req, res) => {
  if (!req.body.id || !req.body.id) {
    return res.status(400).json();
  }
  User.findOne({ id: req.body.id }, (err, data) => {
    if (err) return res.status(500).json();
    if (!data) {
      return res.status(401).json();
    }
    try {
      let key = crypto
        .createHash("sha256")
        .update(req.body.pw + data.salt)
        .digest("byte");
      let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        key,
        Buffer.from(data.iv, "base64")
      );
      let decrypted = decipher.update(data.key, "base64", "utf8");
      decrypted += decipher.final("utf8");
      verifyUser.sign({ id: req.body.id }, (err, token) => {
        if (err) return res.status(500).json();
        return res.status(200).json({ key: decrypted, token: token });
      });
    } catch {
      return res.status(401).json();
    }
  });
});

module.exports = router;
