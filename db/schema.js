var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var popUpSchema = new Schema({
    name: String,
    cuisine: String,
    location: String,
    hours: String,
    photo: String
});
popUpSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

popUpSchema.virtual('nameOfPopUp').get(function () {
    return this.name + ' ' ;
});

var UserSchema = new Schema({
    firstname: String,
    username: String,
    password: { type: String, required: true, unique: true },
    password_digest: String,
  	created_at: Date,
  	updated_at: Date,
  	// popUps: [popUpsSchema]
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



var UserModel = mongoose.model("User", UserSchema);
var popUpModel = mongoose.model("popUp", popUpSchema);

module.exports = {
  User: UserModel,
  popUp: popUpModel
};
