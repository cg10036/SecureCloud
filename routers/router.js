const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const verifyUser = require("../auth/verify-user");

const loginRouter = require("./login");
const registerRouter = require("./register");
const renewRouter = require("./renew");
const uploadRouter = require("./upload");

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/renew", verifyUser.auth, renewRouter);
router.use("/upload", verifyUser.auth, uploadRouter);

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
