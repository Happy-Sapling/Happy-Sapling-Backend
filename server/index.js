const express = require("express");
const cors = require("cors");

const app = express();
const apiPort = 3000;

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
