const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 2 },
  password: { type: String, required: true, minlength: 12 },
});

module.exports = mongoose.model("User", UserSchema);
