const express = require("express");
const router = express.Router();

const verifyUser = require("../auth/verify-user");
const sha512 = require("../etc/sha512");

const User = require("../models/user");

router.post("/", (req, res) => {
  if (!req.body.id || !req.body.id) {
    return res.status(400).json();
  }
  User.find({ id: req.body.id, pw: sha512(req.body.pw) }, (err, data) => {
    if (err) return res.status(500).json();
    if (data.length) {
      verifyUser.sign({ id: req.body.id }, (err, token) => {
        if (err) return res.status(500).json();
        return res.status(200).json({ token: token });
      });
    } else {
      return res.status(401).json();
    }
  });
});

module.exports = router;
