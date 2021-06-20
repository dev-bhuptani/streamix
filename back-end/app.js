const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const homePageRoutes = require("./routes/homePage");
const entertainmentRoutes = require("./routes/entertainment");
const entRoutes = require("./routes/ent");
const Movie = require("./models/movie");
const Series = require("./models/series");
const Song = require("./models/song");
const movies = require("./data/movies");
const series = require("./data/series");
const songs = require("./data/songs");

const app = express();

const MongoDB_URI =
  "mongodb+srv://dev:dev1210@node.idgpt.mongodb.net/streamix?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes);
app.use(homePageRoutes);
app.use(entertainmentRoutes);
app.use(entRoutes);

mongoose
  .connect(MongoDB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async result => {
    console.log("CONNECTED TO DB!!!");
    const movs = await Movie.find();
    if (movs.length > 0) {
      return Promise.resolve();
    }
    return Movie.insertMany(movies.movies);
  })
  .then(async result => {
    const sers = await Series.find();
    if (sers.length > 0) {
      return Promise.resolve();
    }
    return Series.insertMany(series.series);
  })
  .then(async result => {
    const sos = await Song.find();
    if (sos.length > 0) {
      return Promise.resolve();
    }
    return Song.insertMany(songs.songs);
  })
  .then(result => {
    app.listen(8080);
  });
