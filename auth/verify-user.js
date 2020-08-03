const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  sign: (payload, next) => {
    jwt.sign(payload, config.secret, { expiresIn: config.expiresIn }, next);
  },
  verify: (str, next) => {
    jwt.verify(str, config.secret, {}, next);
  },
  auth: (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json();
    module.exports.verify(req.headers.authorization, (err, decoded) => {
      if (err) return res.status(401).json();
      req.id = decoded.id;
      next();
    });
  },
};
