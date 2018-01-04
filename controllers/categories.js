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

router.delete('/:id', function(req, res){
  console.log('delete route. ID= ', req.params.id);
  db.category.destroy({
    where: {id: req.params.id}
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('sucesss');
  }).catch(function(err){
    console.log('An error happened', err);
    res.send('fail');
  });
});

module.exports = router;