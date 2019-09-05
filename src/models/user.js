const mongoose = require("../database/database");

const UserSchema = new mongoose.Schema({
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: []
    }
  ],
  name: { type: String, required: true },
  avatarImg: String,
  email: String,
  password: String,
  about: { type: String, required: true },
  caminhoFoto: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("User", UserSchema);
