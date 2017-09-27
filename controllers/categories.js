var express = require('express');
var db = require('../models');
var router = express.Router();

//GET route -- display all of the categories
router.get("/", function(req, res){
  db.category.findAll().then(function(category){
    res.render("categories/index", {category: category});
  })
});

router.get("/:id", function(req, res){
  db.category.find({
    where: {id: req.params.id},
    include: [db.project]
  })
  .then(function(category){
    res.render("categories/show", {category: category});
  });
});

module.exports = router;
