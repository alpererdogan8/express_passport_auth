const router = require("express").Router();
const userService = require("../services/userService");
const passportConfig = require("../config/passportConfig");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.use(passportConfig.initialize());
router.use(passportConfig.session());

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  return next();
};

router.get("/", isAuth, (req, res) => {
  res.send({ status: "OK", path: "Auth" });
});

router.get("/user", isAuth, async (req, res) => {
  const result = await userService.findUser("admin");
  res.send(result);
});

router.get("/private", isAuth, (req, res) => {
  res.send("Hey");
});
router.get("/private/:user", isAuth, async (req, res) => {
  const { user } = req.params;
  try {
    const name = await userService.findUser(user);
    res.send(`Welcome ${name.username}`);
  } catch (error) {
    res.status(404).send({ status: 404 });
  }
});
router.get("/error", (req, res) => {
  res.send("Wrong Login");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userFeedback = await userService.registerUser(username, password);
  res.send(userFeedback);
});

router.post(
  "/login",
  passportConfig.authenticate("local", {
    successRedirect: "user",
    failureRedirect: "error",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
