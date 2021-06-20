const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favMovies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  favSeries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Series",
    },
  ],
  favSongs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
