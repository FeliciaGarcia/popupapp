var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authHelpers = require('../helper/authorize.js');

router.get('/login', function(req, res) {
  res.render('/login.hbs');
});

router.post('/login', authHelpers.loginUser, function(req, res){
  res.redirect('/users/' + req.session.currentUser._id);
  // res.redirect('/users');
});

router.delete('/', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});

module.exports = router;