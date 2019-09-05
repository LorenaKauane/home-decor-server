const express = require("express");

const CategoriesController = require("../controller/CategoriesController");

const router = express.Router();

router.get("/", CategoriesController.read);

module.exports = router;
