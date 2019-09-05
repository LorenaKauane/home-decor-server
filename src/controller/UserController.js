const UserRepository = require("../repository/UserRepository");
const deleteImage = require("../util/deleteImage");

exports.create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Image is required" });
    }
    req.body.caminhoFoto = req.file
      ? "http://" + req.headers.host + "/upload/user/" + req.file.filename
      : "";
    req.body.avatarImg = req.file.filename;

    const user = await UserRepository.create(req.body);
    return res.status(200).send({
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const users = await UserRepository.read();
    return res.status(200).send({
      users
    });
  } catch (error) {
    next(error);
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserRepository.readById(id);
    if (!user) {
      return res.status(404).send({
        message: "User not found"
      });
    }
    return res.status(200).send({
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserRepository.update(id, req.body);
    if (!user) {
      return res.status(404).send({
        message: "User not found"
      });
    }
    return res.status(200).send({
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserRepository.remove(id);
    deleteImage("user", req.body.avatarImg);
    if (!user) {
      return res.status(404).send({
        message: "User not found"
      });
    }
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};
