var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

router.get('/', function(req,res){
	res.send('get route reached for categories');
});

router.get('/:id', function(req,res){
	db.category.findOne({
		where: {id: req.params.id},
		include: [db.project]
	}).then(function(category){
		if(!category) throw Error();
		res.render('categories/show', {result: category});
	}).catch(function(error){
		res.status(400).render('main/404');
	});
});

router.delete('/:id', function(req,res){
	res.send('delete route reached for individual category');
});

module.exports = router;