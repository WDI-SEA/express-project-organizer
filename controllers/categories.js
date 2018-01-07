var express = require('express');
var db = require('../models');
var router = express.Router();



router.get('/', function(req, res){
  db.category.findAll().then(function(categories){
    // res.send(categories)
    res.render('categories/all.ejs', {categories: categories});
  });
});


router.get('/:id', function(req, res){
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  }).then(function(category){
    res.render('categories/single.ejs', {category: category})
  });
});



module.exports = router;