var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

router.get('/', function(req,res) {
	db.category.findAll().then(function(categories) {
		res.render('categories/allCategories', {categories: categories});
	});
});

// get particular/single category by id
router.get('/:id', function(req, res) {
	db.category.findOne({
		where: {id: req.params.id},
		//include this bc we want to list all 
		//titles of projects w this specific category
		include: [db.project]
	}).then(function(category) {
		res.render('categories/show', {category: category});
	});
});

//get edit form
router.get('/:id/edit', function(req, res){
	db.category.findById(req.params.id).then(function(category) {
		res.render('categories/edit', {category:category});
	});
});

// edit a particular category by id
router.put('/:id', function(req, res) {
	db.category.update({
		name: req.body.name
	}, {
		fields: ['name'],
		where: {id: req.params.id}
	}).then(function(category) {
		res.send('success');
	})
});

// delete a category by id
router.delete('/:id', function(req, res) {
	db.category.findOne({
		where: {id: req.params.id},
		include: [db.project]
	}).then(function(category){
		//remove relationship between project and category
		//use async again
		//loop thru and delete entries in join table
		async.forEach(category.projects, function(project, callback) {
			//this is my iterator function
			//model1.removeModel2(instanceofModel2)
			category.removeProject(project);
			callback();
		}, function(){
			//function that executes when 
			//all callbacks have returned
			db.category.destroy({
				where: {id: req.params.id}
			}).then(function(deletedCategory) {
				res.send('All good');
			});
		}); //end of async call
	}); //end of then promise
}); //end of router.delete

module.exports = router;