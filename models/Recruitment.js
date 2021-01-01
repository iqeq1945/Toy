// model/Recruiment.js

var mongoose = require('mongoose');

// schema
var recruitmentSchema = mongoose.Schema({
  title:{type:String, required:true},
  body:{type:String, required:true},
  createdAt:{type:Date, default:Date.now}, 
  updatedAt:{type:Date},
})

// model & export 
var Recruiment = mongoose.model('recruitment',recruitmentSchema);
module.exports = Recruiment;