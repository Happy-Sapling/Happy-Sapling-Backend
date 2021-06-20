const express = require("express");
const cors = require("cors");

const app = express();
const apiPort = 9000;

const db = require("./db");
const userRouter = require("./routes/user-router");
const journalRouter = require("./routes/journal-router");
const trophyRouter = require("./routes/trophy-router");

var corsOptions = {
  origin: "http://localhost:9001",
};

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Welcome to Happy Sapling!");
});

app.use("/api", userRouter, journalRouter, trophyRouter);

app.listen(apiPort, () => console.log(`listening on port ${apiPort}...`));
