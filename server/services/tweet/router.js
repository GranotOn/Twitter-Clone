const express = require("express");
const router = express.Router();

const Tweet = require("./tweet.js");
const auth = require("../../middleware/auth");
const chainError = require("../../helpers/chainError.js");

const isEmpty = (obj) => obj === undefined || Object.keys(obj).length === 0;
// /api/v1/tweet

router.post("/", (req, res, next) => {
  const jwt = req.cookies.jwt;
  if (!jwt)
    next({ status: 401, message: "You must be logged in for this action" });

  auth
    .verify(jwt)
    .then(
      (data) =>
        Tweet.createTweet({ content: req.body.content, creator_id: data.id }),
      chainError
    )
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.get("/feed", (req, res, next) => {
  const jwt = req.cookies.jwt;
  if (!jwt) next({status: 401, message: "Not logged in"});
  auth
    .verify(jwt)
    .then((response) => {
      const uid = response.id;
      const { limit, offset } = req.query;


      if (!limit || !offset)
        next({ status: 400, message: "Invalid parameters" });

      Tweet.getFeed(uid, limit, offset)
        .then((response) => res.status(200).send(response))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

router.get("/getTweetsByUser/:id", (req, res, next) => {
  console.log("test");
  const id = req.params.id;
  Tweet.getTweetsByUser(id)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Tweet.getTweetFromId(id)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Tweet.remove(id)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  var arr = [];

  for (let [key, value] of Object.entries(data)) {
    if (key === "content") value = `'${value}'`;
    arr.push(`${key} = ${value}`);
  }

  const query_string = arr.join(", ");

  Tweet.update(id, query_string)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
});

router.get("/", (req, res, next) => {
  if (isEmpty(res.query))
    next({ status: 400, message: "Invalid query parameters" });
  else res.send(req.query);
});

module.exports = router;
