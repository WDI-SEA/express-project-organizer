var express = require('express');
var db = require('../models');
var router = express.Router();

router.get("/", function(req,res){
	db.tag.findAll().then(function(category){
		res.render("tags/tags", {category: category}); //foldertags/filetags
	});
});

router.get("/:id", function(req,res){
	db.tag.findOne({
		where: {id: req.params.id},
		include: [db.post]
	}).then(function(category){
		res.render("category/show", {category: category});
	});
});

module.exports = router;