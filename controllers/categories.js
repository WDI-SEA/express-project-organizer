var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	db.category.findAll().then(function(categories) {
		res.render('categories/main', { categories: categories});
	});
});

router.get('/:id', function(req, res) {
	db.category.find({
		where: {id: req.params.id}
	}).then(function(category){
		res.render('categories/show', {projects: projects, category: category })
	});
});

module.exports = router;