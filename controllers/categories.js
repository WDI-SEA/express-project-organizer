var express = require('express');
var db = require('../models');
var router = express.Router();


// GET all categories view
router.get('/', (req, res) => {
	db.category.findAll()
	.then((categories) => {
		res.render('categories/index', { categories: categories })
	})
	.catch((err) => {
		res.status(400).render('main/404');
	});
});

// GET /categories/:id , show specific category and all projects with it.
router.get('/:id', (req, res) => {
	db.category.findOne({
		where: { id: req.params.id },
		include: [db.project]
	})
	.then((category) => {
		res.render('categories/show', { category: category })
	})
	.catch((err) => {
		console.log(err);
		res.render('main/404');
	});
})

module.exports = router;