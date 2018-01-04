var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/all', function(req, res){
  db.category.findAll().then(function(categories){
    res.render('categories/all', {categories: categories});
  });
});





module.exports = router;
