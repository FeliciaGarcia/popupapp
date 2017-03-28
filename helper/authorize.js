var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function createPassword(req, res, next) {
  var password = req.body.password;
  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next();
}

function signinUser(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
  .then(function(foundUser) {
    if (foundUser === null) {
      res.json({status: 404, data: "unauthorized"});
    } else if (bcrypt.compareSync(password, foundUser.password_digest)) {
      req.session.currentUser = foundUser;
    }
    next();
  })
  .catch(function(err) {
    res.json({status: 500, data: err});
  });
}

function authorized(req, res, next) {
  var currentUser = req.session.currentUser
  if (!currentUser || currentUser._id !== req.params.id) {
    res.send({status: 404})
  } else {
    next()
  }
};
module.exports = {
  createPassword: createPassword,
  signinUser: signinUser,
  authorized: authorized
};