const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("./mongo-connection");
const logger = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const { auth, guest } = require("./router");
const URL = 9000 ;


app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(
  session({
    secret: "sosecretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("sosecretcode"));
app.use("/api/v1/auth", auth);
app.use("/guest", guest);

app.get("/", (req, res) => {
  res.redirect("/guest");
});

app.listen(URL, () => {
  console.log(`Starting Server http://localhost:${URL}`);
});
