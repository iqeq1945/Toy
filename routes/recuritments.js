// routes/Study.js

var express = require('express');
var router = express.Router;
var Recruiment = require('../models/Recruitment');

// Index
router.get('/',function(req,res){
    Recruiment.find({})
    .sort('-createAt')
    .exec(function(err,recruiments){
        if(err) return res.json(err);
        res.render('recruitments/index',{recruitments:recruitments});
    });
});

// new
router.get('/new',function(req,res){
    res.render('recruitments/new');
});

//create
router.post('/', function(req,res){
    Recruiment.create(req.body,function(err,recruitment){
        if(err) return res.json(err);
        res.redirect('/recruitments');
    });
});

//show
router.get('/:id',function(req,res){
    Recruiment.findOne({_id:req.params.id},function(err, recruitment){
        if(err) return res.json(err);
        res.render('recruitments/show',{recruitment:recruitment});
    });
});

// edit
router.get('/:id/edit', function(req, res){
    Recruiment.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('recruitments/edit', {recruitment:recruitment});
    });
  });

// update
router.put('/:id', function(req, res){
    req.body.updatedAt = Date.now(); //2
    Recruiment.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect("/recruiments/"+req.params.id);
    });
  });
  
  // destroy
  router.delete('/:id', function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/recruitments');
    });
  });
  
  module.exports = router;  