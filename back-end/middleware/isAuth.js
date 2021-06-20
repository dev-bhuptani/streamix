const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.json({ message: "TOKEN IS MISSING", isUserLoggedIn: false });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "dev's.secret.key");
  } catch (err) {
    console.log(err);
    return res.json({
      message: "SOMETHING WENT WRONG!",
      isUserLoggedIn: false,
    });
  }
  if (!decodedToken) {
    return res.json({
      message: "INVALID TOKEN / USER NOT LOGGED IN",
      isUserLoggedIn: false,
    });
  }
  req.userId = decodedToken.userId;
  next();
};
