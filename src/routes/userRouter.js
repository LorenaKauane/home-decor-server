const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, global._srcImage.concat("/user"));
  },
  filename: (req, file, callback) => {
    let extensao = file.originalname.split(".")[1];
    callback(null, `${Date.now()}.${extensao}`);
  }
});

const photoUpload = multer({ storage: storage });

router.post("/", photoUpload.single("file"), UserController.create);
router.get("/", UserController.read);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);
router.get("/:id", UserController.readById);

module.exports = router;
