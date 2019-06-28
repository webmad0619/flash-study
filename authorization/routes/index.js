const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt")

/* GET home page */
router.get("/signup", (req, res) => {
  res.render("signup")
})

router.post("/signup-user", (req, res) => {
  if (req.body.password.length < 8) {
    res.render('signup', {errorMessage: "weak password"});
    return
  }

  User.
    findOne({username: req.body.username})
    .then(foundUser => {
      if (foundUser) {
        res.render('signup', {errorMessage: "user already exists! :)"});
        return
      } else {
        const saltRounds = 10
        const theSalt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(req.body.password, theSalt)
      
        User
          .create({ username: req.body.username, password: hashedPassword })
          .then(userCreatedData => {
            res.render('index', userCreatedData);
          })
      }
    })

 
})

module.exports = router;
