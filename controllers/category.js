var express = require('express');
var db = require('../models');
var async =require("async");
var router = express.Router();


router.get("/all", function(req, res){
	db.category.findAll().then(function(categories){
		res.render("categories/all", {categories: categories});
	})

});


router.get("/:id", function(req, res){
	db.category.findOne({
		where: {id: req.params.id},
		include: [db.project]
	}).then(function(category){
		res.render("categories/single", {category: category});
	});
});

router.delete("/:id", function(req, res){
  console.log("delete route. ID = ", req.params.id);
  db.category.destroy({
    where:  {id: req.params.id}
  }).then(function(deleted){
    console.log("delete = ", deleted);
    res.send("success");
  }).catch(function(err){
    console.log("an error", err);
    res.send("fail");
  });
});


module.exports = router;