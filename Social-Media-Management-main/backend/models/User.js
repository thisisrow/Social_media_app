const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  instagramId: String,
  username: String,
  accessToken: String
});
module.exports = model("User", userSchema);