const express = require("express");
const cors = require("cors");

const app = express();
const apiPort = 9000;

const db = require("./db");

/* var corsOptions = {
  origin: "http://localhost:9001/",
};
 */
//app.use(cors(corsOptions));
app.use(express.json());
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

app.listen(apiPort, () => console.log(`listening on port ${apiPort}...`));
