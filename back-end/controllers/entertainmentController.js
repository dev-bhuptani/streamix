const User = require("../models/user");
const Movie = require("../models/movie");
const Series = require("../models/series");
const Song = require("../models/song");

exports.postEntertainment = (req, res, next) => {
  entertainmentType = req.body.entertainmentType;
  User.findById(req.userId).then(async user => {
    if (!user) {
      return res.json({ message: "User doesn't exists" });
    }
    const temp = user[entertainmentType].find(
      ent => ent.toString() === req.body.entId.toString()
    );
    let model;
    if (entertainmentType === "favMovies") {
      model = Movie;
    } else if (entertainmentType === "favSeries") {
      model = Series;
    } else {
      model = Song;
    }
    if (req.body.add) {
      if (!temp) {
        user[entertainmentType].push(req.body.entId);
        user.save().then(async result => {
          const favEnt = await model.find({
            _id: { $in: user[entertainmentType] },
          });
          res.json({
            message: "Entertainment added",
            favEnt: favEnt,
          });
        });
      } else {
        return res.json({
          message: "Movie is already added to fav list",
          favEnt: "already there",
        });
      }
    } else {
      if (temp) {
        const entIndex = user[entertainmentType].findIndex(ent => {
          return ent._id.toString() === req.body.entId.toString();
        });
        user[entertainmentType].splice(entIndex, 1);
        user.save().then(async result => {
          const favEnt = await model.find({
            _id: { $in: user[entertainmentType] },
          });
          res.json({
            message: "Movie removed from the fav list",
            favEnt: favEnt,
          });
        });
      }
    }
  });
};
