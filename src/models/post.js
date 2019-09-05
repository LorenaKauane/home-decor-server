const mongoose = require("../database/database");
const CATEGORIES = require("../util/categories");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  postImage: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: true
  },
  caminhoFoto: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Post", PostSchema);
