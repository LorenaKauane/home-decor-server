const Post = require("../models/post");

exports.create = async data => {
  try {
    const post = new Post(data);
    return await post.save();
  } catch (error) {
    throw error;
  }
};

exports.read = async () => {
  try {
    return await Post.find().populate("user");
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await Post.findById(id).populate("user");
  } catch (err) {
    throw err;
  }
};

exports.readByCategories = async categories => {
  try {
    return await Post.find({
      category: {
        $in: categories
      }
    });
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Post.findByIdAndUpdate(id, { $set: data }, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.remove = async id => {
  try {
    return await Post.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
