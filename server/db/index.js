const mongoose = require("mongoose");
const connection =
  "mongodb+srv://HSAdmin:ElKcKLYKI7ELqqW0@hs-cluster.rxjry.mongodb.net/hs-cluster?retryWrites=true&w=majority";

mongoose
  .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected Succesfully"))
  .catch((e) => {
    console.error("Connection error", e.message);
  });

//used to solve deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;

module.exports = db;
