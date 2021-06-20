const Movie = require("../models/movie");
const Series = require("../models/series");
const Song = require("../models/song");
const User = require("../models/user");

exports.getHomePage = async (req, res, next) => {
  if (req.userId) {
    const movies = await Movie.find();
    const series = await Series.find();
    const songs = await Song.find();
    const user = await User.findById(req.userId);
    const favMovies = await Movie.find({ _id: { $in: user.favMovies } });
    const favSeries = await Series.find({ _id: { $in: user.favSeries } });
    const favSongs = await Song.find({ _id: { $in: user.favSongs } });

    return res.json({
      message: "USER LOGGED IN",
      isUserLoggedIn: true,
      movies: movies,
      series: series,
      songs: songs,
      favMovies: favMovies,
      favSeries: favSeries,
      favSongs: favSongs,
    });
  }
};
