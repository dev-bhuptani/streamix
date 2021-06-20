const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  artists: {
    type: String,
    // required: true,
  },
  releasedOn: {
    type: Date,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Song", songSchema);
