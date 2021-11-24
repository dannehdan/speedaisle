const { response } = require("express");
var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const cookieParser = require("cookie-parser");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID ="588116689693-af8duu5dpqicmdai7ovfrcr5ii9bl4qb.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

function checkAuthenticated(req, res, next) {
  let token = req.cookies["session-token"];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
  }
  verify()
    .then(() => {
      req.user = user;
      next();
    })
    .catch((err) => {
      res.redirect("/");
    });
}

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.post("/", (req, res, next) => {
  let token = req.body.token;

  let userId;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    userId = payload["sub"];

    const existingList = await prisma.lists.findFirst({
      where: { ownerId: userId },
    });

    if (existingList) {
      return;
    } else {
      await prisma.lists.create({ data: { ownerId: userId } });
    }
  }
  verify()
    .then(() => {
      res.cookie("userId", userId);
      res.cookie("session-token", token);
      res.send("success");
    })
    .catch(console.error);
});

router.get("/logout", checkAuthenticated, (req, res) => {
  res.clearCookie("session-token");
  res.cookie("userId");
  res.redirect("/");
});


module.exports = router;
