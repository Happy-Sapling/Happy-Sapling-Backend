const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Trophy = new Schema(
  {
    submission: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trophys", Trophy);
