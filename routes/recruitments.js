// routes/Study.js

var express = require('express');
var router = express.Router();
var Recruitment = require('../models/Recruitment');
var util = require('../util');

// Index 
router.get('/', function(req, res){
  Recruitment.find({})
  .populate('author')                 
  .sort('-createdAt')     
  .exec(function(err, recruitments){    
    if(err) return res.json(err);
    res.render('recruitments/index_test', {recruitments:recruitments});
  });
});

// new
router.get('/new', util.isLoggedin, function(req,res){
    var recruitment = req.flash('recruitment')[0] || {};
    var errors = req.flash('errors')[0] || {};
    res.render('recruitments/new_test',{recruitment:recruitment, errors:errors});
});

//create
router.post('/', util.isLoggedin , function(req,res){
    req.body.author = req.user._id;
    Recruitment.create(req.body,function(err,recruitment){
        if(err) {
          req.flash('recruitment', req.body);
          req.flash('errors', util.parseError(err));
          return res.redirect('/recruitments/new_test');
        }
        res.redirect('/recruitments');
    });
});

//show
router.get('/:id',function(req,res){
    Recruitment.findOne({_id:req.params.id})
    .populate('author')
    .exec(function(err,recruitment){
      if(err) return res.json(err);
      res.render('recruitments/show',{recruitment:recruitment});
    });
   
});

// edit
router.get('/:id/edit', util.isLoggedin, checkPermission, function(req, res){
  var recruitment = req.flash('recruitment')[0];
  var errors = req.flash('errors')[0] || {};
  if(!recruitment){
    Recruitment.findOne({_id:req.params.id}, function(err, recruitment){
      if(err) return res.json(err);
      res.render('recruitments/edit', {recruitment:recruitment , errors:errors});
    });
  }
  else {
    recruitment._id = req.params.id;
    res.render('recruitments/edit', {recruitment:recruitment , errors:errors});
  }
});

// update #findOneAndUpdate는 valid 검사를 하지 않아 옵션에 줌.
router.put('/:id', util.isLoggedin, checkPermission, function(req, res){
    req.body.updatedAt = Date.now(); //2
    Recruitment.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators:true}, function(err, recruitment){
      if(err) {
        req.flash('recruitment',req.body);
        req.flash('errors', util.parseError(err));
        return res.redirect('/recruitments/'+req.params.id+'/edit');
      }
      res.redirect("/recruitments/"+req.params.id);
    });
  });
  
  // destroy
  router.delete('/:id', util.isLoggedin, checkPermission, function(req, res){
    Recruitment.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/recruitments');
    });
  });
  
  module.exports = router;

  function checkPermission(req, res, next){
    Recruitment.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      if(recruitment.author != req.user.id) return util.noPermission(req, res);
  
      next();
    });
  }