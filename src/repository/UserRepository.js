const User = require("../models/user");

exports.create = async data => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error) {
    throw error;
  }
};

exports.read = async () => {
  try {
    return await User.find().populate("posts");
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await User.findById(id).populate("posts");
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(id, { $set: data }, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.remove = async id => {
  try {
    return await User.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
