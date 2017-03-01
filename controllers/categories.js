var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	db.category.findAll()
	.then(function(categories) {
		res.render('categories', {categories: categories})
	});
})
router.get('/:id', function(req, res) {
	db.category.find({
		where: {id: req.params.id},
		include: [db.project]
	})
	.then(function(categories) {
		if (!categories) throw Error();
		res.render('showCategory', {categories: categories});
	})
	.catch(function(error) {
		res.status(400).render('main/404');
	});
});

module.exports = router;