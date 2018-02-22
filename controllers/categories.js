var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

router.get('/', function(req, res){
  db.category.findAll().then(function(cats){
    res.render("categories/showAll", {cats: cats});
  })
})

router.get('/:id', function(req, res){
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  })
  .then(function(cat){
    console.log(cat)
    res.render("categories/detail", {cat: cat});
  });
});


module.exports = router;
