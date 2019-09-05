const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter.js");
const postRouter = require("./postRouter");
const categoriesRouter = require("./categoriesRouter");

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
