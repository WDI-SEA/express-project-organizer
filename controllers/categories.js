var express = require('express');
var db = require('../models');
var router = express.Router();


// GET /categories - display all categories

router.get('/', function(req, res) {
	db.category.findAll().then(function(data) {
		res.render('categories/index', {categories: data});
	});	
});

router.get('/:id', function(req, res) {
	db.category.find({
		where: {id: req.params.id},
		include: [db.project]
	}).then(function(cat) {
		res.render('categories/show', {cat: cat});
	})
});

module.exports = router;
