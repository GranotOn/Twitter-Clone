const express = require("express");
const router = express.Router();

const User = require("./user.js");
const auth = require("../../middleware/auth.js");

// /api/v1/user
// next({ status: 400, message: "hey" }); catch with err.response.data.message

router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/getProfile", (req, res, next) => {
  const jwt = req.cookies.jwt;
  auth
    .verify(jwt)
    .then(({ id }) => {
      return User.searchId(id)
        .then((data) => {
          res.send(data[0])
        })
        .catch((error) => next({ status: 404, message: error.message }));
    })
    .catch((error) => next(error));
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  res.send("patching a user");
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  User.deleteById(id)
    .then((data) => res.send(data))
    .catch((error) => next({ status: 404, message: error.message }));
});

router.post("/auth", (req, res, next) => {
  User.authenticate(req.body)
    .then((token) => {
      const cookieOptions = {
        expires: new Date(Date.now() + 48 * 60 * 60 * 1000), // Expires in 48 hours
        httpOnly: true,
      };

      // In production, to ensure sending via HTTPS only
      if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
      res
        .cookie("jwt", token, cookieOptions)
        .status(200)
        .json({ message: "success" });
    })
    .catch((error) => next({ status: 400, message: error.message }));
});

module.exports = router;
