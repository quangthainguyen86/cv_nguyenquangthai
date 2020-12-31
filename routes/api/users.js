const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Item Model
const User = require("../../models/User");
const { response } = require("express");

// @route POST api/users
// @desc Register New User
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }

  //Check for existing user
  User.findOne({ email: email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: "User already exists" });

      const newUser = new User({
        name,
        email,
        password,
      });

      //Hash Password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              {
                expiresIn: 3600,
              },
              (err, token) => {
                if (err) throw err;

                res.json({
                  token: token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "DB connection error" });
    });
});

module.exports = router;
