const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome Guest");
});
router.get("/name=:name", (req, res) => {
  const { name } = req.params;
  res.send(`What's up ${name}?`);
});

router.get("/info", (req, res) => {
  const authEnpoints = {
    authInfo: {
      api: "http://localhost:9000/api/v1/auth/",
      login: "/login",
      userData: "/user",
      privateData: "/private",
      privateNameControl: "private/<username>",
    },
  };

  res.json(authEnpoints);
});
module.exports = router;
