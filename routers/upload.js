const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const md5 = require("md5");

router.post("/", (req, res) => {
  if (
    !req.body.opt ||
    !req.body.opt.num ||
    isNaN(req.body.opt.num) ||
    !req.body.data ||
    !req.body.name
  ) {
    return res.status(400).json();
  }
  let home = path.join(
    __dirname,
    "../data/" + Buffer.from(req.id).toString("base64").replace("/", "_")
  );
  try {
    if (!fs.existsSync(path.join(__dirname, "../data"))) {
      fs.mkdirSync(path.join(__dirname, "../data"));
    }
    if (!fs.existsSync(home)) {
      fs.mkdirSync(home);
    }
  } catch {
    return res.status(500).json();
  }
  // req.body.opt => {num, overwrite?}
  let name = Buffer.from(req.body.name).toString("base64").replace("/", "_");
  if (!fs.existsSync(path.join(home, name + ".FILE"))) {
    fs.writeFileSync(path.join(home, name + ".FILE"), name, "utf8");
  }
  if (
    fs.existsSync(path.join(home, name + "." + req.body.opt.num.toString())) &&
    !req.body.opt.overwrite
  ) {
    return res.status(409).json();
  }
  fs.writeFileSync(
    path.join(home, name + "." + req.body.opt.num.toString()),
    req.body.data,
    "utf8"
  );
  res.status(201).json({ hash: md5(req.body.data) });
});

module.exports = router;
