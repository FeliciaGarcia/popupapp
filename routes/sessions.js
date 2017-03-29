var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authHelpers = require('../helper/authorize.js');
//I'm requiring all of the routes that I need here
router.get('/login', function(req, res) {
  res.render('users/login.hbs');
  // res.redirect('/users/login.hbs');
});
// router.get('/signup', function(req, res){
//   res.render('users/signup.hbs');
// });
//this will take you to the log in page and begin your session as the user
//that you created
router.post('/login', authHelpers.signinUser, function(req, res){
  res.redirect('/users/' + req.session.currentUser._id);
  // res.redirect('/users');
});
//this function will be connected to the sign-out button which should
//destroy your session and force you to log back in
router.delete('/', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});

module.exports = router;