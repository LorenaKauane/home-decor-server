let CATEGORIES = require("../util/categories");

exports.read = (_req, res, next) => {
  try {
    return res.status(200).send({
      CATEGORIES
    });
  } catch (err) {
    next(err);
  }
};
