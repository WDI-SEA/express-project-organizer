var express = require('express');
var db = require('../models');
var router = express.Router();


//GET /categories display all categories -- COMPLETE
router.get('/',function(req, res) {
  db.category.findAll().then(function(categories){
    // res.send(category);
    res.render('categories/categories', {categories: categories});
  }).catch(function(error){
    res.send("categories controller error");
  });
});


//get specific category and show all projects associated
router.get('/:id', function(req, res) {
  db.category.find({
    where: { id: req.params.id },
    include: [db.project]
  }).then(function(list) {
    res.render('categories/cShow.ejs', { list: list });
  });
});

module.exports = router;