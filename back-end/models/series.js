const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  seasons: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  releasedOn: {
    type: Date,
    required: true,
  },
  endedOn: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Series", seriesSchema);
