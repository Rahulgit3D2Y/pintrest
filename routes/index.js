var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.authenticate(new localStrategy(userModel.authenticate()));
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});
router.get("/profile", isLoggedIn, function (req, res, next) {
  res.send("profile");
});
router.post("/register", (req, res) => {
  const { username, email, fullName } = req.body;
  const userData = new userModel({ username, email, fullName });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}
module.exports = router;
