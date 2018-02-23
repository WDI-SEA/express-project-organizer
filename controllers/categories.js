var express = require('express');
var db = require('../models'); //('./modles') may be redundant but . is essential for it to look at a folder, not to find a node module
var router = express.Router();
var async = require('async');

//get all tags
//route get '/tags'
router.get('/', function (req, res) {
	db.category.findAll().then(function(items) {
		res.render('categories/allCategories', {categories: items})
	})
})

//get particular tag by id
router.get('/:id', function(req, res) {
	db.category.findOne({
		where: {id: req.params.id},
		include: [db.project]
	}).then(function(data) {
		res.render('categories/show', {category: data});
	})
})

module.exports = router;