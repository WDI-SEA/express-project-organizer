var express = require('express');
var router = express.Router();
var db = require('../models');


router.get('/', function(req,res){
	db.catagory.findAll({
		include: [db.categoriesprojects]
	}).then(function(category){
	// res.render('');	
	});
});
