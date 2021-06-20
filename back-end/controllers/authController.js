const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.json({ message: "USER DOESN'T EXISTS" });
        return Promise.reject("USER DOESN'T EXISTS");
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        res.json({ message: "WRONG PASSWORD" });
        return Promise.reject("WRONG PASSWORD");
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id },
        "dev's.secret.key",
        { expiresIn: "1m" }
      );
      res.json({ token: token, userId: loadedUser._id });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postSignUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (!password === confirmPassword) {
    return res.json("Password and confirm password doesn't match");
  }

  User.find({ email: email })
    .then(userDoc => {
      if (userDoc.length > 0) {
        console.log("USER ALREADY EXISTS");
        res.json({ message: "User already exists!" });
      } else {
        bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
              favMovies: [],
              favSeries: [],
              favSongs: [],
            });

            return user.save();
          })
          .then(result => {
            console.log("USER SAVED!!!");
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
