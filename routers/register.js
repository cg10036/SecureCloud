const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const User = require("../models/user");

router.post("/", (req, res) => {
  if (!req.body.id || !req.body.pw) {
    return res.status(400).json();
  }
  User.find({ id: req.body.id }, (err, data) => {
    if (err) return res.status(500).json();
    if (data.length) {
      return res.status(409).json();
    } else {
      try {
        let randomkey = crypto.randomBytes(32).toString("base64");
        console.log(randomkey);
        let salt = crypto.randomBytes(8).toString("base64");
        let key = crypto
          .createHash("sha256")
          .update(req.body.pw + salt)
          .digest("byte");
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        let encrypted = cipher.update(randomkey, "utf8", "base64");
        encrypted += cipher.final("base64");
        let user = new User();
        user.id = req.body.id;
        user.key = encrypted;
        user.iv = iv.toString("base64");
        user.salt = salt;
        user.save((err) => {
          if (err) return res.status(500).json();
          return res.status(201).json();
        });
      } catch {
        return res.status(500).json();
      }
    }
  });
});

module.exports = router;
