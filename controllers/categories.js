var express = require('express');
var db = require('../models');
var router = express.Router();

//GET /categories - show all the categories that exist
router.get("/", function(req, res) {
  // res.send("it made it to the controller");
  db.category.findAll().then(function(categories) {
    res.render("categories/show", {categories: categories});
  });
});

//GET /categories/:id - show a specific category and all the projects with that category
router.get("/:id", function(req, res) {
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  }).then(function(category) {
    res.render("categories/single", {category: category});
  });
});

// router.get("/", function(req, res) {
//   db.tag.findAll().then(function(tags) {
//     res.render("tags/all", {tags: tags});
//   });
// });

// router.get("/:id", function(req, res) {
//   db.tag.findOne({
//     where: {id: req.params.id},
//     include: [db.article]
//   }).then(function(tag) {
//     res.render("tags/single", {tag: tag});
//   });
// });

module.exports = router;
