var express = require('express')
var db = require('../models')
var router = express.Router()


// GET /categories
router.get('/', (req, res) => {
	db.category.findAll()
	.then(function(categories) {
		res.render('categories', { categories: categories })
	})
	.catch(function(error) {
		console.log('Error in GET /', error)
		res.status(400).render('main/404')
	})
})


// GET /categories/:id
router.get('/:id', function(req, res) {
	db.category.findOne({
		where: { id: req.params.id },
		include: [db.project]
	})
	.then((category) => {
		console.log(category.projects)
		res.render('categories/show', { category })
	})
	.catch(function(error) {
		console.log('Error in GET /', error)
		res.status(400).render('main/404')
	})
})





module.exports = router
