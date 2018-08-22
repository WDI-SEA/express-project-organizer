var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
	db.category.findAll({
		include: [db.project]
	}).then(function(categories) {
		res.render('categories/index.ejs', { categories: categories });
	});
});

router.get('/:id', function(req, res) {
	db.category.findOne({
		where: { id: req.params.id },
		include: [db.project]
	}).then(function(category) {
		res.render('categories/single', { category: category });
	});
});

module.exports = router;