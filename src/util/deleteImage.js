const fs = require("fs");
module.exports = (fold, image) => {
  if (image) {
    return fs.unlink(`./upload/${fold}/${image}`, err => {
      if (err) return console.log(err);
    });
  }
};
