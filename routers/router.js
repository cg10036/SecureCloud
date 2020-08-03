const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const verifyUser = require("../auth/verify-user");

const loginRouter = require("./login");
const registerRouter = require("./register");

router.use("/login", loginRouter);
router.use("/register", registerRouter);

router.use((req, res) => {
  fs.stat(path.join(__dirname, "../html") + req.path, (err) => {
    if (!err) {
      res.sendFile(path.join(__dirname, "../html") + req.path);
    } else {
      res.send("File not found.");
    }
  });
});

module.exports = router;
