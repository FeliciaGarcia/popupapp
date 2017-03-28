var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/popUps');

var User = require('../models/user');
var popUps = require('../models/popUp');

// Use native promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
popUps.remove({}, function(err){
  console.log(err);
});
User.remove({}, function(err){
  console.log(err);
});

var firstPopUp = new popUps({
    name: 'Everybody Loves Ramen',
    cuisine: 'asian',
    location: 'Atlanta',
    hours: 'Sundays',
    photo: 'caption'
});
var Neysa = new User({
  firstname: 'Neysa',
  username: 'neysa21',
});

firstPopUp.save(function(err) {
  if (err) console.log(err);
  console.log('popUps created!');
});



