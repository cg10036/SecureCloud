const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const verifyUser = require("../auth/verify-user");

const User = require("../models/user");

router.get("/", (req, res) => {
  verifyUser.sign({ id: req.id }, (err, token) => {
    if (err) return res.status(500).json();
    return res.status(200).json({ token: token });
  });
});

module.exports = router;
