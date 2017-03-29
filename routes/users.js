var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helper/authorize.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({})
        .exec(function(err, users) {
            if(err) console.log(err);

            console.log(users);
            // res.send(users);
            res.render('users/index', {
                  users: users,
                   currentUser: req.session.currentUser
            });
        });
});

// new user
router.get('/signup', function(req, res){
  res.render('users/signup.hbs');
});


//edit User
router.get("/:id/edit", function(req, res) {
  User.findById(req.params.id)
    .exec(function(err, user) {
      if(err) {console.log(err); }
      res.render("users/edit", {
        user: user
      });
    });
});
// update users
router.patch('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {
    firstname: req.body.firstname,
    username: req.body.username,
    password: req.body.password
  }, 
  	{ new: true })
  .exec(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.render('users/show.hbs', {
      user : user

    });
  });
});
router.post('/', authHelpers.createPassword, function(req, res){
  var user = new User({
    firstname: req.body.firstname,
    username: req.body.username,
    password: req.body.password,
    password_digest: res.hashedPassword

  });
  //this is my post route to create  log in information

  user.save(function(err, user){
    if (err) console.log(err);
    console.log(user);
    console.log(req.session.currentUser);
    res.redirect('/users');
   });
});

//show users
router.get("/:id", authHelpers.authorized, function(req, res) {
  User.findById(req.params.id)
    .exec(function(err, user) {
      if (err) { console.log(err); }
      res.render("users/show", {
        user: user,
        currentUser: req.session.currentUser
      });
    });
});




module.exports = router;
