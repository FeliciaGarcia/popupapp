var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/popUps');

var popUps = require("./models/popUp");

mongoose.promise = global.Promise;

popUps.remove({}, function(err) {
    console.log(err);
});

var firstPopUp = new popUps({
    name: 'Everybody Loves Ramen',
    cuisine: 'asian',
    location: 'Atlanta',
    hours: 'Sundays',
    photo: 'Insert photo here'
});

firstPopUp.save(function(err) {
  if (err) console.log(err);

  console.log('Everybody Loves Ramen!');
});
