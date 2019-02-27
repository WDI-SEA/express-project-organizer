var express = require("express");
var db = require("../models");
var router = express.Router();

// GET /categories - get all categories
router.get("/", (req, res) => {
  db.category.findAll().then(categories => {
    res.render("categories/index", { categories });
  });
});

// GET /categories/:name - get one category
router.get("/:id", (req, res) => {
  db.category
    .find({
      where: { id: req.params.id }
    })
    .then(category => {
      category.getProjects().then(projects => {
        // res.send(projects);
        res.render("categories/show", { category, projects });
      });
    });
});

module.exports = router;
