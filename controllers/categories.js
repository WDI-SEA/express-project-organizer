var express = require('express');
var db = require('../models');
var router = express.Router();

// GET - /categories - gets all categories
router.get("/", function(req, res) {
	db.category.findAll().then(function(data) {
		res.render("categories/index", {categories: data});
	});
});

router.get("/:id", function(req, res) {
	db.category.findById(req.params.id).then(function(category) {
		category.getProjects().then(function(projects) {
			res.render("categories/show", {category: category, projects: projects});
		});
	});
});

module.exports = router;