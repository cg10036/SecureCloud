const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  key: String,
  iv: String,
  salt: String,
});

module.exports = mongoose.model("user", userSchema);
