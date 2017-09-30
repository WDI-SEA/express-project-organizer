var express = require('express');
var db = require('../models');
var router = express.Router();


router.get('/', function(req, res) {
  db.category.findAll({

  }).then(function(categories) {
    res.render('categories/showCategories', {categories: categories});
  })
  .catch(function(error) {
    console.log(error);
    res.status(400).render('main/404');
  });
});


router.post('/', function(req,res){
  db.category.create({
    name: req.body.category
  }).then(function(){
    res.redirect('/categories');
  })
})

module.exports = router;
