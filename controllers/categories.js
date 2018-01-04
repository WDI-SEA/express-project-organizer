var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

router.get('/', function(req, res){
	db.category.findAll().then(function(categories){
		res.render('categories/all', {categories: categories});
	});
});

router.get('/:id', function(req, res){
	db.category.findOne({
		where: {id: req.params.id},
		include: [db.project]
	}).then(function(categories){
		res.render('categories/single', {categories: categories});
	});
});

router.delete('/:id', function(req, res){
	db.category.findOne({
		where: {id: req.params.id},
		include: [db.project]
	}).then(function(category){
		async.forEach(category.projects, function(p, callback){
			category.removeProject(p);
			callback(null);
		}, function(){
			db.category.destroy({
				where: {id: req.params.id}
			}).then(function(deletedItem){
				res.send('all good');
			}); 
		});
	});
});

module.exports = router;