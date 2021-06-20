const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Journal = new Schema(
  {
    date: { type: String, required: true },
    submission: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journals", Journal);
