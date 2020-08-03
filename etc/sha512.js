const crypto = require("crypto");

const config = require("../config/config");

module.exports = (content) =>
  crypto
    .createHash("sha512")
    .update(content + config.salt)
    .digest("hex");
