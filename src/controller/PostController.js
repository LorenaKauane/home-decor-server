const PosterRepository = require("../repository/PostRepository");
const UserRepository = require("../repository/UserRepository");
const deleteImage = require("../util/deleteImage");

exports.create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Image is required" });
    }

    req.body.caminhoFoto = req.file
      ? "http://" + req.headers.host + "/upload/post/" + req.file.filename
      : "";
    req.body.postImage = req.file.filename;

    const user = await UserRepository.readById(req.body.user);

    if (!user) {
      return res.status(404).send({
        message: "User not found"
      });
    }

    const post = await PosterRepository.create(req.body);
    await UserRepository.update(req.body.user, {
      posts: [...user.posts, post._id]
    });

    return res.status(200).send("ok");
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const posts = await PosterRepository.read();
    return res.status(200).send({
      posts
    });
  } catch (error) {
    next(error);
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PosterRepository.readById(id);
    if (!post) {
      return res.status(404).send({
        message: "Post not found"
      });
    }
    return res.status(200).send({
      post
    });
  } catch (error) {
    next(error);
  }
};

exports.readByCategories = async (req, res, next) => {
  try {
    const categories = req.query.categories.split(",");
    const posts = await PosterRepository.readByCategories(categories);

    if (!posts) {
      return res.status(404).send({
        message: "Post not found"
      });
    }

    return res.status(200).send({ posts });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PosterRepository.update(id, req.body);
    if (!post) {
      return res.status(404).send({
        message: "Post not found"
      });
    }
    return res.status(200).send({
      post
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PosterRepository.remove(id);
    deleteImage("post", req.body.postImage);
    if (!post) {
      return res.status(404).send({
        message: "Post not found"
      });
    }
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};
