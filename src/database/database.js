const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
module.exports = mongoose;
