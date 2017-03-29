pry = require('pryjs');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var db = require('./db');
var hbs = require('hbs');
// var fs = require('fs');
// var im = require('imagemagick');
mongoose.connect('mongodb://localhost/popUps');

//here are all of my requires for my data that I need


var app = express();


// //code that I found from a helpful article and I want to see if it would work in my project
// var form = "<!DOCTYPE HTML><html><body>" +
// "<form method='post' action='/images' enctype='multipart/form-data'>" +
// "<input type='file' name='imageupload' id='imageupload'/>" +
// "<input type='submit' /></form>" +
// "</body></html>";

// app.get('/', function (req, res){
//   res.writeHead(200, {'Content-Type': 'text/html' });
//   res.end(form);  
// });

// app.post('/images', function(req, res) {
//   fs.readFile(req.files.image.path, function (err, data) {
//     var imageName = req.files.image.name
// if(!imageName){
//       console.log("There was an error")
//       res.redirect("/");
//       res.end();
//     } else {
//       var newPath = __dirname + "/public/images/fullsize/" + imageName;
//       var thumbPath = __dirname + "/public/images/thumbs/" + imageName;
//       // write file to uploads/fullsize folder
//       fs.writeFile(newPath, data, function (err) {
//         im.resize({
//           srcPath: newPath,
//           dstPath: thumbPath,
//           width:   200
//         }, function(err, stdout, stderr){
//           if (err) throw err;
//           console.log('resized image to fit within 200x200px');
//         });
//         // let's see it
//         res.redirect("/images/fullsize/" + imageName);
//       });
//     }
//   });
// });
// app.get('/images/fullsize/:file', function (req, res){
//   file = req.params.file;
//   var img = fs.readFileSync(__dirname + "/images/fullsize/" + file);
//   res.writeHead(200, {'Content-Type': 'image/jpg' });
//   res.end(img, 'binary');

// });
// app.get('/images/thumbs/:file', function (req, res){
//   file = req.params.file;
//   var img = fs.readFileSync(__dirname + "/images/thumbs/" + file);
//   res.writeHead(200, {'Content-Type': 'image/jpg' });
//   res.end(img, 'binary');
// });








// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));

//here are the things that I need to use so that I can access that data

var index = require('./routes/index');
var users = require('./routes/users');
var popUps = require('./routes/popUps');
var sessions = require('./routes/sessions');

//here are my routes that I need to require so that my content can connect to them.

app.use('/', index);
app.use('/users', users);
app.use('/popUps', popUps);
app.use('/sessions', sessions);

//I use my routes by calling those variables and putting the path they would go on to find
//those files

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//if the server goes through all of those routes and can't find something that I listed, 
//it will give me the error above

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

