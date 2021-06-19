const mongoose = require("mongoose");
const connection =
  "mongodb+srv://HSAdmin:ElKcKLYKI7ELqqW0@hs-cluster.rxjry.mongodb.net/hs-cluster?retryWrites=true&w=majority";

mongoose
  .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
