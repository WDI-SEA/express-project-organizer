var async = require('async');
var express = require('express');
var db = require('../models');
var router = express.Router();


router.get('/', function(req, res) {
  db.category.findAll()
        .then(function(categories) {
          res.render('categories/index', { categories: categories });
        })
        .catch(function(error) {
          res.status(400).render('main/404');
        });
});

module.exports = router;

router.get('/:id', function (req, res) {
	db.category.find({
		where: { id: req.params.id },
		include: [db.project]
	})
	.then(function(category) {
		res.render('categories/show', {category: category});
	})
	.catch(function(error){
		res.status(400).render('main/404');
	});

});