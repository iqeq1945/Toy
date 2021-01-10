// model/Recruiment.js

var mongoose = require('mongoose');

// schema
var recruitmentSchema = mongoose.Schema({
  title:{type:String, required:[true, 'Title is required!']},
  body:{type:String, required:[true, 'Body is required!']},
  tag:[String],
  author : {type:mongoose.SchemaTypes.ObjectId, ref:'user' ,required:true},
  createdAt:{type:Date, default:Date.now}, 
  updatedAt:{type:Date},
});

// model & export 
var Recruitment = mongoose.model('recruitment',recruitmentSchema);
module.exports = Recruitment;