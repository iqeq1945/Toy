// routes/Study.js

var express = require('express');
var router = express.Router();
var Recruitment = require('../models/Recruitment');

// Index 
router.get('/', function(req, res){
  Recruitment.find({})                  // 1
  .sort('-createdAt')            // 1
  .exec(function(err, recruitments){    // 1
    if(err) return res.json(err);
    res.render('recruitments/index_test', {recruitments:recruitments});
  });
});

// new
router.get('/new',function(req,res){
    res.render('recruitments/new');
});

//create
router.post('/', function(req,res){
    Recruitment.create(req.body,function(err,recruitment){
        if(err) return res.json(err);
        res.redirect('/recruitments');
    });
});

//show
router.get('/:id',function(req,res){
    Recruitment.findOne({_id:req.params.id},function(err, recruitment){
        if(err) return res.json(err);
        res.render('recruitments/show',{recruitment:recruitment});
    });
});

// edit
router.get('/:id/edit', function(req, res){
    Recruitment.findOne({_id:req.params.id}, function(err, recruitment){
      if(err) return res.json(err);
      res.render('recruitments/edit', {recruitment:recruitment});
    });
  });

// update
router.put('/:id', function(req, res){
    req.body.updatedAt = Date.now(); //2
    Recruitment.findOneAndUpdate({_id:req.params.id}, req.body, function(err, recruitment){
      if(err) return res.json(err);
      res.redirect("/recruitments/"+req.params.id);
    });
  });
  
  // destroy
  router.delete('/:id', function(req, res){
    Recruitment.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/recruitments');
    });
  });
  
  module.exports = router;  