const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  if (!fs.existsSync(path.join(__dirname, "../data/" + req.id))) {
    fs.mkdirSync(path.join(__dirname, "../data/" + req.id));
  }
  res.json({ success: true });
});

module.exports = router;
