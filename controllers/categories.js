var express = require('express');
var router = express.Router();
var db = require('../models');
var async = require('async');


router.get('/', function(req,res){
	db.catagories.findAll({
		include: [db.categoriesprojects]
	}).then(function(categories){
	res.render('');	
	});
});

router.get('/:id', function(req,res){
	db.category.findOne({
		include: [db.category]
	})
})
