const express = require("express");
const router = express.Router();

const Followers = require("./followers.js");

const auth = require("../../middleware/auth.js");

router.post("/", (req, res, next) => {
  Followers.add(req.body)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.delete("/", (req, res, next) => {
  Followers.remove(req.body)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.get("/followers/:id", (req, res, next) => {
  const id = req.params.id;
  const full = req.query.full || false;
  Followers.getFollowers(id, full)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.get("/following/:id", (req, res, next) => {
  const id = req.params.id;
  const full = req.query.full || false;
  Followers.getFollows(id, full)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.get("/isFollowing/:id", (req, res, next) => {
  const id = req.params.id;
  const jwt = req.cookies.jwt;
  if (!id || !jwt) next({ message: "Invalid parameters" });
  else {
    auth
      .verify(jwt)
      .then((response) => {
        Followers.isFollowing(response.id, id)
          .then((response) => res.send(response))
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
});
module.exports = router;
