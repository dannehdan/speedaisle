const express = require("express");
const router = express.Router();
const checkAuthenticated = require('../models/checkauth');

const { PrismaClient } = require("@prisma/client");
const {OAuth2Client} = require('google-auth-library');

const prisma = new PrismaClient();
const CLIENT_ID = '588116689693-af8duu5dpqicmdai7ovfrcr5ii9bl4qb.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

function googleAuth(req, res) {
  let token = req.body.token;

  let userId;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
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
}


router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.post("/", googleAuth);

router.get("/logout", checkAuthenticated, (req, res) => {
  res.clearCookie("session-token");
  res.cookie("userId");
  res.redirect("/");
});


module.exports = router;
