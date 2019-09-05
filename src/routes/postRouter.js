const express = require("express");
const PostController = require("../controller/PostController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, global._srcImage.concat("/post"));
  },
  filename: (req, file, callback) => {
    let extensao = file.originalname.split(".")[1];
    callback(null, `${Date.now()}.${extensao}`);
  }
});

const photoUpload = multer({ storage: storage });
router.get("/categories", PostController.readByCategories);
router.post("/", photoUpload.single("file"), PostController.create);
router.get("/", PostController.read);
router.put("/:id", PostController.update);
router.delete("/:id", PostController.remove);
router.get("/:id", PostController.readById);

module.exports = router;
