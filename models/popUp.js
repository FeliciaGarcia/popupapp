var mongoose = require('mongoose');
var Schema = require("../db/schema.js");


var popUp = Schema.popUp;

// mongoose.promise = global.Promise;

// var popUpSchema = new Schema({
//     name: String,
//     cuisine: String,
//     location: String,
//     hours: String,
//     photo: String
// });

// popUpSchema.pre('save', function(next){
//     now = new Date();
//     this.updated_at = now;
//     if ( !this.created_at ) {
//         this.created_at = now;
//     }
//     next();
// });

// popUpSchema.virtual('nameOfPopUp').get(function () {
//     return this.name + ' ' ;
// });

// var popUpsModel = mongoose.model("PopUp", popUpSchema);
module.exports = popUp;
