var express = require('express');
// var async = require('async');
var db = require('../models');
var router = express.Router();


router.get('/', function(req, res){
	db.category.findAll().then(function(categories){
		res.render('categories/all', {categories:categories});
	});
});

router.get('/:id', function	(req, res){
	db.category.findOne({
		where: {id: req.params.id},
		include: [db.project]

	}).then(function(category){
		res.render('categories/single', {category: category});
	})
	 .catch(function(error) {
    res.status(400).render('main/404');
  });
});




// router.get('/:id', function(req, res) {
//   db.project.find({
//     where: { id: req.params.id }
//   })
//   .then(function(project) {
//     if (!project) throw Error();
//     res.render('projects/show', { project: project });
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });




module.exports = router;


